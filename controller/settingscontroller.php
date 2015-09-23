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

use OCA\Guests\Backend;
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
		$conditions = $this->config->getUserValue($this->userId, 'guests', 'conditions', 'quota');
		$conditions = explode(',', $conditions);
		$apps = $this->config->getUserValue($this->userId, 'guests', 'apps', Backend::DEFAULT_GUEST_GROUPS);
		$apps = explode(',', $apps);
		return new DataResponse([
			'conditions' => $conditions,
			'group' => $this->config->getUserValue($this->userId, 'guests', 'group', 'guests'),
			'apps' => $apps,
		]);
	}
	/**
	 * AJAX handler for setting the config
	 *
	 * @param $conditions string[]
	 * @param $group string
	 * @param $apps string[]
	 * @return DataResponse
	 */
	public function setConfig($conditions, $group, $apps) {
		$conditions = join(',', $conditions);
		$newApps = [];
		foreach ($apps as $app) {
			$newApps[] = trim($app);
		}
		$newApps = join(',', $newApps);
		$this->config->setUserValue($this->userId, 'guests', 'conditions', $conditions);
		$this->config->setUserValue($this->userId, 'guests', 'group', $group);
		$this->config->setUserValue($this->userId, 'guests', 'apps', $newApps);
		return new DataResponse();
	}

}
