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
use OCP\IDBConnection;
use OCP\Security\IHasher;
use OCP\Server;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

/**
 * @group DB
 */
class UserBackendTest extends TestCase {
	/** @var Config|MockObject */
	private $config;

	private ?UserBackend $backend = null;

	private function clearGuests(): void {
		$query = Server::get(IDBConnection::class)->getQueryBuilder();

		$query->delete('guests_users')->executeStatement();
	}

	protected function setUp(): void {
		parent::setUp();

		$this->clearGuests();

		$this->config = $this->createMock(Config::class);

		$this->backend = new UserBackend(
			$this->createMock(IEventDispatcher::class),
			Server::get(IDBConnection::class),
			$this->config,
			Server::get(IHasher::class)
		);
	}

	protected function tearDown(): void {
		$this->clearGuests();

		parent::tearDown();
	}

	public function testCreate(): void {
		$this->backend->createUser('foo@example.tld', 'bar');
		$this->assertTrue($this->backend->userExists('foo@example.tld'));

		$this->assertEquals(['foo@example.tld'], $this->backend->getUsers());
	}

	public function testNoListing(): void {
		$this->backend->createUser('foo@example.tld', 'bar');
		$this->assertTrue($this->backend->userExists('foo@example.tld'));

		$this->assertEquals(['foo@example.tld'], $this->backend->getUsers());

		$this->backend->setAllowListing(false);

		$this->assertEquals([], $this->backend->getUsers());
	}

	public function testHashedUid(): void {
		$email = 'foo@example.tld';
		$uid = hash('sha256', $email);
		$this->backend->createUser($uid, 'bar');
		$this->backend->setInitialEmail($uid, $email);
		$this->backend->setDisplayName($uid, 'foo');
		$this->assertTrue($this->backend->userExists($email));

		$this->assertEquals($uid, $this->backend->checkPassword($email, 'bar'));

		$this->assertEquals('foo', $this->backend->getDisplayName($uid));
		$this->assertEquals('foo', $this->backend->getDisplayName($email));
		$this->assertEquals(['foo'], array_values($this->backend->getDisplayNames($uid)));
		$this->assertEquals(['foo'], array_values($this->backend->getDisplayNames($email)));
		$this->assertEquals(['foo'], array_values($this->backend->getDisplayNames(substr($email, 0, 10))));
	}

	public function testCustomLoginNameUid(): void {
		// A free-form UID (neither an email nor a sha256 hash) must be recognised.
		$uid = 'karl';
		$email = 'karl.doe@example.tld';
		$this->backend->createUser($uid, 'bar');
		$this->backend->setInitialEmail($uid, $email);
		$this->backend->setDisplayName($uid, 'Karl Doe');

		$this->assertTrue($this->backend->userExists($uid));
		$this->assertEquals($uid, $this->backend->getRealUID($uid));
		$this->assertEquals($uid, $this->backend->checkPassword($uid, 'bar'));
		$this->assertEquals($uid, $this->backend->checkPassword($email, 'bar'));
		$this->assertEquals('Karl Doe', $this->backend->getDisplayName($uid));
	}

	/**
	 * An outdated hash has to be upgraded no matter whether the guest logged
	 * in with the user id or with the email address.
	 */
	public function testOutdatedPasswordHashIsUpgradedOnEmailLogin(): void {
		$email = 'foo@example.tld';
		$uid = hash('sha256', $email);
		$this->backend->createUser($uid, 'bar');
		$this->backend->setInitialEmail($uid, $email);

		// An unprefixed bcrypt hash is a legacy hash, so verifying it always
		// hands back a replacement hash.
		$legacyHash = password_hash('bar', PASSWORD_BCRYPT);
		$query = Server::get(IDBConnection::class)->getQueryBuilder();
		$query->update('guests_users')
			->set('password', $query->createNamedParameter($legacyHash))
			->where($query->expr()->eq('uid_lower', $query->createNamedParameter($uid)));
		$query->executeStatement();

		$this->assertEquals($uid, $this->backend->checkPassword($email, 'bar'));

		$this->assertNotEquals($legacyHash, $this->backend->getPasswordHash($uid));
	}

	/**
	 * Searching orders by display name first, which also decides which
	 * guests a limited search returns.
	 */
	public function testSearchIsOrderedByDisplayName(): void {
		$this->backend->createUser('aaa@example.tld', 'bar');
		$this->backend->setDisplayName('aaa@example.tld', 'Zoe');
		$this->backend->createUser('zzz@example.tld', 'bar');
		$this->backend->setDisplayName('zzz@example.tld', 'Alice');

		$this->assertEquals(['Alice', 'Zoe'], array_values($this->backend->getDisplayNames('example.tld')));
	}
}
