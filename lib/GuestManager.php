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

use OC\Share\Share;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Security\Events\GenerateSecurePasswordEvent;
use OCP\Security\ICrypto;
use OCP\Security\ISecureRandom;
use OCP\Share\IManager;
use OCP\Share\IShare;

class GuestManager {
	/** @var IConfig */
	private $config;

	/** @var UserBackend */
	private $userBackend;

	/** @var IUserManager */
	private $userManager;

	/** @var ISecureRandom */
	private $secureRandom;

	/** @var ICrypto */
	private $crypto;

	/** @var IManager */
	private $shareManager;

	/** @var IDBConnection */
	private $connection;

	/** @var IUserSession */
	private $userSession;

	/** @var IEventDispatcher */
	private $eventDispatcher;

	public function __construct(
		IConfig $config,
		UserBackend $userBackend,
		ISecureRandom $secureRandom,
		ICrypto $crypto,
		IManager $shareManager,
		IDBConnection $connection,
		IUserSession $userSession,
		IEventDispatcher $eventDispatcher,
		IUserManager $userManager
	) {
		$this->config = $config;
		$this->userBackend = $userBackend;
		$this->secureRandom = $secureRandom;
		$this->crypto = $crypto;
		$this->shareManager = $shareManager;
		$this->connection = $connection;
		$this->userSession = $userSession;
		$this->eventDispatcher = $eventDispatcher;
		$this->userManager = $userManager;
	}

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

	public function createGuest(IUser $createdBy, string $userId, string $email, string $displayName = '', string $language = ''): void {
		$passwordEvent = new GenerateSecurePasswordEvent();
		$this->eventDispatcher->dispatchTyped($passwordEvent);
		$this->userManager->createUserFromBackend(
			$userId,
			$passwordEvent->getPassword() ?? $this->secureRandom->generate(20),
			$this->userBackend
		);

		$this->config->setUserValue($userId, 'settings', 'email', $email);
		$this->config->setUserValue($userId, 'guests', 'created_by', $createdBy->getUID());

		if ($displayName) {
			$this->userBackend->setDisplayName($userId, $displayName);
		}

		if ($language) {
			$this->config->setUserValue($userId, 'core', 'lang', $language);
		}

		$token = $this->secureRandom->generate(
			21,
			ISecureRandom::CHAR_DIGITS .
			ISecureRandom::CHAR_LOWER .
			ISecureRandom::CHAR_UPPER);

		$endOfTime = PHP_INT_MAX - 50000;
		$token = sprintf('%s:%s', $endOfTime, $token);

		$encryptedValue = $this->crypto->encrypt($token, $email . $this->config->getSystemValue('secret'));

		$this->config->setUserValue(
			$userId,
			'core',
			'lostpassword',
			$encryptedValue
		);

		$this->config->setUserValue($userId, 'files', 'quota', '0 B');
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
			$this->shareManager->getSharedWith($userId, Share::SHARE_TYPE_USER, null, -1, 0),
			$this->shareManager->getSharedWith($userId, Share::SHARE_TYPE_GROUP, null, -1, 0),
			$this->shareManager->getSharedWith($userId, Share::SHARE_TYPE_CIRCLE, null, -1, 0),
			$this->shareManager->getSharedWith($userId, Share::SHARE_TYPE_GUEST, null, -1, 0),
			$this->shareManager->getSharedWith($userId, Share::SHARE_TYPE_ROOM, null, -1, 0)
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
}
