<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Robin Appelman <robin@icewind.nl>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Repair;

use OCA\Guests\GuestManager;
use OCP\IConfig;
use OCP\IUserManager;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

class ResetEmails implements IRepairStep {
	public function __construct(
		private readonly GuestManager $guestManager,
		private readonly IUserManager $userManager,
		private readonly IConfig $config,
	) {
	}

	public function getName(): string {
		return 'Reset the email of all guest accounts';
	}

	public function run(IOutput $output) {
		foreach ($this->guestManager->listGuests() as $guestId) {
			$guest = $this->userManager->get($guestId);
			if (strtolower($guest->getSystemEMailAddress() ?? '') !== strtolower($guestId)) {
				$this->config->setUserValue($guestId, 'guests', 'old_email', $guest->getSystemEMailAddress());
				$guest->setSystemEMailAddress(strtolower($guestId));
			}
		}
	}
}
