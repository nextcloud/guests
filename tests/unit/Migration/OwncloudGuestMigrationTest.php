<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

namespace OCA\Guests\Tests\Migration;

use OC\Migration\ConsoleOutput;
use OCA\Guests\GuestManager;
use OCA\Guests\Migration\OwncloudGuestsMigration;
use OCA\Guests\UserBackend;
use OCP\IConfig;
use OCP\IUserManager;
use OCP\Server;
use Symfony\Component\Console\Output\BufferedOutput;
use Test\TestCase;
use Test\Util\User\Dummy;

/**
 * @group DB
 */
class OwncloudGuestMigrationTest extends TestCase {
	private IConfig $config;
	private IUserManager $userManager;
	private BufferedOutput $consoleOutput;
	private ConsoleOutput $migrationOutput;
	private GuestManager $guestManager;

	protected function setUp():void {
		$this->config = Server::get(IConfig::class);
		$this->userManager = Server::get(IUserManager::class);
		$this->consoleOutput = new BufferedOutput();
		$this->migrationOutput = new ConsoleOutput($this->consoleOutput);
		$this->guestManager = Server::get(GuestManager::class);

		parent::setUp();
	}

	private function createOcGuest(string $userId): void {
		$this->userManager->createUser($userId, $userId . '_password');
		$this->config->setUserValue($userId, 'owncloud', 'isGuest', '1');
	}

	public function testMigrateNoGuests(): void {
		$migration = Server::get(OwncloudGuestsMigration::class);

		$migration->run($this->migrationOutput);
		$this->assertEmpty($this->consoleOutput->fetch());

		$this->assertEmpty($this->guestManager->listGuests());
	}

	public function testMigrateSingleGuest(): void {
		$this->createOcGuest('test@example.com');
		$this->assertEmpty($this->guestManager->listGuests());

		$migration = Server::get(OwncloudGuestsMigration::class);

		$migration->run($this->migrationOutput);
		$this->assertNotEmpty($this->consoleOutput->fetch());

		// clear the backend-cache
		$this->userManager->removeBackend(new Dummy());

		/** @var $guests */
		$guests = $this->guestManager->listGuests();
		$this->assertCount(1, $guests);
		$this->assertEquals('test@example.com', $guests[0]);

		$user = $this->userManager->get('test@example.com');
		$this->assertInstanceOf(UserBackend::class, $user->getBackend());
		$this->userManager->checkPassword('test@example.com', 'test@example.com_password');

		// no guests migration when running again
		$this->consoleOutput = new BufferedOutput();
		$this->migrationOutput = new ConsoleOutput($this->consoleOutput);

		$migration->run($this->migrationOutput);
		$this->assertEmpty($this->consoleOutput->fetch());
	}
}
