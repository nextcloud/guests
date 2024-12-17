<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use OCP\Group\ISubAdmin;
use OCP\IConfig;
use OCP\IUserSession;

class Config {
	private $config;
	private $subAdmin;
	private $userSession;

	public function __construct(IConfig $config, ISubAdmin $subAdmin, IUserSession $userSession) {
		$this->config = $config;
		$this->subAdmin = $subAdmin;
		$this->userSession = $userSession;
	}

	/**
	 * @param string|bool $value
	 * @return bool
	 */
	private function castToBool($value): bool {
		return $value === 'true' || $value === true;
	}

	/**
	 * @param string|bool $value
	 * @return string
	 */
	private function castToString($value): string {
		return ($value === 'true' || $value === true) ? 'true' : 'false';
	}

	public function allowExternalStorage(): bool {
		return $this->castToBool($this->config->getAppValue('guests', 'allow_external_storage', 'false'));
	}

	/**
	 * @param string|bool $allow
	 */
	public function setAllowExternalStorage($allow) {
		$this->config->setAppValue('guests', 'allow_external_storage', $this->castToString($allow)) ;
	}

	public function hideOtherUsers(): bool {
		return $this->castToBool($this->config->getAppValue('guests', 'hide_users', 'true'));
	}

	/**
	 * @param string|bool $hide
	 */
	public function setHideOtherUsers($hide): void {
		$this->config->setAppValue('guests', 'hide_users', $this->castToString($hide)) ;
	}

	public function getHome(string $uid): string {
		return $this->config->getSystemValue('datadirectory', \OC::$SERVERROOT . '/data') . '/' . $uid;
	}

	public function useWhitelist(): bool {
		return $this->castToBool($this->config->getAppValue('guests', 'usewhitelist', 'true'));
	}

	/**
	 * @param string|bool $use
	 */
	public function setUseWhitelist($use) {
		$this->config->setAppValue('guests', 'usewhitelist', $this->castToString($use)) ;
	}

	/**
	 * @return string[]
	 */
	public function getAppWhitelist(): array {
		$whitelist = $this->config->getAppValue('guests', 'whitelist', AppWhitelist::DEFAULT_WHITELIST);
		return explode(',', $whitelist);
	}

	/**
	 * @param array|string $whitelist
	 */
	public function setAppWhitelist($whitelist): void {
		if (is_array($whitelist)) {
			$whitelist = implode(',', $whitelist);
		}
		$this->config->setAppValue('guests', 'whitelist', $whitelist);
	}

	public function isSharingRestrictedToGroup(): bool {
		return $this->config->getAppValue('core', 'shareapi_only_share_with_group_members', 'no') === 'yes';
	}

	public function canCreateGuests(): bool {
		if (!$this->userSession->getUser()) {
			return false;
		}
		return (!$this->isSharingRestrictedToGroup()) || $this->subAdmin->isSubAdmin($this->userSession->getUser());
	}
}
