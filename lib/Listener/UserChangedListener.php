<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Robin Appelman <robin@icewind.nl>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Listener;

use OCA\Guests\AppInfo\Application;
use OCA\Guests\GuestManager;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\IAppConfig;
use OCP\IConfig;
use OCP\IUserSession;
use OCP\User\Events\UserChangedEvent;

/**
 * Block guests from changing their email address
 *
 * @template-implements IEventListener<UserChangedEvent>
 */
class UserChangedListener implements IEventListener {
	public function __construct(
		private readonly IUserSession $userSession,
		private readonly GuestManager $guestManager,
		private readonly IAppConfig $appConfig,
		private readonly IConfig $config,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof UserChangedEvent) {
			return;
		}
		if ($event->getFeature() !== 'eMailAddress') {
			return;
		}
		$user = $event->getUser();
		if (!$this->guestManager->isGuest($user)) {
			return;
		}

		$guestEmail = $this->config->getUserValue($user->getUID(), Application::APP_ID, 'email', strtolower($user->getUID()));
		if ($event->getValue() === $guestEmail) {
			return;
		}

		$allowChange = false;
		if (strtolower($event->getValue()) === strtolower($user->getUID())) {
			$allowChange = true;
		} elseif ($this->userSession->getUser() !== $user) {
			$allowChange = true;
		} elseif ($this->appConfig->getValueBool(Application::APP_ID, 'allow_email_change', false, true) && $event->getValue() !== '') {
			$allowChange = true;
		}

		if ($allowChange) {
			$this->config->setUserValue($user->getUID(), Application::APP_ID, 'email', $event->getValue());
		} else {
			$user->setSystemEMailAddress($guestEmail);
			$event->stopPropagation();
		}
	}
}
