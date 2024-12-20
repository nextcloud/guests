<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Notifications;

use OCA\Guests\AppInfo\Application;
use OCP\IURLGenerator;
use OCP\IUserManager;
use OCP\L10N\IFactory;
use OCP\Notification\INotification;
use OCP\Notification\INotifier;
use OCP\Notification\UnknownNotificationException;

class Notifier implements INotifier {
	public function __construct(
		private IFactory $factory,
		private IURLGenerator $url,
		private IUserManager $userManager,
	) {
	}

	public function getID(): string {
		return Application::APP_ID;
	}

	public function getName(): string {
		return $this->factory->get(Application::APP_ID)->t('Guests');
	}

	private function getRichMessageParams(string $source, string $target): array {
		$sourceUser = $this->userManager->get($source);
		$targetUser = $this->userManager->get($target);
		return [
			'guest' => [
				'type' => $sourceUser ? 'guest' : 'highlight',
				'id' => $sourceUser?->getUID() ?? $source,
				'name' => $sourceUser?->getDisplayName() ?? $source,
			],
			'user' => [
				'type' => $targetUser ? 'user' : 'highlight',
				'id' => $targetUser?->getUID() ?? $source,
				'name' => $targetUser?->getDisplayName() ?? $target,
			],
		];
	}

	/**
	 * @throws UnknownNotificationException
	 */
	public function prepare(INotification $notification, string $languageCode): INotification {
		if ($notification->getApp() !== Application::APP_ID) {
			// Not my app => throw
			throw new UnknownNotificationException();
		}

		// Read the language from the notification
		$l = $this->factory->get(Application::APP_ID, $languageCode);
		switch ($notification->getSubject()) {
			case 'data_migrated_to_system_user':
				$notification->setParsedSubject(
					$l->t('Data imported')
				)->setParsedMessage(
					$l->t('Data from your previous guest account was successfully imported into your new account.')
				);

				$notification->setIcon($this->url->getAbsoluteURL($this->url->imagePath('core', 'actions/info.svg')));

				return $notification;

			case 'guest-transfer-fail':
				$params = $notification->getSubjectParameters();
				$notification
					->setRichSubject($l->t('Guest conversion failed'))
					->setRichMessage(
						$l->t('Failed to convert guest {guest} account to {user} account'),
						$this->getRichMessageParams($params['source'], $params['target']),
					);
				return $notification;

			case 'guest-transfer-done':
				$params = $notification->getSubjectParameters();
				$notification
					->setRichSubject($l->t('Guest conversion done'))
					->setRichMessage(
						$l->t('Conversion of guest {guest} to {user} completed'),
						$this->getRichMessageParams($params['source'], $params['target']),
					);
				return $notification;

			default:
				// Unknown subject => Unknown notification => throw
				throw new UnknownNotificationException();
		}
	}
}
