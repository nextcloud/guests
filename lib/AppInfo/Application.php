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

use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCA\Guests\Listener\LoadAdditionalScriptsListener;
use OCA\Guests\Capabilities;
use OCA\Guests\GroupBackend;
use OCA\Guests\Hooks;
use OCA\Guests\Listener\ShareAutoAcceptListener;
use OCA\Guests\Listener\TalkIntegrationListener;
use OCA\Guests\Notifications\Notifier;
use OCA\Guests\RestrictionManager;
use OCA\Guests\UserBackend;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Http\Events\BeforeTemplateRenderedEvent;
use OCP\AppFramework\IAppContainer;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IGroupManager;
use OCP\IServerContainer;
use OCP\IUserManager;
use OCP\Notification\IManager as INotificationManager;
use OCP\Share\Events\ShareCreatedEvent;
use OCP\User\Events\UserFirstTimeLoggedInEvent;

class Application extends App implements IBootstrap {
	public const APP_ID = 'guests';

	public function __construct(array $urlParams = []) {
		parent::__construct(self::APP_ID, $urlParams);
	}

	public function register(IRegistrationContext $context): void {
		$context->registerCapability(Capabilities::class);

		$context->registerEventListener(LoadAdditionalScriptsEvent::class, LoadAdditionalScriptsListener::class);
		$context->registerEventListener(ShareCreatedEvent::class, ShareAutoAcceptListener::class);
		$context->registerEventListener(BeforeTemplateRenderedEvent::class, TalkIntegrationListener::class);
	}

	public function boot(IBootContext $context): void {
		// need to cheat here since there's no way to register these in IRegistrationContext
		$container = $context->getServerContainer();
		$container->get(IUserManager::class)->registerBackend($container->query(UserBackend::class));
		$container->get(IGroupManager::class)->addBackend($container->query(GroupBackend::class));

		$this->setupGuestManagement($context->getAppContainer(), $context->getServerContainer());
		$this->setupGuestRestrictions($context->getAppContainer(), $context->getServerContainer());
		$this->setupNotifications($context->getAppContainer());
		$context->getAppContainer()->query(RestrictionManager::class)->lateSetupRestrictions();
	}

	private function setupGuestManagement(IAppContainer $container, IServerContainer $server): void {
		$hookManager = $container->query(Hooks::class);
		$server->get(IEventDispatcher::class)->addListener(ShareCreatedEvent::class, [$hookManager, 'handlePostShare']);
		$server->get(IEventDispatcher::class)->addListener(UserFirstTimeLoggedInEvent::class, [$hookManager, 'handleFirstLogin']);
	}

	private function setupGuestRestrictions(IAppContainer $container, IServerContainer $server): void {
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

	private function setupNotifications(IAppContainer $container): void {
		$notificationManager = $container->query(INotificationManager::class);
		$notificationManager->registerNotifierService(Notifier::class);
	}
}
