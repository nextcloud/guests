<?php
/**
 * @copyright Copyright (c) 2018 Robin Appelman <robin@icewind.nl>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
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
			$navManager = $this->server->getNavigationManager();

			$this->server->registerService(INavigationManager::class, function () use ($navManager) {
				return new FilteredNavigationManager($this->userSession->getUser(), $navManager, $this->whitelist);
			});
		}
	}

	public function lateSetupRestrictions(): void {
		if ($this->guestManager->isGuest($this->userSession->getUser())) {
			if ($this->config->hideOtherUsers()) {
				$this->server->getContactsManager()->clear();

				$this->userBackend->setAllowListing(false);

				$this->server->registerService(AppConfig::class, function () {
					return new AppConfigOverwrite($this->server->getDatabaseConnection(), [
						'core' => [
							'shareapi_only_share_with_group_members' => 'yes'
						]
					]);
				});
			}
		}
	}
}
