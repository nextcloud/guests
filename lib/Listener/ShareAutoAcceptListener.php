<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2020, Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @author Roeland Jago Douma <roeland@famdouma.nl>
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

namespace OCA\Guests\Listener;

use OCA\Guests\UserBackend;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\ILogger;
use OCP\IUserManager;
use OCP\Share\Events\ShareCreatedEvent;
use OCP\Share\IManager as ShareManager;
use OCP\Share\IShare;

class ShareAutoAcceptListener implements IEventListener {

	/** @var IUserManager */
	private $userManager;

	/** @var ShareManager */
	private $shareManager;

	/** @var ILogger */
	private $logger;

	public function __construct(IUserManager $userManager,
								ShareManager $shareManager,
								ILogger $logger) {
		$this->userManager = $userManager;
		$this->shareManager = $shareManager;
		$this->logger = $logger;
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
