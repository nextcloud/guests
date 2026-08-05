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

	private function isSettingAllowed(string $setting, ?string $appId): bool {
		// TODO when we depend on NC 34, drop App::getAppIdForClass
		$appId = $appId ?? App::getAppIdForClass($setting);
		return $this->appWhitelist->isAppWhitelisted($appId);
	}

	#[\Override]
	public function registerSection(string $type, string $section, ?string $appId = null): void {
		/** @psalm-suppress TooManyArguments Starting with NC34, we have 3 args */
		$this->manager->registerSection($type, $section, $appId);
	}

	#[\Override]
	public function registerSetting(string $type, string $setting, ?string $appId = null): void {
		if (!$this->isSettingAllowed($setting, $appId)) {
			return;
		}

		/** @psalm-suppress TooManyArguments Starting with NC34, we have 3 args */
		$this->manager->registerSetting($type, $setting, $appId);
	}

	#[\Override]
	public function getAdminSections(): array {
		return $this->manager->getAdminSections();
	}

	#[\Override]
	public function getPersonalSections(): array {
		return $this->manager->getPersonalSections();
	}

	#[\Override]
	public function getAdminSettings($section, bool $subAdminOnly = false): array {
		return $this->manager->getAdminSettings($section, $subAdminOnly);
	}

	#[\Override]
	public function getAllowedAdminSettings(string $section, IUser $user): array {
		return $this->manager->getAllowedAdminSettings($section, $user);
	}

	#[\Override]
	public function getAllAllowedAdminSettings(IUser $user): array {
		return $this->manager->getAllAllowedAdminSettings($user);
	}

	#[\Override]
	public function getPersonalSettings($section): array {
		return $this->manager->getPersonalSettings($section);
	}

	#[\Override]
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
