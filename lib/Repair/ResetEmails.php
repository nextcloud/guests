<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Robin Appelman <robin@icewind.nl>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Repair;

use OCA\Guests\AppInfo\Application;
use OCA\Guests\GuestManager;
use OCP\IAppConfig;
use OCP\IConfig;
use OCP\IUserManager;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

class ResetEmails implements IRepairStep {
	public function __construct(
		private readonly GuestManager $guestManager,
		private readonly IUserManager $userManager,
		private readonly IAppConfig $appConfig,
		private readonly IConfig $config,
	) {
	}

	public function getName(): string {
		return 'Reset the email of all guest accounts';
	}

	/**
	 * @return void
	 */
	public function run(IOutput $output) {
		if ($this->appConfig->getValueBool('guests', 'allow_email_change', false, true)) {
			return;
		}

		foreach ($this->guestManager->listGuests() as $guestId) {
			$guest = $this->userManager->get($guestId);
			$expectedEmail = $this->config->getUserValue($guestId, Application::APP_ID, 'email', strtolower($guestId));
			if (strtolower($guest?->getSystemEMailAddress() ?? '') !== $expectedEmail) {
				$this->config->setUserValue($guestId, 'guests', 'old_email', $guest?->getSystemEMailAddress() ?? '');
				$guest->setSystemEMailAddress($expectedEmail);
			}
		}
	}
}
