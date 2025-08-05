<?php

/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use OC\AppConfig;
use OC\NavigationManager;
use OCA\Files_External\Config\ExternalMountPoint;
use OCP\Files\Config\IMountProviderCollection;
use OCP\Files\Mount\IMountPoint;
use OCP\INavigationManager;
use OCP\IRequest;
use OCP\IServerContainer;
use OCP\IUser;
use OCP\IUserSession;
use OCP\Settings\IManager;
use Psr\Log\LoggerInterface;

class RestrictionManager {

	public function __construct(
		private AppWhitelist $whitelist,
		private IRequest $request,
		private IUserSession $userSession,
		private IServerContainer $server,
		private Hooks $hooks,
		private GuestManager $guestManager,
		private IMountProviderCollection $mountProviderCollection,
		private Config $config,
		private UserBackend $userBackend,
		private LoggerInterface $logger,
	) {
	}

	public function verifyAccess(): void {
		$this->whitelist->verifyAccess($this->userSession->getUser(), $this->request);
	}

	public function setupRestrictions(): void {
		$user = $this->userSession->getUser();

		if ($user === null) {
			// No user logged in, no restrictions needed
			$this->logger->warning('No user session found, skipping guest restrictions setup.');
			return;
		}

		if ($this->guestManager->isGuest($user)) {
			\OCP\Util::connectHook('OC_Filesystem', 'preSetup', $this->hooks, 'setupReadonlyFilesystem');
			if (!$this->config->allowExternalStorage()) {
				$this->mountProviderCollection->registerMountFilter(function (IMountPoint $mountPoint, IUser $user) {
					return !($mountPoint instanceof ExternalMountPoint && $this->guestManager->isGuest($user));
				});
			}

			/** @var NavigationManager $navManager */
			$navManager = \OCP\Server::get(INavigationManager::class);

			$this->server->registerService(INavigationManager::class, function () use ($navManager, $user) {
				return new FilteredNavigationManager($user, $navManager, $this->whitelist);
			});

			$settingsManager = $this->server->get(IManager::class);
			$this->server->registerService(IManager::class, function () use ($settingsManager) {
				return new FilteredSettingsManager($settingsManager, $this->whitelist);
			});
		}
	}

	public function lateSetupRestrictions(): void {
		if ($this->guestManager->isGuest($this->userSession->getUser())) {
			if ($this->config->hideOtherUsers()) {
				$this->server->getContactsManager()->clear();

				$this->userBackend->setAllowListing(false);

				/** @var AppConfigOverwrite $appConfig */
				$appConfig = $this->server->get(AppConfigOverwrite::class);
				$appConfig->setOverwrite([
					'core' => [
						'shareapi_only_share_with_group_members' => 'yes'
					]
				]);

				$this->server->registerService(AppConfig::class, function () use ($appConfig) {
					return $appConfig;
				});
			}
		}
	}
}
