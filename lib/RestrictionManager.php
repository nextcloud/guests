<?php

declare(strict_types=1);

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
use OCP\Server;
use OCP\Settings\IManager;
use OCP\Util;
use Psr\Log\LoggerInterface;

class RestrictionManager {

	public function __construct(
		private readonly AppWhitelist $whitelist,
		private readonly IRequest $request,
		private readonly IUserSession $userSession,
		private readonly IServerContainer $server,
		private readonly Hooks $hooks,
		private readonly GuestManager $guestManager,
		private readonly IMountProviderCollection $mountProviderCollection,
		private readonly Config $config,
		private readonly UserBackend $userBackend,
		private readonly LoggerInterface $logger,
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
			Util::connectHook('OC_Filesystem', 'preSetup', $this->hooks, 'setupReadonlyFilesystem');
			if (!$this->config->allowExternalStorage()) {
				$this->mountProviderCollection->registerMountFilter(fn (IMountPoint $mountPoint, IUser $user): bool => !($mountPoint instanceof ExternalMountPoint && $this->guestManager->isGuest($user)));
			}

			/** @var NavigationManager $navManager */
			$navManager = Server::get(INavigationManager::class);

			$this->server->registerService(INavigationManager::class, fn (): FilteredNavigationManager => new FilteredNavigationManager($user, $navManager, $this->whitelist));

			$settingsManager = $this->server->get(IManager::class);
			$this->server->registerService(IManager::class, fn (): FilteredSettingsManager => new FilteredSettingsManager($settingsManager, $this->whitelist));
		}
	}

	public function lateSetupRestrictions(): void {
		if ($this->guestManager->isGuest($this->userSession->getUser()) && $this->config->hideOtherUsers()) {
			$this->server->getContactsManager()->clear();
			$this->userBackend->setAllowListing(false);
			/** @var AppConfigOverwrite $appConfig */
			$appConfig = $this->server->get(AppConfigOverwrite::class);
			$appConfig->setOverwrite([
				'core' => [
					'shareapi_only_share_with_group_members' => 'yes'
				]
			]);
			$this->server->registerService(AppConfig::class, fn () => $appConfig);
		}
	}
}
