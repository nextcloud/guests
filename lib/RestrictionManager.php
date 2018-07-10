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


use OC\Files\Filesystem;
use OC\Files\Storage\FailedStorage;
use OC\NavigationManager;
use OCA\Files_External\Config\ExternalMountPoint;
use OCP\Files\Config\IMountProviderCollection;
use OCP\Files\Mount\IMountPoint;
use OCP\Files\Storage\IStorage;
use OCP\IConfig;
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

	/** @var IConfig */
	private $config;

	public function __construct(
		AppWhitelist $whitelist,
		IRequest $request,
		IUserSession $userSession,
		IServerContainer $server,
		Hooks $hooks,
		GuestManager $guestManager,
		IMountProviderCollection $mountProviderCollection,
		IConfig $config
	) {
		$this->whitelist = $whitelist;
		$this->request = $request;
		$this->userSession = $userSession;
		$this->server = $server;
		$this->hooks = $hooks;
		$this->guestManager = $guestManager;
		$this->mountProviderCollection = $mountProviderCollection;
		$this->config = $config;
	}

	public function verifyAccess() {
		$this->whitelist->verifyAccess($this->userSession->getUser(), $this->request);
	}

	public function setupRestrictions() {
		if ($this->guestManager->isGuest($this->userSession->getUser())) {
			\OCP\Util::connectHook('OC_Filesystem', 'preSetup', $this->hooks, 'setupReadonlyFilesystem');
			if ($this->config->getAppValue('guests', 'allow_external_storage', 'false') !== 'true') {
				$this->mountProviderCollection->registerMountFilter(function (IMountPoint $mountPoint, IUser $user) {
					return !($mountPoint instanceof ExternalMountPoint && $this->guestManager->isGuest($user));
				});
			}

			/** @var NavigationManager $navManager */
			$navManager = $this->server->getNavigationManager();

			\OCP\Util::addStyle('guests', 'personal');

			$this->server->registerService('NavigationManager', function () use ($navManager) {
				return new FilteredNavigationManager($this->userSession->getUser(), $navManager, $this->whitelist);
			});
		}
	}
}
