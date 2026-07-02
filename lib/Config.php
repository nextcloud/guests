<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use OCA\Guests\AppInfo\Application;
use OCP\AppFramework\Services\IAppConfig;
use OCP\Group\ISubAdmin;
use OCP\IAppConfig as IGlobalAppConfig;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IUserSession;

class Config {
	public function __construct(
		private readonly IConfig $config,
		private readonly IGlobalAppConfig $globalAppConfig,
		private readonly IAppConfig $appConfig,
		private readonly ISubAdmin $subAdmin,
		private readonly IUserSession $userSession,
		private readonly IGroupManager $groupManager,
	) {
	}

	public function allowExternalStorage(): bool {
		return $this->appConfig->getAppValueBool(ConfigLexicon::EXTERNAL_STORAGE_ENABLED);
	}

	public function setAllowExternalStorage(bool $allow): void {
		$this->appConfig->setAppValueBool(ConfigLexicon::EXTERNAL_STORAGE_ENABLED, $allow);
	}

	public function useHashedEmailAsUserID(): bool {
		return $this->appConfig->getAppValueBool('hash_user_ids', true);
	}

	public function setUseHashedEmailAsUserID(bool $useHash): void {
		$this->appConfig->setAppValueBool('hash_user_ids', $useHash) ;
	}

	public function hideOtherUsers(): bool {
		return $this->appConfig->getAppValueBool(ConfigLexicon::HIDE_OTHER_ACCOUNTS);
	}

	public function setHideOtherUsers(bool $hide): void {
		$this->appConfig->setAppValueBool(ConfigLexicon::HIDE_OTHER_ACCOUNTS, $hide);
	}

	/**
	 * Currently configured default quota for new guest accounts. Returns the
	 * explicit override if one is set, otherwise the preset-derived default.
	 */
	public function getGuestQuota(): string {
		return $this->appConfig->getAppValueString(ConfigLexicon::GUEST_DISK_QUOTA);
	}

	/**
	 * Whether an explicit default quota is stored, as opposed to falling back
	 * to the preset-derived default from the config lexicon.
	 */
	public function hasGuestQuotaOverride(): bool {
		return $this->globalAppConfig->hasKey(Application::APP_ID, ConfigLexicon::GUEST_DISK_QUOTA);
	}

	/**
	 * The preset-derived default quota, regardless of any override. This is the
	 * value the instance's configuration preset assigns to guests.
	 */
	public function getGuestQuotaDefault(): string {
		// getDetails() only works once a value is stored; when no override is
		// set, the app config already returns the preset-derived lexicon default.
		if (!$this->hasGuestQuotaOverride()) {
			return $this->appConfig->getAppValueString(ConfigLexicon::GUEST_DISK_QUOTA);
		}
		return (string)($this->globalAppConfig->getDetails(Application::APP_ID, ConfigLexicon::GUEST_DISK_QUOTA)['default'] ?? '0 B');
	}

	/**
	 * Store the default guest quota. An empty value or 'default' removes the
	 * override so the preset-derived default applies again.
	 */
	public function setGuestQuota(?string $quota): void {
		if ($quota === null || $quota === '' || $quota === 'default') {
			$this->appConfig->deleteAppValue(ConfigLexicon::GUEST_DISK_QUOTA);
			return;
		}
		$this->appConfig->setAppValueString(ConfigLexicon::GUEST_DISK_QUOTA, $quota);
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
	 * @return list<string>
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
		if ($groupRestriction !== []) {
			$userGroups = $this->groupManager->getUserGroupIds($user);
			$groupRestriction = array_intersect($userGroups, $groupRestriction);
			if ($groupRestriction === []) {
				return false;
			}
		}

		return !$this->isSharingRestrictedToGroup();
	}

	/**
	 * @return list<string>
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
	 * @param list<string> $groups
	 */
	public function setCreateRestrictedToGroup(array $groups): void {
		$this->appConfig->setAppValueArray('create_restricted_to_group', $groups);
	}
}
