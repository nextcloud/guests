<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Guests\AppInfo;

use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCA\Guests\Capabilities;
use OCA\Guests\GroupBackend;
use OCA\Guests\Listener\BeforeFileSystemSetupListener;
use OCA\Guests\Listener\BeforeTemplateRenderedListener;
use OCA\Guests\Listener\BeforeUserManagementRenderedListener;
use OCA\Guests\Listener\LoadAdditionalScriptsListener;
use OCA\Guests\Listener\ShareAutoAcceptListener;
use OCA\Guests\Listener\ShareCreatedListener;
use OCA\Guests\Listener\UserChangedListener;
use OCA\Guests\Listener\UserLoggedInListener;
use OCA\Guests\Notifications\Notifier;
use OCA\Guests\RestrictionManager;
use OCA\Guests\UserBackend;
use OCA\Settings\Events\BeforeTemplateRenderedEvent as BeforeUserManagementRenderedEvent;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Http\Events\BeforeTemplateRenderedEvent;
use OCP\IGroupManager;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Share\Events\ShareCreatedEvent;
use OCP\User\Events\UserChangedEvent;
use OCP\User\Events\UserFirstTimeLoggedInEvent;
use OCP\User\Events\UserLoggedInEvent;

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
		$context->registerEventListener(UserLoggedInEvent::class, UserLoggedInListener::class);
		$context->registerEventListener(ShareCreatedEvent::class, ShareCreatedListener::class);
		$context->registerEventListener(UserFirstTimeLoggedInEvent::class, BeforeFileSystemSetupListener::class);

		$context->registerNotifierService(Notifier::class);
	}

	public function boot(IBootContext $context): void {
		// need to cheat here since there's no way to register these in IRegistrationContext
		$container = $context->getServerContainer();
		$container->get(IUserManager::class)->registerBackend($container->get(UserBackend::class));
		$container->get(IGroupManager::class)->addBackend($container->get(GroupBackend::class));

		// Setup guest restrictions
		$context->injectFn(function (IUserSession $userSession, RestrictionManager $restrictionManager): void {
			$user = $userSession->getUser();

			if ($user) {
				$restrictionManager->verifyAccess();
				$restrictionManager->setupRestrictions();
			}

			$restrictionManager->lateSetupRestrictions();
		});
	}
}
