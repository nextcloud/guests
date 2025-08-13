<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use OCP\AppFramework\Services\IAppConfig;
use OCP\Group\ISubAdmin;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IUserSession;

class Config {
	public function __construct(
		private IConfig $config,
		private IAppConfig $appConfig,
		private ISubAdmin $subAdmin,
		private IUserSession $userSession,
		private IGroupManager $groupManager,
	) {
	}

	public function allowExternalStorage(): bool {
		return $this->appConfig->getAppValueBool('allow_external_storage', false);
	}

	/**
	 * @param string|bool $allow
	 */
	public function setAllowExternalStorage($allow): void {
		$this->appConfig->setAppValueBool('allow_external_storage', $allow === true || $allow === 'true') ;
	}

	public function hideOtherUsers(): bool {
		return $this->appConfig->getAppValueBool('hide_users', true);
	}

	/**
	 * @param string|bool $hide
	 */
	public function setHideOtherUsers($hide): void {
		$this->appConfig->setAppValueBool('hide_users', $hide === true || $hide === 'true') ;
	}

	public function getHome(string $uid): string {
		return $this->config->getSystemValue('datadirectory', \OC::$SERVERROOT . '/data') . '/' . $uid;
	}

	public function useWhitelist(): bool {
		return $this->appConfig->getAppValueBool('usewhitelist', true);
	}

	/**
	 * @param string|bool $use
	 */
	public function setUseWhitelist($use): void {
		$this->appConfig->setAppValueBool('usewhitelist', $use === true || $use === 'true') ;
	}

	/**
	 * @return string[]
	 */
	public function getAppWhitelist(): array {
		$whitelist = $this->appConfig->getAppValueString('whitelist', AppWhitelist::DEFAULT_WHITELIST);
		return explode(',', $whitelist);
	}

	/**
	 * @param array|string $whitelist
	 */
	public function setAppWhitelist($whitelist): void {
		if (is_array($whitelist)) {
			$whitelist = implode(',', $whitelist);
		}
		$this->appConfig->setAppValueString('whitelist', $whitelist);
	}

	public function isSharingRestrictedToGroup(): bool {
		return $this->config->getAppValue('core', 'shareapi_only_share_with_group_members', 'no') === 'yes';
	}

	public function canCreateGuests(): bool {
		$user = $this->userSession->getUser();
		if (!$user) {
			return false;
		}

		// Admins and sub-admins can always create guests
		if ($this->groupManager->isAdmin($user->getUID())
			|| $this->subAdmin->isSubAdmin($user)) {
			return true;
		}

		// Check if we have a group restriction
		// and if the user belong to that group
		$groupRestriction = $this->getCreateRestrictedToGroup();
		if (!empty($groupRestriction)) {
			$userGroups = $this->groupManager->getUserGroupIds($user);
			$groupRestriction = array_intersect($userGroups, $groupRestriction);
			if (empty($groupRestriction)) {
				return false;
			}
		}


		return !$this->isSharingRestrictedToGroup();
	}

	/**
	 * @return string[]
	 */
	public function getCreateRestrictedToGroup(): array {
		$groups = $this->appConfig->getAppValueArray('create_restricted_to_group', []);
		// If empty, it means there is no restriction
		if (empty($groups)) {
			return [];
		}

		// It does not matter at this point if the admin
		// group is in the list or not. We are checking it
		// anyway in the canCreateGuests method.
		return array_values(array_unique($this->appConfig->getAppValueArray('create_restricted_to_group', [])));
	}

	/**
	 * @param string[] $groups
	 */
	public function setCreateRestrictedToGroup(array $groups): void {
		$this->appConfig->setAppValueArray('create_restricted_to_group', $groups);
	}
}
