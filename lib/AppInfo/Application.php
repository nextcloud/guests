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
use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCA\Guests\Listener\LoadAdditionalScriptsListener;
use OCA\Guests\GroupBackend;
use OCA\Guests\Hooks;
use OCA\Guests\Listener\ShareAutoAcceptListener;
use OCA\Guests\Notifications\Notifier;
use OCA\Guests\RestrictionManager;
use OCA\Guests\UserBackend;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\IUser;
use OCP\Notification\IManager as INotificationManager;
use OCP\Share\Events\ShareCreatedEvent;

class Application extends App implements IBootstrap {
	public const APP_ID = 'guests';

	public function __construct(array $urlParams = []) {
		parent::__construct(self::APP_ID, $urlParams);
	}

	public function register(IRegistrationContext $context): void {
		$this->setupGuestManagement($context);
		$this->setupGuestRestrictions();
		$this->setupNotifications();
		$this->setupShareAccepting($context);
	}

	public function boot(IBootContext $context): void {
		$context->getAppContainer()->query(RestrictionManager::class)->lateSetupRestrictions();
	}

	private function setupGuestManagement(IRegistrationContext $context): void {
		$container = $this->getContainer();
		/** @var Server $server */
		$server = $container->getServer();

		// FIXME: use IRegistrationContext once a suitable method is available
		$server->getUserManager()->registerBackend($container->query(UserBackend::class));
		$server->getGroupManager()->addBackend($container->query(GroupBackend::class));

		// FIXME: port to event classes once available in server
		$hookManager = $container->query(Hooks::class);
		$server->getEventDispatcher()->addListener('OCP\Share::postShare', [$hookeManager, 'handlePostShare']);
		$server->getEventDispatcher()->addListener(IUser::class . '::firstLogin', [$hookManager, 'handleFirstLogin']);

		$context->registerEventListener(LoadAdditionalScriptsEvent::class, LoadAdditionalScriptsListener::class);
	}

	private function setupGuestRestrictions() {
		$container = $this->getContainer();
		/** @var Server $server */
		$server = $container->getServer();

		$userSession = $server->getUserSession();
		$user = $userSession->getUser();
		/** @var RestrictionManager $restrictionManager */
		$restrictionManager = $container->query(RestrictionManager::class);

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
		$notificationManager = $this->getContainer()->query(INotificationManager::class);
		$notificationManager->registerNotifierService(Notifier::class);
	}

	private function setupShareAccepting(IRegistrationContext $context): void {
		$context->registerEventListener(ShareCreatedEvent::class, ShareAutoAcceptListener::class);
	}
}
