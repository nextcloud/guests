<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use OC\AppFramework\App;
use OCP\IUser;
use OCP\Settings\IIconSection;
use OCP\Settings\IManager;

class FilteredSettingsManager implements IManager {

	public function __construct(
		private readonly IManager $manager,
		private readonly AppWhitelist $appWhitelist,
	) {
	}

	private function isSettingAllowed(string $setting): bool {
		$appId = App::getAppIdForClass($setting);
		return $this->appWhitelist->isAppWhitelisted($appId);
	}

	public function registerSection(string $type, string $section): void {
		$this->manager->registerSection($type, $section);
	}

	public function registerSetting(string $type, string $setting): void {
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
		/** @psalm-suppress RedundantCondition we support older version of Server */
		if (method_exists($this->manager, 'getAdminDelegatedSettings')) {
			return $this->manager->getAdminDelegatedSettings();
		}

		throw new \Exception('Method not available in version 32 or older');
	}
}
