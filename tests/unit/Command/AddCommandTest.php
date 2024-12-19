<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Command\Unit;

use OCA\Guests\Command\AddCommand;
use OCA\Guests\GuestManager;
use OCP\IUser;
use OCP\IUserManager;
use OCP\Mail\IMailer;
use PHPUnit\Framework\MockObject\MockObject;
use Symfony\Component\Console\Application;
use Symfony\Component\Console\Tester\CommandTester;
use Test\TestCase;

class AddCommandTest extends TestCase {
	/** @var IUserManager|MockObject */
	private $userManager;
	/** @var GuestManager|MockObject */
	private $guestManager;
	/** @var IMailer|MockObject */
	private $mailer;
	/** @var AddCommand */
	private $command;
	/** @var CommandTester */
	private $commandTester;

	protected function setUp(): void {
		parent::setUp();

		$this->userManager = $this->createMock(IUserManager::class);
		$this->guestManager = $this->createMock(GuestManager::class);
		$this->mailer = $this->createMock(IMailer::class);

		$this->command = new AddCommand(
			$this->userManager,
			$this->mailer,
			$this->guestManager
		);
		$this->command->setApplication(new Application());
		$this->commandTester = new CommandTester($this->command);
	}

	public function createGuestDataProvider() {
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
	public function testCreateGuest($commandArgs) {
		$createdByUser = $this->createMock(IUser::class);

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
				isset($commandArgs['--display-name']) ? $commandArgs['--display-name'] : '',
				isset($commandArgs['--language']) ? $commandArgs['--language'] : '',
				$password
			)
			->willReturn($guestUser);

		$this->commandTester->setInputs(['guest-password', 'guest-password']);
		$this->commandTester->execute($commandArgs);
		$output = $this->commandTester->getDisplay();
		$this->assertStringContainsString('The guest account user "guestid" was created successfully', $output);
	}

	public function testCreateGuestCreatorNotFound() {
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

	public function testCreateGuestAlreadyExists() {
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

	public function testCreateGuestInvalidEmail() {
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
