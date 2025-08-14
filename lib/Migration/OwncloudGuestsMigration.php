<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

namespace OCA\Guests\Migration;

use OCA\Guests\UserBackend;
use OCP\IConfig;
use OCP\IUserManager;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;
use Psr\Log\LoggerInterface;

class OwncloudGuestsMigration implements IRepairStep {

	protected $cachedUserIDs = [];

	public function __construct(
		protected LoggerInterface $logger,
		protected IConfig $config,
		protected IUserManager $userManager,
		protected UserBackend $guestUserBackend,
	) {
	}

	public function getName(): string {
		return 'Converts owncloud guests to nextcloud guests';
	}

	public function run(IOutput $output): void {
		if (!$this->shouldRun()) {
			$this->logger->info('Skipping owncloud guests migration, no owncloud guests found');
			return;
		} else {
			$this->runStep($output);
		}
	}

	protected function shouldRun(): bool {
		$this->cachedUserIDs = $this->config->getUsersForUserValue('owncloud', 'isGuest', '1');
		$count = count($this->cachedUserIDs);
		if ($count === 0) {
			return false;
		}

		$this->logger->info("Found $count owncloud guests to migrate");

		return true;
	}

	/**
	 * For each old guest user, we do the following:
	 * 1. Create a new guest with the same username and password
	 * 2. register a new transfer
	 * 3. Delete the old user
	 * 4. Delete the old 'isGuest' preference row
	 * 5. Set the quota to '0 B'
	 */
	protected function runStep(IOutput $output): void {
		$output->startProgress(count($this->cachedUserIDs));
		foreach ($this->cachedUserIDs as $userID) {
			if ($ocGuest = $this->userManager->get($userID)) {
				$hashedPassword = $ocGuest->getPasswordHash();
				if ($hashedPassword) {
					$this->guestUserBackend->createUser($ocGuest->getUID(), '');
					$this->guestUserBackend->setPasswordHash($ocGuest->getUID(), $hashedPassword);

					$oldBackend = $ocGuest->getBackend();
					$oldBackend->deleteUser($ocGuest->getUID());

					$this->config->deleteUserValue($userID, 'owncloud', 'isGuest');

					$guestUser = $this->userManager->get($userID);
					if ($guestUser) {
						$guestUser->setQuota('0 B');
					} else {
						$output->warning("Could not set quota for guest $userID");
					}
				} else {
					$output->warning("Could not get hashed password for guest $userID, skipping");
				}
			} else {
				$output->warning("Failed to get user data for guest $userID, skipping");
			}
			$output->advance();
		}
	}
}
