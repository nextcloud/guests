<?php declare(strict_types=1);
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

use OCA\Guests\Config;
use OCA\Guests\GroupBackend;
use OCA\Guests\GuestManager;
use OCP\IUser;
use OCP\IUserSession;
use Test\TestCase;

class GroupBackendTest extends TestCase {
	/** @var GuestManager|\PHPUnit_Framework_MockObject_MockObject */
	private $guestManager;
	/** @var Config|\PHPUnit_Framework_MockObject_MockObject */
	private $config;
	/** @var IUserSession|\PHPUnit_Framework_MockObject_MockObject */
	private $userSession;

	/** @var GroupBackend */
	private $backend;

	protected function setUp() {
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

	private function setUID(string $uid) {
		$user = $this->createMock(IUser::class);
		$user->method('getUID')
			->willReturn($uid);

		$this->userSession->method('getUser')
			->willReturn($user);
	}

	private function setGuests(array $uids) {
		$this->guestManager->method('listGuests')
			->willReturn($uids);

		$this->guestManager->method('isGuest')
			->willReturnCallback(function ($uid) use ($uids) {
				if ($uid === null) {
					$user = $this->userSession->getUser();
					if ($user) {
						$uid = $user->getUID();
					}
				}

				return in_array($uid, $uids);
			});
	}

	public function testUsersInDifferentGroup() {
		$this->setGuests(['foo', 'bar']);

		$this->assertEquals([], $this->backend->usersInGroup('foo'));
	}

	public function testUsersInGroup() {
		$this->setGuests(['foo', 'bar']);

		$this->assertEquals(['foo', 'bar'], $this->backend->usersInGroup('guest_app'));
	}

	public function testUsersInGroupHideOthersAsGuest() {
		$this->setGuests(['foo', 'bar']);

		$this->setUID('foo');

		$this->config->method('hideOtherUsers')
			->willReturn(true);

		$this->assertEquals(['foo'], $this->backend->usersInGroup('guest_app'));
	}

	public function testUsersInGroupHideOthersAsNonGuest() {
		$this->setGuests(['foo', 'bar']);

		$this->setUID('someone');

		$this->config->method('hideOtherUsers')
			->willReturn(true);

		$this->assertEquals(['foo', 'bar'], $this->backend->usersInGroup('guest_app'));
	}

	public function testInGroup() {
		$this->setGuests(['foo', 'bar']);

		$this->assertTrue($this->backend->inGroup('foo', 'guest_app'));
		$this->assertFalse($this->backend->inGroup('other', 'guest_app'));
	}

	public function testInGroupHideOthers() {
		$this->setGuests(['foo', 'bar']);

		$this->setUID('foo');

		$this->config->method('hideOtherUsers')
			->willReturn(true);

		$this->assertTrue($this->backend->inGroup('foo', 'guest_app'));
		$this->assertTrue($this->backend->inGroup('bar', 'guest_app'));
		$this->assertFalse($this->backend->inGroup('other', 'guest_app'));
	}

	public function testGetUserGroups() {
		$this->setGuests(['foo', 'bar']);

		$this->assertEquals(['guest_app'], $this->backend->getUserGroups('foo'));
		$this->assertEquals([], $this->backend->getUserGroups('other'));
	}

	public function testGetUserGroupsHideOthers() {
		$this->setGuests(['foo', 'bar']);

		$this->setUID('foo');

		$this->config->method('hideOtherUsers')
			->willReturn(true);

		$this->assertEquals(['guest_app'], $this->backend->getUserGroups('foo'));
		$this->assertEquals(['guest_app'], $this->backend->getUserGroups('bar'));
		$this->assertEquals([], $this->backend->getUserGroups('other'));
	}
}
