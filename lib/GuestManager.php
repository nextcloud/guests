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

use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IUser;
use OCP\IUserBackend;
use OCP\IUserManager;
use OCP\Security\ICrypto;
use OCP\Security\ISecureRandom;

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

	public function __construct(IConfig $config, UserBackend $userBackend, ISecureRandom $secureRandom, ICrypto $crypto, IGroupManager $groupManager) {
		$this->config = $config;
		$this->userBackend = $userBackend;
		$this->secureRandom = $secureRandom;
		$this->crypto = $crypto;
		$this->groupManager = $groupManager;
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

	public function createGuest(IUser $createdBy, $userId, $email, $displayName = '') {
		$this->userBackend->createUser(
			$userId,
			$this->secureRandom->generate(20)
		);

		$this->config->setUserValue($userId, 'settings', 'email', $email);
		$this->config->setUserValue($userId, 'guests', 'created_by', $createdBy->getUID());

		if ($displayName) {
			$this->userBackend->setDisplayName($userId, $displayName);
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
