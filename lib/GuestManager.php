<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use OCA\Guests\AppInfo\Application;
use OCP\AppFramework\Services\IAppConfig;
use OCP\Config\IUserConfig;
use OCP\Config\ValueType;
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
	public function __construct(
		private readonly IConfig $config,
		private readonly IAppConfig $appConfig,
		private readonly IUserConfig $userConfig,
		private readonly UserBackend $userBackend,
		private readonly ISecureRandom $secureRandom,
		private readonly ICrypto $crypto,
		private readonly IManager $shareManager,
		private readonly IDBConnection $connection,
		private readonly IUserSession $userSession,
		private readonly IEventDispatcher $eventDispatcher,
		private readonly IUserManager $userManager,
	) {
	}

	public function isGuest(IUser|string|null $user = null): bool {
		if (is_null($user)) {
			$user = $this->userSession->getUser();
			return ($user !== null) && $this->userBackend->userExists($user->getUID());
		}

		if (is_string($user)) {
			return $this->userBackend->userExists($user);
		}


		return $this->userBackend->userExists($user->getUID());
	}

	public function createGuest(?IUser $createdBy, string $userId, string $email, string $displayName = '', string $language = '', ?string $initialPassword = null) : ?IUser {
		if ($initialPassword === null) {
			$passwordEvent = new GenerateSecurePasswordEvent();
			$this->eventDispatcher->dispatchTyped($passwordEvent);
			$password = $passwordEvent->getPassword() ?? $this->secureRandom->generate(20);
		} else {
			$password = $initialPassword;
		}

		$user = $this->userManager->createUserFromBackend(
			$userId,
			$password,
			$this->userBackend
		);

		if (!$user instanceof IUser) {
			return null;
		}

		$this->userBackend->setInitialEmail($userId, $email);
		$user->setSystemEMailAddress($email);
		if ($createdBy instanceof IUser) {
			$this->userConfig->setValueString($userId, Application::APP_ID, ConfigLexicon::USER_CREATED_BY, $createdBy->getUID());
		}

		if ($displayName !== '') {
			$user->setDisplayName($displayName);
		} else {
			$user->setDisplayName($email);
		}

		if ($language !== '') {
			$this->config->setUserValue($userId, 'core', 'lang', $language);
		}

		if ($initialPassword === null) {
			// generate token for lost password so that a link can be sent by email
			$token = $this->secureRandom->generate(
				21,
				ISecureRandom::CHAR_DIGITS
				. ISecureRandom::CHAR_LOWER
				. ISecureRandom::CHAR_UPPER);

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

		$user->setQuota($this->appConfig->getAppValueString(ConfigLexicon::GUEST_DISK_QUOTA));

		return $user;
	}

	/**
	 * @return list<string>
	 */
	public function listGuests(): array {
		return $this->userBackend->getUsers();
	}

	/**
	 * @return list<array{
	 *     email: non-empty-string,
	 *     display_name: non-empty-string,
	 *     created_by: string,
	 *     share_count: int,
	 *     share_count_with_circles: int
	 * }>
	 */
	public function getGuestsInfo(): array {
		$guestsInfo = $this->userBackend->getAllGuestAccounts();
		$guests = array_keys($guestsInfo);
		$shareCounts = $this->getShareCountForUsers($guests);
		$createdBy = $this->userConfig->getValuesByUsers(Application::APP_ID, ConfigLexicon::USER_CREATED_BY, ValueType::STRING, $guests);

		return array_map(function (string $uid) use ($createdBy, $guestsInfo, $shareCounts): array {
			$allSharesCount = count(array_merge(
				$this->shareManager->getSharedWith($uid, IShare::TYPE_USER, null, -1, 0),
				$this->shareManager->getSharedWith($uid, IShare::TYPE_GROUP, null, -1, 0),
				$this->shareManager->getSharedWith($uid, IShare::TYPE_CIRCLE, null, -1, 0),
				$this->shareManager->getSharedWith($uid, IShare::TYPE_GUEST, null, -1, 0),
				$this->shareManager->getSharedWith($uid, IShare::TYPE_ROOM, null, -1, 0),
			));
			return [
				'email' => $guestsInfo[$uid]['email'] ?? $uid,
				'uid' => $uid,
				'display_name' => $guestsInfo[$uid]['displayname'] ?? $uid,
				'created_by' => $createdBy[$uid] ?? '',
				'share_count' => $shareCounts[$uid] ?? 0,
				'share_count_with_circles' => $allSharesCount,
			];
		}, $guests);
	}

	/**
	 * @param list<string> $guests
	 * @return array<string, int>
	 */
	private function getShareCountForUsers(array $guests): array {
		$query = $this->connection->getQueryBuilder();
		$query->select('share_with', $query->func()->count('*', 'count'))
			->from('share')
			->where($query->expr()->in('share_with', $query->createNamedParameter($guests, IQueryBuilder::PARAM_STR_ARRAY)))
			->groupBy('share_with');
		$result = $query->executeQuery();
		$data = [];
		while ($row = $result->fetch()) {
			$data[$row['share_with']] = (int)$row['count'];
		}

		$result->closeCursor();

		return $data;
	}

	/**
	 * @return array{shares: list<array{
	 *     id: string,
	 *     shared_by: string,
	 *     mime_type: int,
	 *     name: string,
	 *     time: int,
	 * }>}
	 */
	public function getGuestInfo(string $userId): array {
		$shares = array_merge(
			$this->shareManager->getSharedWith($userId, IShare::TYPE_USER, null, -1, 0),
			$this->shareManager->getSharedWith($userId, IShare::TYPE_GROUP, null, -1, 0),
			$this->shareManager->getSharedWith($userId, IShare::TYPE_CIRCLE, null, -1, 0),
			$this->shareManager->getSharedWith($userId, IShare::TYPE_GUEST, null, -1, 0),
			$this->shareManager->getSharedWith($userId, IShare::TYPE_ROOM, null, -1, 0)
		);
		return [
			'shares' => array_map(fn (IShare $share): array => [
				'id' => $share->getId(),
				'shared_by' => $share->getSharedBy(),
				'mime_type' => $share->getNodeCacheEntry()->getMimeType(),
				'name' => $share->getNodeCacheEntry()->getName(),
				'time' => $share->getShareTime()->getTimestamp(),
			], $shares),
		];
	}
}
