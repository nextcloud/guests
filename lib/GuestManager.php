<?php
/**
 * @copyright Copyright (c) 2017 Robin Appelman <robin@icewind.nl>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Guests;

use OCA\Files\Exception\TransferOwnershipException;
use OCA\Files\Service\OwnershipTransferService;
use OCA\Guests\AppInfo\Application;
use OCP\AppFramework\QueryException;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Notification\IManager as INotificationManager;
use OCP\Security\Events\GenerateSecurePasswordEvent;
use OCP\Security\ICrypto;
use OCP\Security\ISecureRandom;
use OCP\Share\IManager;
use OCP\Share\IShare;
use Psr\Container\ContainerInterface;
use Psr\Log\LoggerInterface;

class GuestManager {
	public function __construct(
		private IConfig $config,
		private UserBackend $userBackend,
		private ISecureRandom $secureRandom,
		private ICrypto $crypto,
		private IManager $shareManager,
		private IDBConnection $connection,
		private IUserSession $userSession,
		private IEventDispatcher $eventDispatcher,
		private IUserManager $userManager,
		private ContainerInterface $container,
		private LoggerInterface $logger,
		private INotificationManager $notificationManager,
	) {}

	/**
	 * @param IUser|string $user
	 * @return bool
	 */
	public function isGuest($user = null): bool {
		if (is_null($user)) {
			$user = $this->userSession->getUser();
			return ($user !== null) && $this->userBackend->userExists($user->getUID());
		}
		if (is_string($user)) {
			return $this->userBackend->userExists($user);
		} elseif ($user instanceof IUser) {
			return $this->userBackend->userExists($user->getUID());
		}
		return false;
	}

	public function createGuest(IUser $createdBy, string $userId, string $email, string $displayName = '', string $language = '', ?string $initialPassword = null) : IUser {
		if ($initialPassword === null) {
			$passwordEvent = new GenerateSecurePasswordEvent();
			$this->eventDispatcher->dispatchTyped($passwordEvent);
			$password = $passwordEvent->getPassword() ?? $this->secureRandom->generate(20);
		} else {
			$password = $initialPassword;
		}

		/** @var IUser */
		$user = $this->userManager->createUserFromBackend(
			$userId,
			$password,
			$this->userBackend
		);

		$user->setEMailAddress($email);
		$this->config->setUserValue($userId, 'guests', 'created_by', $createdBy->getUID());

		if ($displayName) {
			$user->setDisplayName($displayName);
		}

		if ($language) {
			$this->config->setUserValue($userId, 'core', 'lang', $language);
		}

		if ($initialPassword === null) {
			// generate token for lost password so that a link can be sent by email
			$token = $this->secureRandom->generate(
				21,
				ISecureRandom::CHAR_DIGITS .
				ISecureRandom::CHAR_LOWER .
				ISecureRandom::CHAR_UPPER);

			$endOfTime = PHP_INT_MAX - 50000;
			$token = sprintf('%s:%s', $endOfTime, $token);

			$encryptedValue = $this->crypto->encrypt($token, strtolower($email) . $this->config->getSystemValue('secret'));

			$this->config->setUserValue(
				$userId,
				'core',
				'lostpassword',
				$encryptedValue
			);
		}

		$user->setQuota('0 B');

		return $user;
	}

	public function listGuests(): array {
		return $this->userBackend->getUsers();
	}

	public function getGuestsInfo(): array {
		$displayNames = $this->userBackend->getDisplayNames();
		$guests = array_keys($displayNames);
		$shareCounts = $this->getShareCountForUsers($guests);
		$createdBy = $this->config->getUserValueForUsers('guests', 'created_by', $guests);
		return array_map(function ($uid) use ($createdBy, $displayNames, $shareCounts) {
			return [
				'email' => $uid,
				'display_name' => $displayNames[$uid] ?? $uid,
				'created_by' => $createdBy[$uid] ?? '',
				'share_count' => isset($shareCounts[$uid]) ? $shareCounts[$uid] : 0,
			];
		}, $guests);
	}

	private function getShareCountForUsers(array $guests): array {
		$query = $this->connection->getQueryBuilder();
		$query->select('share_with', $query->func()->count('*', 'count'))
			->from('share')
			->where($query->expr()->in('share_with', $query->createNamedParameter($guests, IQueryBuilder::PARAM_STR_ARRAY)))
			->groupBy('share_with');
		$result = $query->execute();
		$data = [];
		while ($row = $result->fetch()) {
			$data[$row['share_with']] = $row['count'];
		}
		$result->closeCursor();

		return $data;
	}

	public function getGuestInfo($userId): array {
		$shares = array_merge(
			$this->shareManager->getSharedWith($userId, IShare::TYPE_USER, null, -1, 0),
			$this->shareManager->getSharedWith($userId, IShare::TYPE_GROUP, null, -1, 0),
			$this->shareManager->getSharedWith($userId, IShare::TYPE_CIRCLE, null, -1, 0),
			$this->shareManager->getSharedWith($userId, IShare::TYPE_GUEST, null, -1, 0),
			$this->shareManager->getSharedWith($userId, IShare::TYPE_ROOM, null, -1, 0)
		);
		return [
			'shares' => array_map(function (IShare $share) {
				return [
					'id' => $share->getId(),
					'shared_by' => $share->getSharedBy(),
					'mime_type' => $share->getNodeCacheEntry()->getMimeType(),
					'name' => $share->getNodeCacheEntry()->getName(),
					'time' => $share->getShareTime()->getTimestamp(),
				];
			}, $shares),
		];
	}

	public function transfer(IUser $guestUser, IUser $user): void {
		try {
			/** @var OwnershipTransferService $ownershipTransferService */
			$ownershipTransferService = $this->container->get(OwnershipTransferService::class);
		} catch (QueryException $e) {
			$this->logger->error('Could not resolve ownership transfer service to import guest user data', [
				'exception' => $e,
			]);
			throw $e;
		}

		try {
			$ownershipTransferService->transfer(
				$guestUser,
				$user,
				'/',
				null,
				true,
				true
			);
		} catch (TransferOwnershipException $e) {
			$this->logger->error('Could not import guest user data', [
				'exception' => $e,
			]);
			throw $e;
		}

		// Update incomming shares
		$shares = $this->shareManager->getSharedWith($guestUser->getUID(), IShare::TYPE_USER);
		foreach ($shares as $share) {
			$share->setSharedWith($user->getUID());
			$this->shareManager->updateShare($share);
		}

		$notification = $this->notificationManager->createNotification();
		$notification
			->setApp(Application::APP_ID)
			->setSubject('data_migrated_to_system_user')
			->setObject('user', $user->getEMailAddress())
			->setDateTime(new \DateTime())
			->setUser($user->getUID());
		$this->notificationManager->notify($notification);
	}
}
