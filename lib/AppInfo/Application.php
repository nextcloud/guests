<?php
/**
 * @copyright Copyright (c) 2017 Robin Appelman <robin@icewind.nl>
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

namespace OCA\Guests\AppInfo;

use OC\Server;
use OCA\Guests\GroupBackend;
use OCA\Guests\GuestManager;
use OCA\Guests\Hooks;
use OCA\Guests\RestrictionManager;
use OCA\Guests\UserBackend;
use OCP\AppFramework\App;

class Application extends App {
	public function __construct(array $urlParams = array()) {
		parent::__construct('guests', $urlParams);
	}

	public function setup() {
		$this->setupGuestManagement();
		$this->setupGuestRestrictions();
	}

	/**
	 * @return GuestManager
	 */
	private function getGuestManager() {
		return $this->getContainer()->query(GuestManager::class);;
	}

	/**
	 * @return RestrictionManager
	 */
	private function getRestrictionManager() {
		return $this->getContainer()->query(RestrictionManager::class);
	}

	/**
	 * @return UserBackend
	 */
	private function getUserBackend() {
		return $this->getContainer()->query(UserBackend::class);
	}

	/**
	 * @return Hooks
	 */
	private function getHookManager() {
		return $this->getContainer()->query(Hooks::class);
	}

	private function setupGuestManagement() {
		$container = $this->getContainer();
		/** @var Server $server */
		$server = $container->getServer();

		$server->getUserManager()->registerBackend($this->getUserBackend());

		$userSession = $server->getUserSession();
		$user = $userSession->getUser();

		if (!$this->getGuestManager()->isGuest($user)) {
			$server->getEventDispatcher()->addListener(
				'OCA\Files::loadAdditionalScripts',
				function () {
					\OCP\Util::addScript('guests', '../dist/main');
					\OCP\Util::addStyle('guests', 'app');
					\OCP\Util::addStyle('guests', '../dist/main');
				}
			);
		}

		$server->getGroupManager()->addBackend(new GroupBackend(
			$this->getGuestManager(),
			'guest_app'
		));
		/** @var Hooks $hooks */
		$server->getEventDispatcher()->addListener('OCP\Share::postShare', [$this->getHookManager(), 'handlePostShare']);
	}

	private function setupGuestRestrictions() {
		$container = $this->getContainer();
		/** @var Server $server */
		$server = $container->getServer();

		$userSession = $server->getUserSession();
		$user = $userSession->getUser();
		/** @var RestrictionManager $restrictionManager */
		$restrictionManager = $this->getRestrictionManager();


		if ($user) {
			$restrictionManager->verifyAccess();
			$restrictionManager->setupRestrictions();
		} else {
			$userSession->listen('\OC\User', 'postLogin', function () use ($restrictionManager) {
				$restrictionManager->verifyAccess();
				$restrictionManager->setupRestrictions();
			});
		}
	}
}
