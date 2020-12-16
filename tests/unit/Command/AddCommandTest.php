<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2019 Robin Appelman <robin@icewind.nl>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Guests\Test\Unit;

use OCA\Guests\GuestManager;
use OCA\Guests\Command\AddCommand;
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
					'uid' => 'guestid',
					'email' => 'guestid@example.com',
					'--display-name' => 'guest-displayname',
					'--language' => 'de_DE',
				],
			],
			[
				[
					'created-by' => 'creator',
					'uid' => 'guestid',
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
			->with('guestid')
			->willReturn(false);

		$this->mailer->expects($this->once())
			->method('validateMailAddress')
			->with('guestid@example.com')
			->willReturn(true);

		$this->guestManager->expects($this->once())
			 ->method('createGuest')
			 ->with(
				 $createdByUser,
				 'guestid',
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
			'uid' => 'guestid',
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
			->with('guestid')
			->willReturn(true);

		$this->commandTester->execute([
			'created-by' => 'creator',
			'uid' => 'guestid',
			'email' => 'guestid@example.com',
		]);

		$output = $this->commandTester->getDisplay();
		$this->assertStringContainsString('The user "guestid" already exists.', $output);
		$this->assertEquals(1, $this->commandTester->getStatusCode());
	}

	public function testCreateGuestInvalidEmail() {
		$this->userManager->expects($this->once())
			->method('get')
			->with('creator')
			->willReturn($this->createMock(IUser::class));

		$this->userManager->expects($this->once())
			->method('userExists')
			->with('guestid')
			->willReturn(false);

		$this->mailer->expects($this->once())
			->method('validateMailAddress')
			->with('guestid@@@')
			->willReturn(false);

		$this->commandTester->execute([
			'created-by' => 'creator',
			'uid' => 'guestid',
			'email' => 'guestid@@@',
		]);

		$output = $this->commandTester->getDisplay();
		$this->assertStringContainsString('Invalid email address "guestid@@@".', $output);
		$this->assertEquals(1, $this->commandTester->getStatusCode());
	}
}
