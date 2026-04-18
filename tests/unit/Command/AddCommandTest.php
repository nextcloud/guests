<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Command\Unit;

use OCA\Guests\Command\AddCommand;
use OCA\Guests\Config;
use OCA\Guests\GuestManager;
use OCP\IUser;
use OCP\IUserManager;
use OCP\Mail\IMailer;
use PHPUnit\Framework\MockObject\MockObject;
use Symfony\Component\Console\Application;
use Symfony\Component\Console\Helper\QuestionHelper;
use Symfony\Component\Console\Tester\CommandTester;
use Test\TestCase;

class AddCommandTest extends TestCase {
	private IUserManager&MockObject $userManager;
	private GuestManager&MockObject $guestManager;
	private IMailer&MockObject $mailer;
	private Config&MockObject $config;

	private ?AddCommand $command = null;

	private ?CommandTester $commandTester = null;

	protected function setUp(): void {
		parent::setUp();

		// Prevent hidden Question prompts from invoking stty on the real terminal,
		// which leaves the shell in an unusable state after the test run.
		QuestionHelper::disableStty();

		$this->userManager = $this->createMock(IUserManager::class);
		$this->guestManager = $this->createMock(GuestManager::class);
		$this->mailer = $this->createMock(IMailer::class);
		$this->config = $this->createMock(Config::class);

		$this->command = new AddCommand(
			$this->userManager,
			$this->mailer,
			$this->guestManager,
			$this->config,
		);
		$this->command->setApplication(new Application());

		$this->commandTester = new CommandTester($this->command);
	}

	/**
	 * @return array<int, array<int, array<string, string>>|array<int, array<string, bool|string>>>
	 */
	public static function createGuestDataProvider(): array {
		return [
			[
				[
					'created-by' => 'creator',
					'email' => 'guestid@example.com',
					'--display-name' => 'guest-displayname',
					'--language' => 'de_DE',
				],
			],
			[
				[
					'created-by' => 'creator',
					'email' => 'guestid@example.com',
					'--generate-password' => true,
				],
			],
		];
	}

	/**
	 * @dataProvider createGuestDataProvider
	 */
	public function testCreateGuest($commandArgs): void {
		$createdByUser = $this->createStub(IUser::class);

		$password = 'guest-password';
		if (isset($commandArgs['--generate-password'])) {
			$password = null;
		}

		$guestUser = $this->createMock(IUser::class);
		$guestUser->method('getUID')->willReturn('guestid');

		$this->userManager->expects($this->once())
			->method('get')
			->with('creator')
			->willReturn($createdByUser);

		$this->userManager->expects($this->once())
			->method('userExists')
			->with('guestid@example.com')
			->willReturn(false);

		$this->mailer->expects($this->once())
			->method('validateMailAddress')
			->with('guestid@example.com')
			->willReturn(true);

		$this->guestManager->expects($this->once())
			->method('createGuest')
			->with(
				$createdByUser,
				'guestid@example.com',
				'guestid@example.com',
				$commandArgs['--display-name'] ?? '',
				$commandArgs['--language'] ?? '',
				$password
			)
			->willReturn($guestUser);

		$this->commandTester->setInputs(['guest-password', 'guest-password']);
		$this->commandTester->execute($commandArgs);

		$output = $this->commandTester->getDisplay();
		$this->assertStringContainsString('The guest account user "guestid" was created successfully', $output);
	}

	public function testCreateGuestCreatorNotFound(): void {
		$this->userManager->expects($this->once())
			->method('get')
			->with('creator')
			->willReturn(null);

		$this->commandTester->execute([
			'created-by' => 'creator',
			'email' => 'guestid@example.com',
		]);

		$output = $this->commandTester->getDisplay();
		$this->assertStringContainsString('The user "creator" does not exist.', $output);
		$this->assertEquals(1, $this->commandTester->getStatusCode());
	}

	public function testCreateGuestAlreadyExists(): void {
		$this->userManager->expects($this->once())
			->method('get')
			->with('creator')
			->willReturn($this->createMock(IUser::class));

		$this->userManager->expects($this->once())
			->method('userExists')
			->with('guestid@example.com')
			->willReturn(true);

		$this->commandTester->execute([
			'created-by' => 'creator',
			'email' => 'guestid@example.com',
		]);

		$output = $this->commandTester->getDisplay();
		$this->assertStringContainsString('The user "guestid@example.com" already exists.', $output);
		$this->assertEquals(1, $this->commandTester->getStatusCode());
	}

	public function testCreateGuestInvalidEmail(): void {
		$this->userManager->expects($this->once())
			->method('get')
			->with('creator')
			->willReturn($this->createMock(IUser::class));

		$this->userManager->expects($this->once())
			->method('userExists')
			->with('guestid@@@')
			->willReturn(false);

		$this->mailer->expects($this->once())
			->method('validateMailAddress')
			->with('guestid@@@')
			->willReturn(false);

		$this->commandTester->execute([
			'created-by' => 'creator',
			'email' => 'guestid@@@',
		]);

		$output = $this->commandTester->getDisplay();
		$this->assertStringContainsString('Invalid email address "guestid@@@".', $output);
		$this->assertEquals(1, $this->commandTester->getStatusCode());
	}
}
