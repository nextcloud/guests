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
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\IGroupManager;
use OCP\IUser;
use OCP\IUserBackend;
use OCP\IUserManager;
use OCP\Security\ICrypto;
use OCP\Security\ISecureRandom;
use OCP\Share\IManager;
use OCP\Share\IShare;

class GuestManager {
	/** @var IConfig */
	private $config;

	/** @var UserBackend */
	private $userBackend;

	/** @var ISecureRandom */
	private $secureRandom;

	/** @var ICrypto */
	private $crypto;

	/** @var IGroupManager */
	private $groupManager;

	private $shareManager;

	private $connection;

	public function __construct(
		IConfig $config,
		UserBackend $userBackend,
		ISecureRandom $secureRandom,
		ICrypto $crypto,
		IGroupManager $groupManager,
		IManager $shareManager,
		IDBConnection $connection
	) {
		$this->config = $config;
		$this->userBackend = $userBackend;
		$this->secureRandom = $secureRandom;
		$this->crypto = $crypto;
		$this->groupManager = $groupManager;
		$this->shareManager = $shareManager;
		$this->connection = $connection;
	}

	/**
	 * @param IUser|string $user
	 * @return boolean
	 */
	public function isGuest($user) {
		if (is_string($user)) {
			return $this->userBackend->userExists($user);
		} else if ($user instanceof IUser) {
			return $this->userBackend->userExists($user->getUID());
		}
		return false;
	}

	public function createGuest(IUser $createdBy, $userId, $email, $displayName = '', $language = '') {
		$this->userBackend->createUser(
			$userId,
			$this->secureRandom->generate(20)
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

	public function listGuests() {
		return $this->userBackend->getUsers();
	}

	public function getGuestsInfo() {
		$displayNames = $this->userBackend->getDisplayNames();
		$guests = array_keys($displayNames);
		$shareCounts = $this->getShareCountForUsers($guests);
		$createdBy = $this->config->getUserValueForUsers('guests', 'created_by', $guests);
		return array_map(function ($uid) use ($createdBy, $displayNames, $shareCounts) {
			return [
				'email' => $uid,
				'display_name' => $displayNames[$uid],
				'created_by' => $createdBy[$uid],
				'share_count' => $shareCounts[$uid]
			];
		}, $guests);
	}

	private function getShareCountForUsers(array $guests) {
		$query = $this->connection->getQueryBuilder();
		$query->select('share_with', $query->func()->count('*', 'count'))
			->from('share')
			->where($query->expr()->in('share_with', $query->createNamedParameter($guests, IQueryBuilder::PARAM_STR_ARRAY)))
			->groupBy('share_with');
		return $query->execute()->fetchAll(\PDO::FETCH_KEY_PAIR);
	}

	public function getGuestInfo($userId) {
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
					'shared_by' => $share->getSharedBy(),
					'mime_type' => $share->getNodeCacheEntry()->getMimeType(),
					'name' => $share->getNodeCacheEntry()->getName(),
					'time' => $share->getShareTime()->getTimestamp()
				];
			}, $shares)
		];
	}

	public function isReadOnlyUser(IUser $user) {
		if ($this->isGuest($user)) {
			return true;
		}

		$readOnlyGroups = json_decode($this->config->getAppValue(
			'core',
			'read_only_groups',
			'[]'
		), true);

		if (!is_array($readOnlyGroups)) {
			$readOnlyGroups = [];
		}

		$userGroups = $this->groupManager->getUserGroupIds($user);
		$readOnlyGroupMemberships = array_intersect(
			$readOnlyGroups,
			$userGroups
		);
		return count($readOnlyGroupMemberships) > 0;
	}
}
