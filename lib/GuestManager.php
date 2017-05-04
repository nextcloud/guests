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
use OCP\IUserManager;
use OCP\Security\ICrypto;
use OCP\Security\ISecureRandom;

class GuestManager {
	/** @var IConfig */
	private $config;

	/** @var IUserManager */
	private $userManager;

	/** @var ISecureRandom */
	private $secureRandom;

	/** @var ICrypto */
	private $crypto;

	/** @var IGroupManager */
	private $groupManager;

	public function __construct(IConfig $config, IUserManager $userManager, ISecureRandom $secureRandom, ICrypto $crypto, IGroupManager $groupManager) {
		$this->config = $config;
		$this->userManager = $userManager;
		$this->secureRandom = $secureRandom;
		$this->crypto = $crypto;
		$this->groupManager = $groupManager;
	}

	/**
	 * @param string $userId
	 * @return boolean
	 */
	public function isGuest($userId) {
		return $this->config->getUserValue($userId, 'nextcloud', 'isGuest', false) === '1';
	}

	public function createGuest($userId, $email, $displayName = '') {
		$user = $this->userManager->createUser(
			$userId,
			$this->secureRandom->generate(20)
		);

		$user->setEMailAddress($email);

		if ($displayName) {
			$user->setDisplayName($displayName);
		}

		$token = $this->secureRandom->generate(
			21,
			ISecureRandom::CHAR_DIGITS .
			ISecureRandom::CHAR_LOWER .
			ISecureRandom::CHAR_UPPER);

		$token = sprintf('%s:%s', time(), $token);

		$userId = $user->getUID();

		$encryptedValue = $this->crypto->encrypt($token, $email . $this->config->getSystemValue('secret'));

		$this->config->setUserValue(
			$user->getUID(),
			'core',
			'lostpassword',
			$encryptedValue
		);


		$this->config->setUserValue(
			$userId,
			'nextcloud',
			'isGuest',
			'1'
		);
	}

	public function listGuests() {
		return $this->config->getUsersForUserValue(
			'nextcloud',
			'isGuest',
			'1'
		);
	}

	public function isReadOnlyUser($userId) {
		if ($this->isGuest($userId)) {
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

		$user = $this->userManager->get($userId);
		$userGroups = $this->groupManager->getUserGroupIds($user);
		$readOnlyGroupMemberships = array_intersect(
			$readOnlyGroups,
			$userGroups
		);
		return count($readOnlyGroupMemberships) > 0;
	}
}
