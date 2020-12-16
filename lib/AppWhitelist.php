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

use OCP\App\IAppManager;
use OCP\IL10N;
use OCP\ILogger;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\IUser;
use OCP\Template;

/**
 * Only allow whitelisted apps to be accessed by guests
 *
 * @package OCA\Guests
 */
class AppWhitelist {
	/** @var Config */
	private $config;
	/** @var GuestManager */
	private $guestManager;
	/** @var IL10N */
	private $l10n;
	/** @var IAppManager */
	private $appManager;
	/** @var string */
	private $baseUrl;
	/** @var int */
	private $baseUrlLength;
	/** @var ILogger */
	private $logger;

	public const WHITELIST_ALWAYS = ',core,theming,settings,avatar,files,heartbeat,dav,guests,impersonate,accessibility,terms_of_service,dashboard,weather_status,user_status,apporder';

	public const DEFAULT_WHITELIST = 'files_trashbin,files_versions,files_sharing,files_texteditor,text,activity,firstrunwizard,photos,notifications,dashboard,user_status,weather_status';

	/**
	 * AppWhitelist constructor.
	 *
	 * @param Config $config
	 * @param GuestManager $guestManager
	 * @param IL10N $l10n
	 * @param IAppManager $appManager
	 * @param IURLGenerator $urlGenerator
	 * @param ILogger $logger
	 */
	public function __construct(
		Config $config,
		GuestManager $guestManager,
		IL10N $l10n,
		IAppManager $appManager,
		IURLGenerator $urlGenerator,
		ILogger $logger
	) {
		$this->config = $config;
		$this->guestManager = $guestManager;
		$this->l10n = $l10n;
		$this->appManager = $appManager;
		$this->baseUrl = $urlGenerator->getBaseUrl();
		$this->baseUrlLength = strlen($this->baseUrl);
		$this->logger = $logger;
	}

	private function isAppWhitelisted($appId): bool {
		$whitelist = $this->config->getAppWhitelist();
		$alwaysEnabled = explode(',', self::WHITELIST_ALWAYS);

		return in_array($appId, array_merge($whitelist, $alwaysEnabled), true);
	}

	public function isWhitelistEnabled(): bool {
		return $this->config->useWhitelist();
	}

	public function isUrlAllowed(IUser $user, $url): bool {
		if ($this->guestManager->isGuest($user) && $this->isWhitelistEnabled()) {
			$app = $this->getRequestedApp($url);

			if ($this->isAppWhitelisted($app)) {
				return true;
			} else {
				if ($url === '/apps/files_external/api/v1/mounts') {
					// fake successful response
					echo "[]";
					exit;
				}
				$this->logger->info("Blocking access to non-whitelisted app ($app) for guest", ['app' => 'guests']);
				return false;
			}
		} else {
			return true;
		}
	}

	public function verifyAccess(IUser $user, IRequest $request): void {
		if (!$this->isUrlAllowed($user, $request->getRawPathInfo())) {
			header('HTTP/1.0 403 Forbidden');
			Template::printErrorPage($this->l10n->t(
				'Access to this resource is forbidden for guests.'
			));
			exit;
		}
	}

	/**
	 * Core has \OC::$REQUESTEDAPP but it isn't set until the routes are matched
	 * taken from \OC\Route\Router::match()
	 */
	private function getRequestedApp($url): string {
		if (substr($url, 0, $this->baseUrlLength) === $this->baseUrl) {
			$url = substr($url, $this->baseUrlLength);
		}
		if (strpos($url, '/index.php/') === 0) {
			$url = substr($url, 10);
		}
		if (substr($url, 0, 6) === '/apps/') {
			// empty string / 'apps' / $app / rest of the route
			[, , $app,] = explode('/', $url, 4);
			return \OC_App::cleanAppId($app);
		} elseif ($url === '/cron.php') {
			return 'core';
		} elseif (substr($url, 0, 6) === '/core/') {
			return 'core';
		} elseif (substr($url, 0, 4) === '/js/') {
			return 'core';
		} elseif (substr($url, 0, 5) === '/css/') {
			return 'core';
		} elseif (substr($url, 0, 6) === '/login') {
			return 'core';
		} elseif (substr($url, 0, 7) === '/logout') {
			return 'core';
		} elseif (substr($url, 0, 3) === '/f/') {
			return 'files';
		} elseif (substr($url, 0, 8) === '/webdav/') {
			return 'dav';
		} elseif (substr($url, 0, 5) === '/dav/') {
			return 'dav';
		} elseif (substr($url, 0, 10) === '/settings/') {
			return 'settings';
		} elseif (substr($url, 0, 8) === '/avatar/') {
			return 'avatar';
		} elseif (substr($url, 0, 10) === '/heartbeat') {
			return 'heartbeat';
		}
		return 'core';
	}

	public function getWhitelistAbleApps(): array {
		return array_values(array_diff(
			$this->appManager->getInstalledApps(),
			explode(',', self::WHITELIST_ALWAYS)
		));
	}
}
