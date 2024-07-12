<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\BackgroundJob;

use OCA\Guests\AppInfo\Application;
use OCA\Guests\Db\Transfer;
use OCA\Guests\Db\TransferMapper;
use OCA\Guests\TransferService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\QueuedJob;
use OCP\IURLGenerator;
use OCP\IUser;
use OCP\IUserManager;
use OCP\Notification\IManager as NotificationManager;
use OCP\Security\ISecureRandom;
use Psr\Log\LoggerInterface;

class TransferJob extends QueuedJob {
	public function __construct(
		ITimeFactory $time,
		private IUserManager $userManager,
		private ISecureRandom $secureRandom,
		private NotificationManager $notificationManager,
		private IURLGenerator $urlGenerator,
		private TransferService $transferService,
		private TransferMapper $transferMapper,
		private LoggerInterface $logger,
	) {
		parent::__construct($time);
	}

	private function notifyFailure(Transfer $transfer): void {
		$notification = $this->notificationManager->createNotification();
		$notification
			->setApp(Application::APP_ID)
			->setIcon($this->urlGenerator->getAbsoluteURL($this->urlGenerator->imagePath(Application::APP_ID, 'account-arrow-right.svg')))
			->setUser($transfer->getAuthor())
			->setDateTime($this->time->getDateTime())
			->setObject('guest-transfer', (string)$transfer->getId())
			->setSubject('guest-transfer-fail', [
				'source' => $transfer->getSource(),
				'target' => $transfer->getTarget(),
			]);
		$this->notificationManager->notify($notification);
	}

	private function notifySuccess(Transfer $transfer): void {
		$notification = $this->notificationManager->createNotification();
		$notification
			->setApp(Application::APP_ID)
			->setIcon($this->urlGenerator->getAbsoluteURL($this->urlGenerator->imagePath(Application::APP_ID, 'account-arrow-right.svg')))
			->setUser($transfer->getAuthor())
			->setDateTime($this->time->getDateTime())
			->setObject('guest-transfer', (string)$transfer->getId())
			->setSubject('guest-transfer-done', [
				'source' => $transfer->getSource(),
				'target' => $transfer->getTarget(),
			]);
		$this->notificationManager->notify($notification);
	}

	private function fail(Transfer $transfer, ?IUser $targetUser = null): void {
		$this->notifyFailure($transfer);
		$this->transferMapper->delete($transfer);
		if (!($targetUser instanceof IUser)) {
			return;
		}
		$result = $targetUser->delete(); // Rollback created user
		if (!$result) {
			$this->logger->error('Failed to delete target user', ['user' => $targetUser->getUID()]);
		}
	}

	public function run($argument): void {
		/** @var int $id */
		$id = $argument['id'];

		$transfer = $this->transferMapper->getById($id);
		$transfer->setStatus(Transfer::STATUS_STARTED);
		$this->transferMapper->update($transfer);

		$source = $transfer->getSource();
		$target = $transfer->getTarget();

		$sourceUser = $this->userManager->get($source);
		if (!($sourceUser instanceof IUser)) {
			$this->logger->error('Failed to transfer missing guest user: ' . $source);
			$this->fail($transfer);
			return;
		}

		if ($this->userManager->userExists($target)) {
			$this->logger->error("Cannot transfer guest user \"$source\", target user \"$target\" already exists");
			$this->fail($transfer);
			return;
		}

		$targetUser = $this->userManager->createUser(
			$target,
			$this->secureRandom->generate(20), // Password hash will be copied to target user from source user
		);

		if (!($targetUser instanceof IUser)) {
			$this->logger->error('Failed to create new user: ' . $target);
			$this->fail($transfer);
			return;
		}

		$targetUser->setSystemEMailAddress($sourceUser->getUID()); // Guest user id is an email

		try {
			$this->transferService->transfer($sourceUser, $targetUser);
		} catch (\Throwable $th) {
			$this->logger->error($th->getMessage(), ['exception' => $th]);
			$this->fail($transfer, $targetUser);
			return;
		}

		$passwordHash = $sourceUser->getPasswordHash();
		if (empty($passwordHash)) {
			$this->logger->error('Invalid guest password hash', ['guest' => $sourceUser->getUID(), 'passwordHash' => $passwordHash]);
			$this->fail($transfer, $targetUser);
			return;
		}

		$setPasswordHashResult = $targetUser->setPasswordHash($passwordHash); // Copy password hash after transfer to prevent login before completion
		if (!$setPasswordHashResult) {
			$this->logger->error('Failed to set password hash on target user', ['user' => $targetUser->getUID()]);
			$this->fail($transfer, $targetUser);
			return;
		}

		$result = $sourceUser->delete();
		if (!$result) {
			$this->logger->error('Failed to delete guest user', ['user' => $sourceUser->getUID()]);
		}
		$this->notifySuccess($transfer);
		$this->transferMapper->delete($transfer);
	}
}
