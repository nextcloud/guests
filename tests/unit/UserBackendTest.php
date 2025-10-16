<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Unit;

use OCA\Guests\Config;
use OCA\Guests\UserBackend;
use OCP\EventDispatcher\IEventDispatcher;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

/**
 * @group DB
 */
class UserBackendTest extends TestCase {
	/** @var Config|MockObject */
	private $config;

	/** @var UserBackend */
	private $backend;

	private function clearGuests() {
		$query = \OC::$server->getDatabaseConnection()->getQueryBuilder();

		$query->delete('guests_users')->executeStatement();
	}

	protected function setUp(): void {
		parent::setUp();

		$this->clearGuests();

		$this->config = $this->createMock(Config::class);

		$this->backend = new UserBackend(
			$this->createMock(IEventDispatcher::class),
			\OC::$server->getDatabaseConnection(),
			$this->config,
			\OC::$server->getHasher()
		);
	}

	protected function tearDown(): void {
		$this->clearGuests();

		parent::tearDown();
	}

	public function testCreate() {
		$this->backend->createUser('foo@example.tld', 'bar');
		$this->assertTrue($this->backend->userExists('foo@example.tld'));

		$this->assertEquals(['foo@example.tld'], $this->backend->getUsers());
	}

	public function testNoListing() {
		$this->backend->createUser('foo@example.tld', 'bar');
		$this->assertTrue($this->backend->userExists('foo@example.tld'));

		$this->assertEquals(['foo@example.tld'], $this->backend->getUsers());

		$this->backend->setAllowListing(false);

		$this->assertEquals([], $this->backend->getUsers());
	}
}
