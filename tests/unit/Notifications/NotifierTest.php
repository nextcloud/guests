<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Unit\Notifications;

use OCA\Guests\Notifications\Notifier;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\IUserManager;
use OCP\L10N\IFactory;
use OCP\Notification\INotification;
use Test\TestCase;

class NotifierTest extends TestCase {
	private ?Notifier $notifier = null;

	protected function setUp(): void {
		parent::setUp();

		$l10n = $this->createMock(IL10N::class);
		$l10n->method('t')
			->willReturnArgument(0);
		$l10nFactory = $this->createMock(IFactory::class);
		$l10nFactory->method('get')
			->willReturn($l10n);

		// Both accounts are gone by the time the notification is rendered.
		$userManager = $this->createMock(IUserManager::class);
		$userManager->method('get')
			->willReturn(null);

		$this->notifier = new Notifier(
			$l10nFactory,
			$this->createMock(IURLGenerator::class),
			$userManager
		);
	}

	public function testTransferDoneFallsBackToTheNotifiedIds(): void {
		$parameters = $this->prepareTransferNotification('guest-transfer-done');

		$this->assertSame('guest@example.tld', $parameters['guest']['id']);
		$this->assertSame('new_account', $parameters['user']['id']);
	}

	public function testTransferFailFallsBackToTheNotifiedIds(): void {
		$parameters = $this->prepareTransferNotification('guest-transfer-fail');

		$this->assertSame('guest@example.tld', $parameters['guest']['id']);
		$this->assertSame('new_account', $parameters['user']['id']);
	}

	/**
	 * @return array<string, array<string, mixed>>
	 */
	private function prepareTransferNotification(string $subject): array {
		$notification = $this->createMock(INotification::class);
		$notification->method('getApp')
			->willReturn('guests');
		$notification->method('getSubject')
			->willReturn($subject);
		$notification->method('getSubjectParameters')
			->willReturn([
				'source' => 'guest@example.tld',
				'target' => 'new_account',
			]);
		$notification->method('setRichSubject')
			->willReturnSelf();

		$parameters = [];
		$notification->expects($this->once())
			->method('setRichMessage')
			->willReturnCallback(function (string $message, array $messageParameters) use (&$parameters, $notification): INotification {
				$parameters = $messageParameters;
				return $notification;
			});

		$this->notifier->prepare($notification, 'en');

		return $parameters;
	}
}
