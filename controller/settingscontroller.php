<?php
/**
 * ownCloud
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING-AGPL file.
 *
 * @author Jörn Friedrich Dreyer <jfd@butonic.de>
 * @copyright Jörn Friedrich Dreyer 2015
 */

namespace OCA\Guests\Controller;

use OCA\Guests\Jail;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
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
		$conditions = $this->config->getAppValue('guests', 'conditions', 'quota');
		$conditions = explode(',', $conditions);
		$useWhitelist = $this->config->getAppValue('guests', 'usewhitelist', true);
		$whitelist = $this->config->getAppValue('guests', 'whitelist', Jail::DEFAULT_WHITELIST);
		$whitelist = explode(',', $whitelist);
		return new DataResponse([
			'conditions' => $conditions,
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
		$conditions = join(',', $conditions);
		$newWhitelist = [];
		foreach ($whitelist as $app) {
			$newWhitelist[] = trim($app);
		}
		$newWhitelist = join(',', $newWhitelist);
		$this->config->setAppValue('guests', 'conditions', $conditions);
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
		$whitelist = $this->config->getAppValue('guests', 'whitelist', Jail::DEFAULT_WHITELIST);
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
		$this->config->setAppValue('guests', 'whitelist', Jail::DEFAULT_WHITELIST);
		return new DataResponse([
			'whitelist' => explode(',', Jail::DEFAULT_WHITELIST),
		]);
	}
}
