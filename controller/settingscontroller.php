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

use OCA\Guests\AppWhitelist;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IConfig;
use OCP\IRequest;

/**
 * Class SettingsController is used to handle configuration changes on the
 * settings page
 *
 * @package OCA\Guests\Controller
 */
class SettingsController extends Controller {

	/**
	 * @var string
	 */
	private $userId;

	/**
	 * @var IConfig
	 */
	private $config;

	public function __construct($AppName, IRequest $request, $UserId, IConfig $config) {
		parent::__construct($AppName, $request);
		$this->userId = $UserId;
		$this->config = $config;
	}

	/**
	 * AJAX handler for getting the config
	 *
	 * @return DataResponse with the current config
	 */
	public function getConfig() {
		$useWhitelist = $this->config->getAppValue('guests', 'usewhitelist', true);
		if ($useWhitelist === 'true' || $useWhitelist === true) {
			$useWhitelist = true;
		} else {
			$useWhitelist = false;
		}
		$whitelist = $this->config->getAppValue('guests', 'whitelist', AppWhitelist::DEFAULT_WHITELIST);
		$whitelist = explode(',', $whitelist);
		return new DataResponse([
			'group' => $this->config->getAppValue('guests', 'group', 'guests'),
			'useWhitelist' => $useWhitelist,
			'whitelist' => $whitelist,
		]);
	}
	/**
	 * AJAX handler for setting the config
	 *
	 * @param $conditions string[]
	 * @param $group string
	 * @param $useWhitelist bool
	 * @param $whitelist string[]
	 * @return DataResponse
	 */
	public function setConfig($conditions, $group, $useWhitelist, $whitelist) {
		$newWhitelist = [];
		foreach ($whitelist as $app) {
			$newWhitelist[] = trim($app);
		}
		$newWhitelist = join(',', $newWhitelist);
		$this->config->setAppValue('guests', 'group', $group);
		$this->config->setAppValue('guests', 'usewhitelist', $useWhitelist);
		$this->config->setAppValue('guests', 'whitelist', $newWhitelist);
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
	public function getWhitelist() {
		$useWhitelist = $this->config->getAppValue('guests', 'useWhitelist', true);
		if ($useWhitelist === 'true' || $useWhitelist === true) {
			$useWhitelist = true;
		} else {
			$useWhitelist = false;
		}
		$whitelist = $this->config->getAppValue('guests', 'whitelist', AppWhitelist::DEFAULT_WHITELIST);
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
	public function resetWhitelist() {
		$this->config->setAppValue('guests', 'whitelist', AppWhitelist::DEFAULT_WHITELIST);
		return new DataResponse([
			'whitelist' => explode(',', AppWhitelist::DEFAULT_WHITELIST),
		]);
	}
}
