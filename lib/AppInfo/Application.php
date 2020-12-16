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
use OCA\Guests\Config;
use OCA\Guests\GroupBackend;
use OCA\Guests\GuestManager;
use OCA\Guests\Hooks;
use OCA\Guests\Listener\ShareAutoAcceptListener;
use OCA\Guests\Notifications\Notifier;
use OCA\Guests\RestrictionManager;
use OCA\Guests\UserBackend;
use OCP\AppFramework\App;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IUser;
use OCP\Notification\IManager as INotificationManager;
use OCP\Share\Events\ShareCreatedEvent;

class Application extends App {
	public const APP_ID = 'guests';

	public function __construct(array $urlParams = []) {
		parent::__construct(self::APP_ID, $urlParams);
	}

	public function setup(): void {
		$this->setupGuestManagement();
		$this->setupGuestRestrictions();
		$this->setupNotifications();
		$this->setupShareAccepting();
	}

	public function lateSetup(): void {
		$this->getRestrictionManager()->lateSetupRestrictions();
	}

	/**
	 * @return GuestManager
	 */
	private function getGuestManager(): GuestManager {
		return $this->getContainer()->query(GuestManager::class);
		;
	}

	/**
	 * @return RestrictionManager
	 */
	private function getRestrictionManager(): RestrictionManager {
		return $this->getContainer()->query(RestrictionManager::class);
	}

	/**
	 * @return UserBackend
	 */
	private function getUserBackend(): UserBackend {
		return $this->getContainer()->query(UserBackend::class);
	}

	/**
	 * @return Hooks
	 */
	private function getHookManager(): Hooks {
		return $this->getContainer()->query(Hooks::class);
	}

	/**
	 * @return Config
	 */
	private function getConfig(): Config {
		return $this->getContainer()->query(Config::class);
	}

	private function getNotificationManager(): INotificationManager {
		return $this->getContainer()->query(INotificationManager::class);
	}

	private function setupGuestManagement(): void {
		$container = $this->getContainer();
		/** @var Server $server */
		$server = $container->getServer();

		$server->getUserManager()->registerBackend($this->getUserBackend());

		$server->getEventDispatcher()->addListener(
			'OCA\Files::loadAdditionalScripts', function () {
				if (!$this->getGuestManager()->isGuest() && $this->getConfig()->canCreateGuests()) {
					\OCP\Util::addScript('guests', 'guests-main');
				}
			}
		);

		$server->getGroupManager()->addBackend($container->query(GroupBackend::class));
		/** @var Hooks $hooks */
		$server->getEventDispatcher()->addListener('OCP\Share::postShare', [$this->getHookManager(), 'handlePostShare']);
		$server->getEventDispatcher()->addListener(IUser::class . '::firstLogin', [$this->getHookManager(), 'handleFirstLogin']);
	}

	private function setupGuestRestrictions(): void {
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

	private function setupNotifications(): void {
		$notificationManager = $this->getNotificationManager();
		$notificationManager->registerNotifierService(Notifier::class);
	}

	private function setupShareAccepting(): void {
		/** @var IEventDispatcher $dispatcher */
		$dispatcher = $this->getContainer()->query(IEventDispatcher::class);
		$dispatcher->addServiceListener(ShareCreatedEvent::class, ShareAutoAcceptListener::class);
	}
}
