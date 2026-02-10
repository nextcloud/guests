<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Unit;

use OCA\Guests\Config;
use OCA\Guests\GroupBackend;
use OCA\Guests\GuestManager;
use OCP\IUser;
use OCP\IUserSession;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class GroupBackendTest extends TestCase {
	/** @var GuestManager|MockObject */
	private $guestManager;

	/** @var Config|MockObject */
	private $config;

	/** @var IUserSession|MockObject */
	private $userSession;

	private ?GroupBackend $backend = null;

	protected function setUp(): void {
		parent::setUp();

		$this->guestManager = $this->createMock(GuestManager::class);
		$this->config = $this->createMock(Config::class);
		$this->userSession = $this->createMock(IUserSession::class);

		$this->backend = new GroupBackend(
			$this->guestManager,
			$this->config,
			$this->userSession
		);
	}

	private function setUID(string $uid): void {
		$user = $this->createMock(IUser::class);
		$user->method('getUID')
			->willReturn($uid);

		$this->userSession->method('getUser')
			->willReturn($user);
	}

	/**
	 * @param string[] $uids
	 */
	private function setGuests(array $uids): void {
		$this->guestManager->method('listGuests')
			->willReturn($uids);

		$this->guestManager->method('isGuest')
			->willReturnCallback(function ($uid) use ($uids): bool {
				if ($uid === null) {
					$user = $this->userSession->getUser();
					if ($user) {
						$uid = $user->getUID();
					}
				}

				return in_array($uid, $uids);
			});
	}

	public function testUsersInDifferentGroup(): void {
		$this->setGuests(['foo', 'bar']);

		$this->assertEquals([], $this->backend->usersInGroup('foo'));
	}

	public function testUsersInGroup(): void {
		$this->setGuests(['foo', 'bar']);

		$this->assertEquals(['foo', 'bar'], $this->backend->usersInGroup('guest_app'));
	}

	public function testUsersInGroupHideOthersAsGuest(): void {
		$this->setGuests(['foo', 'bar']);

		$this->setUID('foo');

		$this->config->method('hideOtherUsers')
			->willReturn(true);

		$this->assertEquals(['foo'], $this->backend->usersInGroup('guest_app'));
	}

	public function testUsersInGroupHideOthersAsNonGuest(): void {
		$this->setGuests(['foo', 'bar']);

		$this->setUID('someone');

		$this->config->method('hideOtherUsers')
			->willReturn(true);

		$this->assertEquals(['foo', 'bar'], $this->backend->usersInGroup('guest_app'));
	}

	public function testInGroup(): void {
		$this->setGuests(['foo', 'bar']);

		$this->assertTrue($this->backend->inGroup('foo', 'guest_app'));
		$this->assertFalse($this->backend->inGroup('other', 'guest_app'));
	}

	public function testInGroupHideOthers(): void {
		$this->setGuests(['foo', 'bar']);

		$this->setUID('foo');

		$this->config->method('hideOtherUsers')
			->willReturn(true);

		$this->assertTrue($this->backend->inGroup('foo', 'guest_app'));
		$this->assertTrue($this->backend->inGroup('bar', 'guest_app'));
		$this->assertFalse($this->backend->inGroup('other', 'guest_app'));
	}

	public function testGetUserGroups(): void {
		$this->setGuests(['foo', 'bar']);

		$this->assertEquals(['guest_app'], $this->backend->getUserGroups('foo'));
		$this->assertEquals([], $this->backend->getUserGroups('other'));
	}

	public function testGetUserGroupsHideOthers(): void {
		$this->setGuests(['foo', 'bar']);

		$this->setUID('foo');

		$this->config->method('hideOtherUsers')
			->willReturn(true);

		$this->assertEquals(['guest_app'], $this->backend->getUserGroups('foo'));
		$this->assertEquals(['guest_app'], $this->backend->getUserGroups('bar'));
		$this->assertEquals([], $this->backend->getUserGroups('other'));
	}
}
