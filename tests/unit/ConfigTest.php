<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Unit;

use OCA\Guests\AppWhitelist;
use OCA\Guests\Config;
use OCP\AppFramework\Services\IAppConfig;
use OCP\Group\ISubAdmin;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IUser;
use OCP\IUserSession;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class ConfigTest extends TestCase {
	/** @var IConfig|MockObject */
	private $config;
	/** @var IAppConfig|MockObject */
	private $appConfig;
	/** @var ISubAdmin|MockObject */
	private $subAdmin;
	/** @var IUserSession|MockObject */
	private $userSession;
	/** @var IGroupManager|MockObject */
	private $groupManager;

	/** @var Config */
	private $guestConfig;

	protected function setUp(): void {
		parent::setUp();

		$this->config = $this->createMock(IConfig::class);
		$this->appConfig = $this->createMock(IAppConfig::class);
		$this->subAdmin = $this->createMock(ISubAdmin::class);
		$this->userSession = $this->createMock(IUserSession::class);
		$this->groupManager = $this->createMock(IGroupManager::class);

		$this->guestConfig = new Config(
			$this->config,
			$this->appConfig,
			$this->subAdmin,
			$this->userSession,
			$this->groupManager
		);
	}

	public function testAllowExternalStorage() {
		$this->appConfig->method('getAppValueBool')
			->with('allow_external_storage', false)
			->willReturn(true);

		$this->assertTrue($this->guestConfig->allowExternalStorage());
	}

	public function testSetAllowExternalStorage() {
		$this->appConfig->expects($this->exactly(2))
			->method('setAppValueBool')
			->with('allow_external_storage', true);

		$this->guestConfig->setAllowExternalStorage(true);
		$this->guestConfig->setAllowExternalStorage('true');
	}

	public function testHideOtherUsers() {
		$this->appConfig->method('getAppValueBool')
			->with('hide_users', true)
			->willReturn(false);

		$this->assertFalse($this->guestConfig->hideOtherUsers());
	}

	public function testSetHideOtherUsers() {
		$this->appConfig->expects($this->exactly(2))
			->method('setAppValueBool')
			->with('hide_users', true);

		$this->guestConfig->setHideOtherUsers(true);
		$this->guestConfig->setHideOtherUsers('true');
	}

	public function testGetHome() {
		$this->config->method('getSystemValue')
			->with('datadirectory', \OC::$SERVERROOT . '/data')
			->willReturn('/custom/path');

		$this->assertEquals('/custom/path/test_user', $this->guestConfig->getHome('test_user'));
	}

	public function testUseWhitelist() {
		$this->appConfig->method('getAppValueBool')
			->with('usewhitelist', true)
			->willReturn(false);

		$this->assertFalse($this->guestConfig->useWhitelist());
	}

	public function testSetUseWhitelist() {
		$this->appConfig->expects($this->exactly(2))
			->method('setAppValueBool')
			->with('usewhitelist', true);

		$this->guestConfig->setUseWhitelist(true);
		$this->guestConfig->setUseWhitelist('true');
	}

	public function testGetAppWhitelist() {
		$this->appConfig->method('getAppValueString')
			->with('whitelist', AppWhitelist::DEFAULT_WHITELIST)
			->willReturn('app1,app2,app3');

		$this->assertEquals(['app1', 'app2', 'app3'], $this->guestConfig->getAppWhitelist());
	}

	public function testSetAppWhitelistArray() {
		$this->appConfig->expects($this->exactly(2))
			->method('setAppValueString')
			->with('whitelist', 'app1,app2,app3');

		$this->guestConfig->setAppWhitelist(['app1', 'app2', 'app3']);
		$this->guestConfig->setAppWhitelist('app1,app2,app3');
	}

	public function testIsSharingRestrictedToGroup() {
		$this->config->method('getAppValue')
			->with('core', 'shareapi_only_share_with_group_members', 'no')
			->willReturn('yes');

		$this->assertTrue($this->guestConfig->isSharingRestrictedToGroup());
	}

	public function testIsSharingNotRestrictedToGroup() {
		$this->config->method('getAppValue')
			->with('core', 'shareapi_only_share_with_group_members', 'no')
			->willReturn('no');

		$this->assertFalse($this->guestConfig->isSharingRestrictedToGroup());
	}

	public function testCanCreateGuestsNoUser() {
		$this->userSession->method('getUser')
			->willReturn(null);

		$this->assertFalse($this->guestConfig->canCreateGuests());
	}

	public function testCanCreateGuestsWithGroupRestrictionNoMatch() {
		$user = $this->createMock(IUser::class);
		$this->userSession->method('getUser')
			->willReturn($user);

		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn(['group1', 'group2']);

		$this->groupManager->method('getUserGroupIds')
			->with($user)
			->willReturn(['group3', 'group4']);

		$this->assertFalse($this->guestConfig->canCreateGuests());
	}

	public function testCanCreateGuestsWithGroupRestrictionWithMatch() {
		$user = $this->createMock(IUser::class);
		$this->userSession->method('getUser')
			->willReturn($user);

		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn(['group1', 'group2']);

		$this->groupManager->method('getUserGroupIds')
			->with($user)
			->willReturn(['group2', 'group3']);

		$this->config->method('getAppValue')
			->with('core', 'shareapi_only_share_with_group_members', 'no')
			->willReturn('no');

		$this->assertTrue($this->guestConfig->canCreateGuests());
	}

	public function testCanCreateGuestsWithSharingRestrictedButIsSubAdmin() {
		$user = $this->createMock(IUser::class);
		$this->userSession->method('getUser')
			->willReturn($user);

		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn([]);

		$this->config->method('getAppValue')
			->with('core', 'shareapi_only_share_with_group_members', 'no')
			->willReturn('yes');

		$this->subAdmin->method('isSubAdmin')
			->with($user)
			->willReturn(true);

		$this->assertTrue($this->guestConfig->canCreateGuests());
	}

	public function testCanCreateGuestsWithSharingRestrictedNotSubAdmin() {
		$user = $this->createMock(IUser::class);
		$this->userSession->method('getUser')
			->willReturn($user);

		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn([]);

		$this->config->method('getAppValue')
			->with('core', 'shareapi_only_share_with_group_members', 'no')
			->willReturn('yes');

		$this->subAdmin->method('isSubAdmin')
			->with($user)
			->willReturn(false);

		$this->assertFalse($this->guestConfig->canCreateGuests());
	}

	public function testGetCreateRestrictedToGroupEmpty() {
		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn([]);

		$this->assertEquals([], $this->guestConfig->getCreateRestrictedToGroup());
	}

	public function testGetCreateRestrictedToGroupWithAdmin() {
		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn(['admin', 'group1']);

		$this->assertEquals(['admin', 'group1'], $this->guestConfig->getCreateRestrictedToGroup());
	}

	public function testSetCreateRestrictedToGroup() {
		$this->appConfig->expects($this->once())
			->method('setAppValueArray')
			->with('create_restricted_to_group', ['group1', 'group2']);

		$this->guestConfig->setCreateRestrictedToGroup(['group1', 'group2']);
	}
}
