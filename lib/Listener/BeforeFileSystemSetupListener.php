<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2017 ownCloud GmbH
 * SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
 */

namespace OCA\Guests\Listener;

use OC\Files\Filesystem;
use OCA\Guests\GuestManager;
use OCA\Guests\Storage\ReadOnlyJail;
use OCP\Constants;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Events\BeforeFileSystemSetupEvent;
use OCP\Files\Storage\IStorage;

/**
 * @template-implements IEventListener<BeforeFileSystemSetupEvent>
 */
class BeforeFileSystemSetupListener implements IEventListener {
	public function __construct(
		private readonly GuestManager $guestManager,
	) {
	}

	#[\Override]
	public function handle(Event $event): void {
		if ($event instanceof BeforeFileSystemSetupEvent) {
			$this->setupReadonlyFilesystem($event);
		}
	}

	public function setupReadonlyFilesystem(BeforeFileSystemSetupEvent $event): void {
		$user = $event->getUser();

		if ($this->guestManager->isGuest($user)) {
			Filesystem::addStorageWrapper('guests.readonly', function ($mountPoint, IStorage $storage) use ($user): ReadOnlyJail|IStorage {
				if ($mountPoint === sprintf('/%s/', $user->getUID())) {
					return new ReadOnlyJail([
						'storage' => $storage,
						'mask' => Constants::PERMISSION_READ,
						'path' => 'files'
					]);
				}

				return $storage;
			});
		}
	}
}
