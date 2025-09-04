<?php

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\AppInfo;

use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCA\Guests\Capabilities;
use OCA\Guests\GroupBackend;
use OCA\Guests\Hooks;
use OCA\Guests\Listener\BeforeTemplateRenderedListener;
use OCA\Guests\Listener\BeforeUserManagementRenderedListener;
use OCA\Guests\Listener\LoadAdditionalScriptsListener;
use OCA\Guests\Listener\ShareAutoAcceptListener;
use OCA\Guests\Listener\UserChangedListener;
use OCA\Guests\Notifications\Notifier;
use OCA\Guests\RestrictionManager;
use OCA\Guests\UserBackend;
use OCA\Settings\Events\BeforeTemplateRenderedEvent as BeforeUserManagementRenderedEvent;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Http\Events\BeforeTemplateRenderedEvent;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IGroupManager;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Notification\IManager as INotificationManager;
use OCP\Share\Events\ShareCreatedEvent;
use OCP\User\Events\UserChangedEvent;
use OCP\User\Events\UserFirstTimeLoggedInEvent;
use Psr\Container\ContainerInterface;

class Application extends App implements IBootstrap {
	public const APP_ID = 'guests';

	public function __construct(array $urlParams = []) {
		parent::__construct(self::APP_ID, $urlParams);
	}

	public function register(IRegistrationContext $context): void {
		$context->registerCapability(Capabilities::class);

		$context->registerEventListener(LoadAdditionalScriptsEvent::class, LoadAdditionalScriptsListener::class);
		$context->registerEventListener(ShareCreatedEvent::class, ShareAutoAcceptListener::class);
		$context->registerEventListener(BeforeTemplateRenderedEvent::class, BeforeTemplateRenderedListener::class);
		$context->registerEventListener(BeforeUserManagementRenderedEvent::class, BeforeUserManagementRenderedListener::class);
		$context->registerEventListener(UserChangedEvent::class, UserChangedListener::class);
	}

	public function boot(IBootContext $context): void {
		// need to cheat here since there's no way to register these in IRegistrationContext
		$container = $context->getServerContainer();
		$container->get(IUserManager::class)->registerBackend($container->get(UserBackend::class));
		$container->get(IGroupManager::class)->addBackend($container->get(GroupBackend::class));

		$this->setupGuestManagement($context->getAppContainer(), $context->getServerContainer());
		$this->setupGuestRestrictions($context->getAppContainer(), $context->getServerContainer());
		$this->setupNotifications($context->getAppContainer());
		$context->getAppContainer()->get(RestrictionManager::class)->lateSetupRestrictions();
	}

	private function setupGuestManagement(ContainerInterface $container, ContainerInterface $server): void {
		$hookManager = $container->get(Hooks::class);
		$server->get(IEventDispatcher::class)->addListener(ShareCreatedEvent::class, [$hookManager, 'handlePostShare']);
		$server->get(IEventDispatcher::class)->addListener(UserFirstTimeLoggedInEvent::class, [$hookManager, 'handleFirstLogin']);
	}

	private function setupGuestRestrictions(ContainerInterface $container, ContainerInterface $server): void {
		/** @var IUserSession $userSession */
		$userSession = $server->get(IUserSession::class);
		$user = $userSession->getUser();
		/** @var RestrictionManager $restrictionManager */
		$restrictionManager = $container->get(RestrictionManager::class);

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

	private function setupNotifications(ContainerInterface $container): void {
		$notificationManager = $container->get(INotificationManager::class);
		$notificationManager->registerNotifierService(Notifier::class);
	}
}
