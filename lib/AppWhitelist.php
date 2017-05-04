<?php

/**
 * @author Ilja Neumann <ineumann@owncloud.com>
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
 */

namespace OCA\Guests;


use OCP\IConfig;
use OCP\IL10N;
use OCP\Template;

/**
 * Only allow whitelisted apps to be accessed by guests
 *
 * @package OCA\Guests
 */
class AppWhitelist {
	/** @var IConfig */
	private $config;
	/** @var GuestManager */
	private $guestManager;
	/** @var IL10N */
	private $l10n;

	const WHITELIST_ALWAYS = ',core,theming,settings,avatar,files';

	const DEFAULT_WHITELIST = 'files_external,files_trashbin,files_versions,files_sharing,files_texteditor,activity,firstrunwizard,gallery,notifications';

	/**
	 * AppWhitelist constructor.
	 *
	 * @param IConfig $config
	 * @param GuestManager $guestManager
	 * @param IL10N $l10n
	 */
	public function __construct(IConfig $config, GuestManager $guestManager, IL10N $l10n) {
		$this->config = $config;
		$this->guestManager = $guestManager;
		$this->l10n = $l10n;
	}

	private function isAppWhitelisted($appId) {
		$whitelist = explode(',', $this->config->getAppValue(
			'guests',
			'whitelist',
			self::DEFAULT_WHITELIST
		));
		$alwaysEnabled = explode(',', self::WHITELIST_ALWAYS);


		return in_array($appId, array_merge($whitelist, $alwaysEnabled), true);
	}

	public function isWhitelistEnabled() {
		return $this->config->getAppValue('guests', 'usewhitelist', 'true') === 'true';
	}

	public function verifyAccess($uid) {
		if (empty($uid)) {
			return;
		}

		if ($this->guestManager->isGuest($uid) && $this->isWhitelistEnabled()) {
			$app = $this->getRequestedApp();

			if (!$this->isAppWhitelisted($app)) {
				header('HTTP/1.0 403 Forbidden');;
				Template::printErrorPage($this->l10n->t(
					'Access to this resource is forbidden for guests.'
				));
				exit;
			}
		}
	}

	/**
	 * Core has \OC::$REQUESTEDAPP but it isn't set until the routes are matched
	 * taken from \OC\Route\Router::match()
	 */
	private function getRequestedApp() {
		// TODO: inject request?
		$url = \OC::$server->getRequest()->getRawPathInfo();
		if (substr($url, 0, 6) === '/apps/') {
			// empty string / 'apps' / $app / rest of the route
			list(, , $app,) = explode('/', $url, 4);
			return \OC_App::cleanAppId($app);
		} else if ($url === '/cron.php') {
			return 'core';
		} else if (substr($url, 0, 6) === '/core/') {
			return 'core';
		} else if (substr($url, 0, 5) === '/css/') {
			return 'core';
		} else if (substr($url, 0, 3) === '/f/') {
			return 'files';
		} else if (substr($url, 0, 12) === '/webdav/') {
			return 'core';
		} else if (substr($url, 0, 10) === '/settings/') {
			return 'settings';
		} else if (substr($url, 0, 8) === '/avatar/') {
			return 'avatar';
		} else if (substr($url, 0, 10) === '/heartbeat') {
			return 'heartbeat';
		}
		return false;
	}
}
