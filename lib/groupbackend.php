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


use OCP\GroupInterface;

/**
 * Provides a virtual (not existing in the database) group for guest users.
 * Members of this group are determined by the user value "isGuest" in oc_preferences.
 *
 * @package OCA\Guests
 */
class GroupBackend implements GroupInterface {

	const GUEST_APP_GROUP_NAME = 'guest_app';

	private $guestMembers = [];

	protected $possibleActions = [
		self::COUNT_USERS => 'countUsersInGroup',
	];


	private function getMembers() {
		if (empty($this->guestMembers)) {
			$cfg = \OC::$server->getConfig();
			$this->guestMembers = $cfg->getUsersForUserValue(
				'owncloud',
				'isGuest',
				'1'
			);
		}

		return $this->guestMembers;
	}

	/**
	 * Get all supported actions
	 * @return int bitwise-or'ed actions
	 *
	 * Returns the supported actions as int to be
	 * compared with \OC\Group\Backend::CREATE_GROUP etc.
	 */
	public function getSupportedActions() {
		$actions = 0;
		foreach($this->possibleActions AS $action => $methodName) {
			if (method_exists($this, $methodName)) {
				$actions |= $action;
			}
		}

		return $actions;
	}

	/**
	 * Check if backend implements actions
	 * @param int $actions bitwise-or'ed actions
	 * @return bool
	 *
	 * Returns the supported actions as int to be
	 * compared with \OC\Group\Backend::CREATE_GROUP etc.
	 */
	public function implementsActions($actions) {
		return (bool)($this->getSupportedActions() & $actions);
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
	public function inGroup($uid, $gid) {
		return in_array($uid, $this->guestMembers) && $gid === self::GUEST_APP_GROUP_NAME;

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
	public function getUserGroups($uid) {
		if (in_array($uid, $this->getMembers())) {
			return [self::GUEST_APP_GROUP_NAME];
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
	public function getGroups($search = '', $limit = -1, $offset = 0) {
		return [self::GUEST_APP_GROUP_NAME];
	}

	/**
	 * check if a group exists
	 *
	 * @param string $gid
	 * @return bool
	 * @since 4.5.0
	 */
	public function groupExists($gid) {
		return $gid === self::GUEST_APP_GROUP_NAME;
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
	public function usersInGroup($gid, $search = '', $limit = -1, $offset = 0) {
		if ($gid === self::GUEST_APP_GROUP_NAME) {
			return $this->getMembers();
		}

		return [];
	}


	/**
	 * @return int
	 */
	public function countUsersInGroup() {
		return count($this->getMembers());
	}

	/**
	 * Returns whether the groups are visible for a given scope.
	 *
	 * @param string|null $scope scope string
	 * @return bool true if searchable, false otherwise
	 *
	 * @since 10.0.0
	 */
	public function isVisibleForScope($scope) {
		return $scope !== 'sharing';
	}
}