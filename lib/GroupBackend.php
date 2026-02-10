<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2017 ownCloud GmbH
 * SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
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
	/** @var string[] */
	private array $guestMembers = [];

	public function __construct(
		private readonly GuestManager $guestManager,
		private readonly Config $config,
		private readonly IUserSession $userSession,
		private readonly string $groupName = 'guest_app',
	) {
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
	 * @return list<string> an array of group names
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
	 * @since 4.5.0
	 *
	 * Returns a list with all groups
	 */
	public function getGroups($search = '', $limit = -1, $offset = 0): array {
		return $offset == 0 ? [$this->groupName] : [];
	}

	/**
	 * check if a group exists
	 *
	 * @param string $gid
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
	 * @return array<int, string> an array of user ids
	 * @since 4.5.0
	 */
	public function usersInGroup($gid, $search = '', $limit = -1, $offset = 0): array {
		if ($gid === $this->groupName) {
			if ($this->guestManager->isGuest() && $this->config->hideOtherUsers()) {
				return [$this->userSession->getUser()->getUID()];
			}
			return $offset === 0 ? $this->getMembers() : [];
		}

		return [];
	}

	public function countUsersInGroup(string $gid, string $search = ''): int {
		if ($gid === $this->groupName) {
			if ($this->guestManager->isGuest() && $this->config->hideOtherUsers()) {
				return 1;
			}
			return count($this->getMembers());
		}
		return 0;
	}

	public function getGroupDetails(string $gid): array {
		if ($gid === $this->groupName) {
			return ['displayName' => 'Guests'];
		}
		return [];
	}

	public function hideGroup(string $groupId): bool {
		return true;
	}
}
