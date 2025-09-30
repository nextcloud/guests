<?php

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use OCP\IUser;
use OCP\Settings\IIconSection;
use OCP\Settings\IManager;

class FilteredSettingsManager implements IManager {

	/** @var IManager */
	private $manager;
	/** @var AppWhitelist */
	private $appWhitelist;

	public function __construct(IManager $manager, AppWhitelist $appWhitelist) {
		$this->manager = $manager;
		$this->appWhitelist = $appWhitelist;
	}

	private function isSettingAllowed(string $setting): bool {
		$appId = \OC\AppFramework\App::getAppIdForClass($setting);
		return $this->appWhitelist->isAppWhitelisted($appId);
	}

	/**
	 * @return void
	 */
	public function registerSection(string $type, string $section) {
		$this->manager->registerSection($type, $section);
	}

	/**
	 * @return void
	 */
	public function registerSetting(string $type, string $setting) {
		if (!$this->isSettingAllowed($setting)) {
			return;
		}

		$this->manager->registerSetting($type, $setting);
	}

	public function getAdminSections(): array {
		return $this->manager->getAdminSections();
	}

	public function getPersonalSections(): array {
		return $this->manager->getPersonalSections();
	}

	public function getAdminSettings($section, bool $subAdminOnly = false): array {
		return $this->manager->getAdminSettings($section, $subAdminOnly);
	}

	public function getAllowedAdminSettings(string $section, IUser $user): array {
		return $this->manager->getAllowedAdminSettings($section, $user);
	}

	public function getAllAllowedAdminSettings(IUser $user): array {
		return $this->manager->getAllAllowedAdminSettings($user);
	}

	public function getPersonalSettings($section): array {
		return $this->manager->getPersonalSettings($section);
	}

	public function getSection(string $type, string $sectionId): ?IIconSection {
		return $this->manager->getSection($type, $sectionId);
	}

	public function getAdminDelegatedSettings(): array {
		if (method_exists($this->manager, 'getAdminDelegatedSettings')) {
			return $this->manager->getAdminDelegatedSettings();
		}

		throw new \Exception('Method not available in version 32 or older');
	}
}
