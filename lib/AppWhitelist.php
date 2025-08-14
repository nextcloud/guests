<?php

/**
 * SPDX-FileCopyrightText: 2017-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2017 ownCloud GmbH
 * SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
 */

namespace OCA\Guests;

use OCP\App\IAppManager;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\IUser;
use OCP\Template;
use Psr\Log\LoggerInterface;

/**
 * Only allow whitelisted apps to be accessed by guests
 *
 * @package OCA\Guests
 */
class AppWhitelist {
	private string $baseUrl;
	private int $baseUrlLength;

	public const WHITELIST_ALWAYS = ',core,theming,settings,avatar,files,heartbeat,dav,guests,impersonate,accessibility,terms_of_service,dashboard,weather_status,user_status,apporder,twofactor_totp,twofactor_webauthn,twofactor_backupcodes,twofactor_nextcloud_notification';

	public const DEFAULT_WHITELIST = 'files_trashbin,files_versions,files_sharing,files_texteditor,text,activity,firstrunwizard,photos,notifications,dashboard,user_status,weather_status';

	/**
	 * AppWhitelist constructor.
	 *
	 * @param Config $config
	 * @param GuestManager $guestManager
	 * @param IL10N $l10n
	 * @param IAppManager $appManager
	 * @param IURLGenerator $urlGenerator
	 * @param LoggerInterface $logger
	 */
	public function __construct(
		IURLGenerator $urlGenerator,
		private Config $config,
		private GuestManager $guestManager,
		private IL10N $l10n,
		private IAppManager $appManager,
		private LoggerInterface $logger,
	) {
		$this->baseUrl = $urlGenerator->getBaseUrl();
		$this->baseUrlLength = strlen($this->baseUrl);
	}

	public function isAppWhitelisted(string $appId): bool {
		$whitelist = $this->config->getAppWhitelist();
		$alwaysEnabled = explode(',', self::WHITELIST_ALWAYS);

		return in_array($appId, array_merge($whitelist, $alwaysEnabled), true);
	}

	public function isWhitelistEnabled(): bool {
		return $this->config->useWhitelist();
	}

	/**
	 * @param false|string $url
	 */
	public function isUrlAllowed(IUser $user, string|false $url): bool {
		if ($this->guestManager->isGuest($user) && $this->isWhitelistEnabled()) {
			$app = $this->getRequestedApp($url);

			if ($this->isAppWhitelisted($app)) {
				return true;
			} else {
				if ($url === '/apps/files_external/api/v1/mounts') {
					// fake successful response
					echo '[]';
					exit;
				}
				$this->logger->notice("Blocking access to non-whitelisted app ($app) for guest", ['app' => 'guests']);
				return false;
			}
		} else {
			return true;
		}
	}

	public function verifyAccess(IUser $user, IRequest $request): void {
		if (!$this->isUrlAllowed($user, $request->getPathInfo())) {
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
	 *
	 * @param false|string $url
	 */
	private function getRequestedApp(string|false $url): string {
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
		} elseif (substr($url, 0, 6) === '/call/') {
			return 'spreed';
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
