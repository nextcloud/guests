<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Events;

use OCP\EventDispatcher\Event;

class GuestCreatedEvent extends Event {
	public function __construct(
		private string $userId,
		private bool $sendInviteEmail,
	) {
		parent::__construct();
	}

	public function getUserId(): string {
		return $this->userId;
	}

	public function shouldSendInviteEmail(): bool {
		return $this->sendInviteEmail;
	}
}
