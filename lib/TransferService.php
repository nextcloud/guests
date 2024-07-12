<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use OCA\Files\Exception\TransferOwnershipException;
use OCA\Files\Service\OwnershipTransferService;
use OCA\Guests\AppInfo\Application;
use OCA\Guests\BackgroundJob\TransferJob;
use OCA\Guests\Db\Transfer;
use OCA\Guests\Db\TransferMapper;
use OCP\AppFramework\QueryException;
use OCP\BackgroundJob\IJobList;
use OCP\IUser;
use OCP\Notification\IManager as INotificationManager;
use OCP\Share\IManager as IShareManager;
use OCP\Share\IShare;
use Psr\Container\ContainerInterface;
use Psr\Log\LoggerInterface;

class TransferService {
	public function __construct(
		private ContainerInterface $container,
		private IShareManager $shareManager,
		private INotificationManager $notificationManager,
		private IJobList $jobList,
		private TransferMapper $transferMapper,
		private LoggerInterface $logger,
	) {
	}

	public function transfer(IUser $guestUser, IUser $user): void {
		try {
			/** @var OwnershipTransferService $ownershipTransferService */
			$ownershipTransferService = $this->container->get(OwnershipTransferService::class);
		} catch (QueryException $e) {
			$this->logger->error('Could not resolve ownership transfer service to import guest user data', [
				'exception' => $e,
			]);
			throw $e;
		}

		try {
			$ownershipTransferService->transfer(
				$guestUser,
				$user,
				'/',
				null,
				true,
				true
			);
		} catch (TransferOwnershipException $e) {
			$this->logger->error('Could not import guest user data', [
				'exception' => $e,
			]);
			throw $e;
		}

		// Update incomming shares
		$shares = $this->shareManager->getSharedWith($guestUser->getUID(), IShare::TYPE_USER);
		foreach ($shares as $share) {
			$share->setSharedWith($user->getUID());
			$this->shareManager->updateShare($share);
		}

		$notification = $this->notificationManager->createNotification();
		$notification
			->setApp(Application::APP_ID)
			->setSubject('data_migrated_to_system_user')
			->setObject('user', $user->getEMailAddress())
			->setDateTime(new \DateTime())
			->setUser($user->getUID());
		$this->notificationManager->notify($notification);
	}

	/**
	 * @param string $target Target user id
	 */
	public function addTransferJob(IUser $author, IUser $source, string $target): void {
		$transfer = new Transfer();
		$transfer->setAuthor($author->getUID());
		$transfer->setSource($source->getUID());
		$transfer->setTarget($target);
		$transfer->setStatus(Transfer::STATUS_WAITING);
		/** @var Transfer $transfer */
		$transfer = $this->transferMapper->insert($transfer);

		$this->jobList->add(TransferJob::class, [
			'id' => $transfer->getId(),
		]);
	}
}
