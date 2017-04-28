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


use OCP\Template;

/**
 * Only allow whitelisted apps to be accessed by guests
 *
 * @package OCA\Guests
 */
class AppWhitelist {

	const DEFAULT_WHITELIST = ',core,settings,avatar,files,files_external,files_trashbin,files_versions,files_sharing,files_texteditor,activity,firstrunwizard,gallery,notifications';

	public static function preSetup($params) {
		$uid = $params['user'];

		if (empty($uid)) {
			return;
		}

		$config = \OC::$server->getConfig();
		$isGuest = $config->getUserValue($uid, 'nextcloud', 'isGuest', false);
		$whitelistEnabled = $config->getAppValue('guests', 'usewhitelist', 'true') === 'true';

		if ($isGuest && $whitelistEnabled) {
			$path = \OC::$server->getRequest()->getRawPathInfo();
			$app = self::getRequestedApp($path);
			$whitelist = explode(',' , $config->getAppValue(
				'guests',
				'whitelist',
				self::DEFAULT_WHITELIST
			));

			if (!in_array($app, $whitelist)) {
				header('HTTP/1.0 403 Forbidden');
				$l = \OC::$server->getL10NFactory()->get('guests');
				Template::printErrorPage($l->t(
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
	private static function getRequestedApp($url) {
		if (substr($url, 0, 6) === '/apps/') {
			// empty string / 'apps' / $app / rest of the route
			list(, , $app,) = explode('/', $url, 4);
			return  \OC_App::cleanAppId($app);
		} else if (substr($url, 0, 6) === '/core/') {
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
