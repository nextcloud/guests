<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Robin Appelman <robin@icewind.nl>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Listener;

use OCA\Guests\GuestManager;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\IAppConfig;
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
		if ($this->userSession->getUser() !== $user) {
			return;
		}
		if (!$this->guestManager->isGuest($user)) {
			return;
		}
		if (strtolower($event->getValue()) === strtolower($user->getUID())) {
			return;
		}
		if ($this->appConfig->getValueBool('guests', 'allow_email_change', false, true)) {
			return;
		}

		$user->setSystemEMailAddress(strtolower($user->getUID()));
		$event->stopPropagation();
	}
}
