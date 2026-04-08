<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2017 ownCloud GmbH
 * SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
 */

namespace OCA\Guests\Listener;

use OCA\Guests\AppInfo\Application;
use OCA\Guests\GuestManager;
use OCA\Guests\Service\InviteService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Share\Events\ShareCreatedEvent;
use OCP\Share\IShare;
use Psr\Log\LoggerInterface;

/**
 * @template-implements IEventListener<ShareCreatedEvent>
 */
class ShareCreatedListener implements IEventListener {
	public function __construct(
		private readonly LoggerInterface $logger,
		private readonly IUserSession $userSession,
		private readonly IUserManager $userManager,
		private readonly GuestManager $guestManager,
		private readonly InviteService $inviteService,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof ShareCreatedEvent) {
			return;
		}

		$share = $event->getShare();

		// Only process shares targeting a specific user or email (guest invite logic).
		// Link shares, remote shares, etc. have no shareWith recipient and must be skipped.
		$allowedShareTypes = [
			IShare::TYPE_USER,
			IShare::TYPE_EMAIL
		];

		if (!in_array($share->getShareType(), $allowedShareTypes, true)) {
			return;
		}

		$shareWith = $share->getSharedWith();

		$isGuest = $this->guestManager->isGuest($shareWith);
		if (!$isGuest) {
			$this->logger->debug(
				"ignoring user '" . $shareWith . "', not a guest",
				['app' => Application::APP_ID]
			);
			return;
		}

		if ($share->getNodeType() !== 'folder' && $share->getNodeType() !== 'file') {
			$this->logger->debug(
				'ignoring share for itemType ' . $share->getNodeType(),
				['app' => Application::APP_ID]
			);
			return;
		}

		$user = $this->userSession->getUser();
		$this->userManager->get($shareWith);

		if (!$user) {
			throw new \Exception(
				'post_share hook triggered without user in session'
			);
		}

		$this->logger->debug("checking if '" . $shareWith . "' has a password",
			['app' => Application::APP_ID]);

		$uid = $user->getUID();

		$this->inviteService->sendInvite($uid, $shareWith, $share);
	}
}
