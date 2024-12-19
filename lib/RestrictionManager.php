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
use OCP\IDBConnection;
use OCP\INavigationManager;
use OCP\IRequest;
use OCP\IServerContainer;
use OCP\IUser;
use OCP\IUserSession;
use OCP\Security\ICrypto;
use OCP\Settings\IManager;
use Psr\Log\LoggerInterface;

class RestrictionManager {
	/** @var AppWhitelist */
	private $whitelist;

	/** @var IRequest */
	private $request;

	/** @var IUserSession */
	private $userSession;

	/** @var IServerContainer */
	private $server;

	/** @var Hooks */
	private $hooks;

	/** @var GuestManager */
	private $guestManager;

	/** @var IMountProviderCollection */
	private $mountProviderCollection;

	/** @var Config */
	private $config;

	/** @var UserBackend */
	private $userBackend;

	public function __construct(
		AppWhitelist $whitelist,
		IRequest $request,
		IUserSession $userSession,
		IServerContainer $server,
		Hooks $hooks,
		GuestManager $guestManager,
		IMountProviderCollection $mountProviderCollection,
		Config $config,
		UserBackend $userBackend
	) {
		$this->whitelist = $whitelist;
		$this->request = $request;
		$this->userSession = $userSession;
		$this->server = $server;
		$this->hooks = $hooks;
		$this->guestManager = $guestManager;
		$this->mountProviderCollection = $mountProviderCollection;
		$this->config = $config;
		$this->userBackend = $userBackend;
	}

	public function verifyAccess(): void {
		$this->whitelist->verifyAccess($this->userSession->getUser(), $this->request);
	}

	public function setupRestrictions(): void {
		if ($this->guestManager->isGuest($this->userSession->getUser())) {
			\OCP\Util::connectHook('OC_Filesystem', 'preSetup', $this->hooks, 'setupReadonlyFilesystem');
			if (!$this->config->allowExternalStorage()) {
				$this->mountProviderCollection->registerMountFilter(function (IMountPoint $mountPoint, IUser $user) {
					return !($mountPoint instanceof ExternalMountPoint && $this->guestManager->isGuest($user));
				});
			}

			/** @var NavigationManager $navManager */
			$navManager = \OCP\Server::get(INavigationManager::class);

			$this->server->registerService(INavigationManager::class, function () use ($navManager) {
				return new FilteredNavigationManager($this->userSession->getUser(), $navManager, $this->whitelist);
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

				$this->server->registerService(AppConfig::class, function () {
					return new AppConfigOverwrite(
						$this->server->get(IDBConnection::class),
						$this->server->get(LoggerInterface::class),
						$this->server->get(ICrypto::class),
						[
							'core' => [
								'shareapi_only_share_with_group_members' => 'yes'
							]
						]
					);
				});
			}
		}
	}
}
