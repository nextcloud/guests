<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Listener;

use OCA\Guests\UserBackend;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\IUserManager;
use OCP\Share\Events\ShareCreatedEvent;
use OCP\Share\IManager as ShareManager;
use OCP\Share\IShare;
use Psr\Log\LoggerInterface;

/**
 * @template-implements IEventListener<Event>
 */
class ShareAutoAcceptListener implements IEventListener {

	public function __construct(
		private IUserManager $userManager,
		private ShareManager $shareManager,
		private LoggerInterface $logger,
	) {
	}

	public function handle(Event $event): void {
		if (!($event instanceof ShareCreatedEvent)) {
			return;
		}

		$share = $event->getShare();

		// Right now we only handle direct shares to this user
		if ($share->getShareType() !== IShare::TYPE_USER) {
			$this->logger->debug('Not handling share since it is not a user share');
			return;
		}

		$user = $this->userManager->get($share->getSharedWith());
		if ($user === null) {
			$this->logger->debug('User not found');
			return;
		}

		if (!($user->getBackend() instanceof UserBackend)) {
			$this->logger->debug('Not a guest user');
			return;
		}

		$this->logger->debug('Auto accepting direct share ' . $share->getId() . ' to guest user ' . $share->getSharedWith());
		$this->shareManager->acceptShare($share, $share->getSharedWith());
	}
}
