<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Unit\Service;

use OCA\Guests\AppInfo\Application;
use OCA\Guests\ConfigLexicon;
use OCA\Guests\Service\ConversionService;
use OCP\Config\IUserConfig;
use OCP\IDBConnection;
use OCP\IUser;
use OCP\Server;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

/**
 * @group DB
 */
class ConversionServiceTest extends TestCase {
	private IDBConnection $db;
	private IUserConfig&MockObject $userConfig;
	private ConversionService $service;

	protected function setUp(): void {
		parent::setUp();

		$this->db = Server::get(IDBConnection::class);
		$this->cleanup();
		$this->userConfig = $this->createMock(IUserConfig::class);
		$this->service = new ConversionService($this->db, $this->userConfig);
	}

	protected function tearDown(): void {
		$this->cleanup();
		parent::tearDown();
	}

	private function cleanup(): void {
		foreach (['guests_users', 'users'] as $table) {
			$query = $this->db->getQueryBuilder();
			$query->delete($table)
				->where($query->expr()->eq('uid_lower', $query->createNamedParameter('karl')));
			$query->executeStatement();
		}
	}

	private function rowExists(string $table): bool {
		$query = $this->db->getQueryBuilder();
		$query->select('uid')
			->from($table)
			->where($query->expr()->eq('uid_lower', $query->createNamedParameter('karl')));
		$result = $query->executeQuery();
		$uid = $result->fetchOne();
		$result->closeCursor();
		return $uid !== false;
	}

	public function testConvertToGuest(): void {
		// Seed a regular (database backend) account.
		$insert = $this->db->getQueryBuilder();
		$insert->insert('users')
			->values([
				'uid' => $insert->createNamedParameter('karl'),
				'uid_lower' => $insert->createNamedParameter('karl'),
				'displayname' => $insert->createNamedParameter('Karl Doe'),
				'password' => $insert->createNamedParameter('3|$argon2id$v=19$dummyhash'),
			]);
		$insert->executeStatement();

		$user = $this->createMock(IUser::class);
		$user->method('getUID')->willReturn('karl');
		$user->method('getDisplayName')->willReturn('Karl Doe');
		$user->method('getSystemEMailAddress')->willReturn('karl.doe@example.tld');

		$createdBy = $this->createMock(IUser::class);
		$createdBy->method('getUID')->willReturn('admin');

		$this->userConfig->expects($this->once())
			->method('setValueString')
			->with('karl', Application::APP_ID, ConfigLexicon::USER_CREATED_BY, 'admin');

		$this->service->convertToGuest($user, $createdBy);

		// The account moved from the database backend to the guests backend,
		// keeping its user ID, display name and password hash.
		$this->assertFalse($this->rowExists('users'));
		$this->assertTrue($this->rowExists('guests_users'));

		$query = $this->db->getQueryBuilder();
		$query->select('password', 'email', 'displayname')
			->from('guests_users')
			->where($query->expr()->eq('uid_lower', $query->createNamedParameter('karl')));
		$result = $query->executeQuery();
		$row = $result->fetch();
		$result->closeCursor();

		$this->assertIsArray($row);
		$this->assertSame('3|$argon2id$v=19$dummyhash', $row['password']);
		$this->assertSame('karl.doe@example.tld', $row['email']);
		$this->assertSame('Karl Doe', $row['displayname']);
	}
}
