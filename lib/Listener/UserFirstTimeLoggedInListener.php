<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2017 ownCloud GmbH
 * SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
 */

namespace OCA\Guests\Listener;

use OCA\Guests\TransferService;
use OCA\Guests\UserBackend;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\IConfig;
use OCP\IUserManager;
use OCP\User\Events\UserFirstTimeLoggedInEvent;
use Psr\Log\LoggerInterface;

/**
 * @template-implements IEventListener<UserFirstTimeLoggedInEvent>
 */
class UserFirstTimeLoggedInListener implements IEventListener {
	public function __construct(
		private readonly LoggerInterface $logger,
		private readonly IUserManager $userManager,
		private readonly IConfig $config,
		private readonly UserBackend $userBackend,
		private readonly TransferService $transferService,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof UserFirstTimeLoggedInEvent) {
			return;
		}

		if (!$this->config->getSystemValueBool('migrate_guest_user_data')) {
			return;
		}

		$user = $event->getUser();
		$this->logger->debug('User ' . $user->getUID() . ' logged in for the very first time. Checking guests data import.');

		$email = $user->getEMailAddress();
		if ($email === null) {
			$this->logger->info('User ' . $user->getUID() . ' does not have an email address set. Skipping guests data import.');
			return;
		}

		if (!$this->userBackend->userExists($email)) {
			$this->logger->info('No guest user for ' . $email . ' found. Skipping guests data import.');
			return;
		}

		if (strtolower($email) === strtolower($user->getUID())) {
			// This is the guest user, logging in for the very first time
			return;
		}

		$guestUser = $this->userManager->get($email);
		if ($guestUser === null) {
			$this->logger->warning('Guest user ' . $email . ' does not exist (anymore)');
			return;
		}

		$this->transferService->transfer($guestUser, $user);

		if (!$this->config->getSystemValueBool('remove_guest_account_on_conversion', false)) {
			// Disable previous account
			$guestUser->setEnabled(false);
		} else {
			// Remove previous account
			$guestUser->delete();
		}
	}
}
