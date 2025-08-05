<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use OCP\AppFramework\Services\IAppConfig;
use OCP\Group\ISubAdmin;
use OCP\IAppConfig as IGlobalAppConfig;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IUserSession;

class Config {
	public function __construct(
		private IConfig $config,
		private IGlobalAppConfig $globalAppConfig,
		private IAppConfig $appConfig,
		private ISubAdmin $subAdmin,
		private IUserSession $userSession,
		private IGroupManager $groupManager,
	) {
	}

	public function allowExternalStorage(): bool {
		return $this->appConfig->getAppValueBool(ConfigLexicon::EXTERNAL_STORAGE_ENABLED);
	}

	public function setAllowExternalStorage(bool $allow): void {
		$this->appConfig->setAppValueBool(ConfigLexicon::EXTERNAL_STORAGE_ENABLED, $allow);
	}

	public function hideOtherUsers(): bool {
		return $this->appConfig->getAppValueBool(ConfigLexicon::HIDE_OTHER_ACCOUNTS);
	}

	public function setHideOtherUsers(bool $hide): void {
		$this->appConfig->setAppValueBool(ConfigLexicon::HIDE_OTHER_ACCOUNTS, $hide);
	}

	public function getHome(string $uid): string {
		return $this->config->getSystemValue('datadirectory', \OC::$SERVERROOT . '/data') . '/' . $uid;
	}

	public function useWhitelist(): bool {
		return $this->appConfig->getAppValueBool(ConfigLexicon::WHITE_LIST_ENABLED);
	}

	public function setUseWhitelist(bool $use): void {
		$this->appConfig->setAppValueBool(ConfigLexicon::WHITE_LIST_ENABLED, $use);
	}

	/**
	 * @return string[]
	 */
	public function getAppWhitelist(): array {
		return explode(',', $this->appConfig->getAppValueString(ConfigLexicon::WHITE_LIST));
	}

	public function setAppWhitelist(array $whitelist): void {
		$this->appConfig->setAppValueString(ConfigLexicon::WHITE_LIST, implode(',', $whitelist));
	}

	public function isSharingRestrictedToGroup(): bool {
		return $this->globalAppConfig->getValueBool('core', 'shareapi_only_share_with_group_members');
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
		$groups = $this->appConfig->getAppValueArray(ConfigLexicon::GROUP_LIMITATION);
		// If empty, it means there is no restriction
		if (empty($groups)) {
			return [];
		}

		// It does not matter at this point if the admin
		// group is in the list or not. We are checking it
		// anyway in the canCreateGuests method.
		return array_values(array_unique($this->appConfig->getAppValueArray(ConfigLexicon::GROUP_LIMITATION)));
	}

	/**
	 * @param string[] $groups
	 */
	public function setCreateRestrictedToGroup(array $groups): void {
		$this->appConfig->setAppValueArray('create_restricted_to_group', $groups);
	}
}
