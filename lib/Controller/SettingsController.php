<?php
/**
 * @author Jörn Friedrich Dreyer <jfd@butonic.de>
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
 *
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

	/** @var Config */
	private $config;

	/** @var AppWhitelist */
	private $appWhitelist;

	public function __construct(
		IRequest $request,
		Config $config,
		AppWhitelist $appWhitelist
	) {
		parent::__construct(Application::APP_ID, $request);
		$this->config = $config;
		$this->appWhitelist = $appWhitelist;
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
		]);
	}

	/**
	 * @param $useWhitelist bool
	 * @param $whitelist string[]
	 * @param $allowExternalStorage bool
	 * @param $hideUsers bool
	 * @return DataResponse
	 */
	public function setConfig(bool $useWhitelist, array $whitelist, bool $allowExternalStorage, bool $hideUsers): DataResponse {
		$newWhitelist = [];
		foreach ($whitelist as $app) {
			$newWhitelist[] = trim($app);
		}
		$this->config->setUseWhitelist($useWhitelist);
		$this->config->setAppWhitelist($newWhitelist);
		$this->config->setAllowExternalStorage($allowExternalStorage);
		$this->config->setHideOtherUsers($hideUsers);
		return new DataResponse();
	}

	/**
	 * AJAX handler for getting the whitelisted apps
	 * We do not set the whitelist to null when it is unused. This is by design.
	 * It allows remembering the whitelist throughout changes.
	 *
	 * @NoAdminRequired
	 * @return DataResponse with the current whitelist config
	 */
	public function getWhitelist(): DataResponse {
		$useWhitelist = $this->config->useWhitelist();
		$whitelist = $this->config->getAppWhitelist();
		$whitelist = explode(',', $whitelist);
		return new DataResponse([
			'useWhitelist' => $useWhitelist,
			'whitelist' => $whitelist,
		]);
	}

	/**
	 * AJAX handler for resetting the whitelisted apps
	 *
	 * @NoAdminRequired
	 * @return DataResponse with the reset whitelist
	 */
	public function resetWhitelist(): DataResponse {
		$this->config->setAppWhitelist(AppWhitelist::DEFAULT_WHITELIST);
		return new DataResponse([
			'whitelist' => explode(',', AppWhitelist::DEFAULT_WHITELIST),
		]);
	}
}
