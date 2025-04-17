<?php

/**
 * SPDX-FileCopyrightText: 2017-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2017 ownCloud GmbH
 * SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
 */

namespace OCA\Guests\Controller;

use OCA\Guests\AppInfo\Application;
use OCA\Guests\AppWhitelist;
use OCA\Guests\Config;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

/**
 * Class SettingsController is used to handle configuration changes on the
 * settings page
 *
 * @package OCA\Guests\Controller
 */
class SettingsController extends Controller {

	public function __construct(
		IRequest $request,
		private Config $config,
		private AppWhitelist $appWhitelist,
	) {
		parent::__construct(Application::APP_ID, $request);
	}

	/**
	 * AJAX handler for getting the config
	 *
	 * @return DataResponse with the current config
	 */
	public function getConfig(): DataResponse {
		$useWhitelist = $this->config->useWhitelist();
		$allowExternalStorage = $this->config->allowExternalStorage();
		$hideUsers = $this->config->hideOtherUsers();
		$whitelist = $this->config->getAppWhitelist();
		return new DataResponse([
			'useWhitelist' => $useWhitelist,
			'whitelist' => $whitelist,
			'allowExternalStorage' => $allowExternalStorage,
			'hideUsers' => $hideUsers,
			'whiteListableApps' => $this->appWhitelist->getWhitelistAbleApps(),
			'sharingRestrictedToGroup' => $this->config->isSharingRestrictedToGroup(),
			'createRestrictedToGroup' => $this->config->getCreateRestrictedToGroup(),
		]);
	}

	/**
	 * @param $useWhitelist bool
	 * @param $whitelist string[]
	 * @param $allowExternalStorage bool
	 * @param $hideUsers bool
	 * @return DataResponse
	 */
	public function setConfig(bool $useWhitelist, array $whitelist, bool $allowExternalStorage, bool $hideUsers, array $createRestrictedToGroup): DataResponse {
		$newWhitelist = [];
		foreach ($whitelist as $app) {
			$newWhitelist[] = trim($app);
		}
		$this->config->setUseWhitelist($useWhitelist);
		$this->config->setAppWhitelist($newWhitelist);
		$this->config->setAllowExternalStorage($allowExternalStorage);
		$this->config->setHideOtherUsers($hideUsers);
		$this->config->setCreateRestrictedToGroup($createRestrictedToGroup);
		return new DataResponse();
	}

	/**
	 * AJAX handler for getting the whitelisted apps
	 * We do not set the whitelist to null when it is unused. This is by design.
	 * It allows remembering the whitelist throughout changes.
	 *
	 * @return DataResponse with the current whitelist config
	 */
	public function getWhitelist(): DataResponse {
		$useWhitelist = $this->config->useWhitelist();
		$whitelist = $this->config->getAppWhitelist();
		return new DataResponse([
			'useWhitelist' => $useWhitelist,
			'whitelist' => $whitelist,
		]);
	}

	/**
	 * AJAX handler for resetting the whitelisted apps
	 *
	 * @return DataResponse with the reset whitelist
	 */
	public function resetWhitelist(): DataResponse {
		$this->config->setAppWhitelist(AppWhitelist::DEFAULT_WHITELIST);
		return new DataResponse([
			'whitelist' => explode(',', AppWhitelist::DEFAULT_WHITELIST),
		]);
	}
}
