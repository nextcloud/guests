<?php
/**
 * @author Ilja Neumann <ineumann@owncloud.com>
 *
 * @copyright Copyright (c) 2017, ownCloud GmbH
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 */

namespace OCA\Guests;

use OCP\Group\Backend\ABackend;
use OCP\Group\Backend\ICountUsersBackend;
use OCP\Group\Backend\IGroupDetailsBackend;
use OCP\Group\Backend\IHideFromCollaborationBackend;
use OCP\IUserSession;

/**
 * Provides a virtual (not existing in the database) group for guest users.
 *
 * @package OCA\Guests
 */
class GroupBackend extends ABackend implements ICountUsersBackend, IGroupDetailsBackend, IHideFromCollaborationBackend {
	/** @var GuestManager */
	private $guestManager;

	/** @var string[] */
	private $guestMembers = [];

	/** @var string */
	private $groupName;

	/** @var Config */
	private $config;

	/** @var IUserSession */
	private $userSession;

	public function __construct(
		GuestManager $guestManager,
		Config $config,
		IUserSession $userSession,
		string $groupName = 'guest_app'
	) {
		$this->guestManager = $guestManager;
		$this->config = $config;
		$this->userSession = $userSession;
		$this->groupName = $groupName;
	}

	private function getMembers(): array {
		if (empty($this->guestMembers)) {
			$this->guestMembers = $this->guestManager->listGuests();
		}

		return $this->guestMembers;
	}

	/**
	 * is user in group?
	 *
	 * @param string $uid uid of the user
	 * @param string $gid gid of the group
	 * @return bool
	 * @since 4.5.0
	 *
	 * Checks whether the user is member of a group or not.
	 */
	public function inGroup($uid, $gid): bool {
		return $gid === $this->groupName && $this->guestManager->isGuest($uid);
	}

	/**
	 * Get all groups a user belongs to
	 *
	 * @param string $uid Name of the user
	 * @return array an array of group names
	 * @since 4.5.0
	 *
	 * This function fetches all groups a user belongs to. It does not check
	 * if the user exists at all.
	 */
	public function getUserGroups($uid): array {
		if ($this->guestManager->isGuest($uid)) {
			return [$this->groupName];
		}

		return [];
	}

	/**
	 * get a list of all groups
	 *
	 * @param string $search
	 * @param int $limit
	 * @param int $offset
	 * @return array an array of group names
	 * @since 4.5.0
	 *
	 * Returns a list with all groups
	 */
	public function getGroups($search = '', $limit = -1, $offset = 0): array {
		return $offset === 0 ? [$this->groupName] : [];
	}

	/**
	 * check if a group exists
	 *
	 * @param string $gid
	 * @return bool
	 * @since 4.5.0
	 */
	public function groupExists($gid): bool {
		return $gid === $this->groupName;
	}

	/**
	 * get a list of all users in a group
	 *
	 * @param string $gid
	 * @param string $search
	 * @param int $limit
	 * @param int $offset
	 * @return array an array of user ids
	 * @since 4.5.0
	 */
	public function usersInGroup($gid, $search = '', $limit = -1, $offset = 0): array {
		if ($gid === $this->groupName) {
			if ($this->guestManager->isGuest() && $this->config->hideOtherUsers()) {
				return [$this->userSession->getUser()->getUID()];
			} else {
				return $offset === 0 ? $this->getMembers() : [];
			}
		}

		return [];
	}

	public function countUsersInGroup(string $gid, string $search = ''): int {
		if ($gid === $this->groupName) {
			if ($this->guestManager->isGuest() && $this->config->hideOtherUsers()) {
				return 1;
			} else {
				return count($this->getMembers());
			}
		} else {
			return 0;
		}
	}

	public function getGroupDetails(string $gid): array {
		if ($gid === $this->groupName) {
			return ['displayName' => 'Guests'];
		} else {
			return [];
		}
	}

	public function hideGroup(string $groupId): bool {
		return true;
	}
}
