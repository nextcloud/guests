<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Unit;

use OCA\Guests\GuestManager;
use OCA\Guests\UserBackend;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Security\ICrypto;
use OCP\Security\ISecureRandom;
use OCP\Share\IManager;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class GuestManagerTest extends TestCase {
	/** @var UserBackend|MockObject */
	private $userBackend;
	/** @var IUserSession|MockObject */
	private $userSession;
	/** @var IUserManager|MockObject */
	private $userManager;
	/** @var IConfig|MockObject */
	private $config;
	/** @var ISecureRandom|MockObject */
	private $random;
	/** @var ICrypto|MockObject */
	private $crypto;
	/** @var IManager|MockObject */
	private $shareManager;
	/** @var IDBConnection|MockObject */
	private $conneciton;
	/** @var IEventDispatcher|MockObject */
	private $eventDispatcher;

	/** @var GuestManager */
	private $guestManager;

	protected function setUp(): void {
		parent::setUp();

		$this->userBackend = $this->createMock(UserBackend::class);
		$this->userSession = $this->createMock(IUserSession::class);
		$this->userManager = $this->createMock(IUserManager::class);
		$this->config = $this->createMock(IConfig::class);
		$this->random = $this->createMock(ISecureRandom::class);
		$this->random->method('generate')
			->willReturnCallback(function ($count) {
				return str_repeat('4', $count);
			});
		$this->crypto = $this->createMock(ICrypto::class);
		$this->crypto->method('encrypt')
			->willReturnCallback(function ($plain) {
				return $plain;
			});
		$this->shareManager = $this->createMock(IManager::class);
		$this->conneciton = $this->createMock(IDBConnection::class);
		$this->eventDispatcher = $this->createMock(IEventDispatcher::class);

		$this->guestManager = new GuestManager(
			$this->config,
			$this->userBackend,
			$this->random,
			$this->crypto,
			$this->shareManager,
			$this->conneciton,
			$this->userSession,
			$this->eventDispatcher,
			$this->userManager
		);
	}

	public function testIsGuestString() {
		$this->userBackend->method('userExists')
			->willReturnCallback(function ($uid) {
				return $uid === 'test_guest';
			});

		$this->assertTrue($this->guestManager->isGuest('test_guest'));
		$this->assertFalse($this->guestManager->isGuest('foo'));
	}

	public function testIsGuestObject() {
		$this->userBackend->method('userExists')
			->willReturnCallback(function ($uid) {
				return $uid === 'test_guest';
			});

		$user = $this->createMock(IUser::class);
		$user->method('getUID')
			->willReturn('test_guest');

		$this->assertTrue($this->guestManager->isGuest($user));

		$user = $this->createMock(IUser::class);
		$user->method('getUID')
			->willReturn('foo');
		$this->assertFalse($this->guestManager->isGuest($user));
	}

	public function testIsGuestNull() {
		$this->userBackend->method('userExists')
			->willReturnCallback(function ($uid) {
				return $uid === 'test_guest';
			});

		$user = $this->createMock(IUser::class);
		$user->method('getUID')
			->willReturn('test_guest');
		$this->userSession->method('getUser')
			->willReturn($user);

		$this->assertTrue($this->guestManager->isGuest($user));

		$user = $this->createMock(IUser::class);
		$user->method('getUID')
			->willReturn('foo');
		$this->userSession->method('getUser')
			->willReturn($user);

		$this->assertFalse($this->guestManager->isGuest($user));

		$this->userSession->method('getUser')
			->willReturn(null);

		$this->assertFalse($this->guestManager->isGuest($user));
	}

	public function testCreateGuest() {
		$setValues = [];
		$this->config->method('setUserValue')
			->willReturnCallback(function ($user, $app, $key, $value) use (&$setValues) {
				if (!isset($setValues[$app])) {
					$setValues[$app] = [];
				}
				$setValues[$app][$key] = $value;
			});

		$createdByUser = $this->createMock(IUser::class);
		$createdByUser->method('getUID')
			->willReturn('creator');

		$guestUser = $this->createMock(IUser::class);

		$this->userManager->expects($this->once())
			->method('createUserFromBackend')
			->with('guest@example.com', str_repeat('4', 20), $this->userBackend)
			->willReturn($guestUser);

		$guestUser->expects($this->once())
			->method('setDisplayName')
			->with('Example Guest');
		$guestUser->method('setSystemEMailAddress')
			->willReturnCallback(function ($email) {
				$this->config->setUserValue('guest@example.com', 'settings', 'email', $email);
			});
		$guestUser->method('setQuota')
			->willReturnCallback(function ($quota) {
				$this->config->setUserValue('guest@example.com', 'files', 'quota', $quota);
			});

		$returnedUser = $this->guestManager->createGuest(
			$createdByUser,
			'guest@example.com',
			'guest@example.com',
			'Example Guest',
			'test'
		);

		$this->assertSame($guestUser, $returnedUser);

		$token = str_repeat('4', 21);
		$this->assertEquals([
			'settings' => ['email' => 'guest@example.com'],
			'guests' => ['created_by' => 'creator'],
			'core' => [
				'lang' => 'test',
				'lostpassword' => sprintf('%s:%s', PHP_INT_MAX - 50000, $token)
			],
			'files' => ['quota' => '0 B']
		], $setValues);
	}
}
