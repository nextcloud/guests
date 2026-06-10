<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Unit;

use OCA\Guests\Config;
use OCP\AppFramework\Services\IAppConfig;
use OCP\Group\ISubAdmin;
use OCP\IAppConfig as IGlobalAppConfig;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IUser;
use OCP\IUserSession;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class ConfigTest extends TestCase {
	/** @var IConfig|MockObject */
	private $config;
	/** @var IGlobalAppConfig|MockObject */
	private $globalAppConfig;
	/** @var IAppConfig|MockObject */
	private $appConfig;

	/** @var ISubAdmin|MockObject */
	private $subAdmin;

	/** @var IUserSession|MockObject */
	private $userSession;

	/** @var IGroupManager|MockObject */
	private $groupManager;

	private ?Config $guestConfig = null;

	protected function setUp(): void {
		parent::setUp();

		$this->config = $this->createMock(IConfig::class);
		$this->globalAppConfig = $this->createMock(IGlobalAppConfig::class);
		$this->appConfig = $this->createMock(IAppConfig::class);
		$this->subAdmin = $this->createMock(ISubAdmin::class);
		$this->userSession = $this->createMock(IUserSession::class);
		$this->groupManager = $this->createMock(IGroupManager::class);

		$this->guestConfig = new Config(
			$this->config,
			$this->globalAppConfig,
			$this->appConfig,
			$this->subAdmin,
			$this->userSession,
			$this->groupManager
		);
	}

	public function testAllowExternalStorage(): void {
		$this->appConfig->method('getAppValueBool')
			->with('allow_external_storage', false)
			->willReturn(true);

		$this->assertTrue($this->guestConfig->allowExternalStorage());
	}

	public function testSetAllowExternalStorage(): void {
		$this->appConfig->expects($this->once())
			->method('setAppValueBool')
			->with('allow_external_storage', true);

		$this->guestConfig->setAllowExternalStorage(true);
	}

	public function testHideOtherUsers(): void {
		$this->appConfig->method('getAppValueBool')
			->with('hide_users')
			->willReturn(false);

		$this->assertFalse($this->guestConfig->hideOtherUsers());
	}

	public function testSetHideOtherUsers(): void {
		$this->appConfig->expects($this->once())
			->method('setAppValueBool')
			->with('hide_users', true);

		$this->guestConfig->setHideOtherUsers(true);
	}

	public function testGetHome(): void {
		$this->config->method('getSystemValue')
			->with('datadirectory', \OC::$SERVERROOT . '/data')
			->willReturn('/custom/path');

		$this->assertEquals('/custom/path/test_user', $this->guestConfig->getHome('test_user'));
	}

	public function testUseWhitelist(): void {
		$this->appConfig->method('getAppValueBool')
			->with('usewhitelist')
			->willReturn(false);

		$this->assertFalse($this->guestConfig->useWhitelist());
	}

	public function testSetUseWhitelist(): void {
		$this->appConfig->expects($this->once())
			->method('setAppValueBool')
			->with('usewhitelist', true);

		$this->guestConfig->setUseWhitelist(true);
	}

	public function testGetAppWhitelist(): void {
		$this->appConfig->method('getAppValueString')
			->with('whitelist')
			->willReturn('app1,app2,app3');

		$this->assertEquals(['app1', 'app2', 'app3'], $this->guestConfig->getAppWhitelist());
	}

	public function testSetAppWhitelistArray(): void {
		$this->appConfig->expects($this->once())
			->method('setAppValueString')
			->with('whitelist', 'app1,app2,app3');

		$this->guestConfig->setAppWhitelist(['app1', 'app2', 'app3']);
	}

	public function testIsSharingRestrictedToGroup(): void {
		$this->globalAppConfig->method('getValueBool')
			->with('core', 'shareapi_only_share_with_group_members')
			->willReturn(true);

		$this->assertTrue($this->guestConfig->isSharingRestrictedToGroup());
	}

	public function testIsSharingNotRestrictedToGroup(): void {
		$this->config->method('getAppValue')
			->with('core', 'shareapi_only_share_with_group_members', 'no')
			->willReturn('no');

		$this->assertFalse($this->guestConfig->isSharingRestrictedToGroup());
	}

	public function testCanCreateGuestsNoUser(): void {
		$this->userSession->method('getUser')
			->willReturn(null);

		$this->assertFalse($this->guestConfig->canCreateGuests());
	}

	public function testCanCreateGuestsWithGroupRestrictionNoMatch(): void {
		$user = $this->createStub(IUser::class);
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

	public function testCanCreateGuestsWithGroupRestrictionWithMatch(): void {
		$user = $this->createStub(IUser::class);
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

	public function testCanCreateGuestsWithSharingRestrictedButIsSubAdmin(): void {
		$user = $this->createStub(IUser::class);
		$this->userSession->method('getUser')
			->willReturn($user);

		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn([]);

		$this->globalAppConfig->method('getValueBool')
			->with('core', 'shareapi_only_share_with_group_members')
			->willReturn(true);

		$this->subAdmin->method('isSubAdmin')
			->with($user)
			->willReturn(true);

		$this->assertTrue($this->guestConfig->canCreateGuests());
	}

	public function testCanCreateGuestsWithSharingRestrictedNotSubAdmin(): void {
		$user = $this->createStub(IUser::class);
		$this->userSession->method('getUser')
			->willReturn($user);

		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn([]);

		$this->globalAppConfig->method('getValueBool')
			->with('core', 'shareapi_only_share_with_group_members')
			->willReturn(true);

		$this->subAdmin->method('isSubAdmin')
			->with($user)
			->willReturn(false);

		$this->assertFalse($this->guestConfig->canCreateGuests());
	}

	public function testGetCreateRestrictedToGroupEmpty(): void {
		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn([]);

		$this->assertEquals([], $this->guestConfig->getCreateRestrictedToGroup());
	}

	public function testGetCreateRestrictedToGroupWithAdmin(): void {
		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn(['admin', 'group1']);

		$this->assertEquals(['admin', 'group1'], $this->guestConfig->getCreateRestrictedToGroup());
	}

	public function testSetCreateRestrictedToGroup(): void {
		$this->appConfig->expects($this->once())
			->method('setAppValueArray')
			->with('create_restricted_to_group', ['group1', 'group2']);

		$this->guestConfig->setCreateRestrictedToGroup(['group1', 'group2']);
	}

	public function testGetGuestQuota(): void {
		$this->appConfig->method('getAppValueString')
			->with('guest_quota')
			->willReturn('5 GB');

		$this->assertEquals('5 GB', $this->guestConfig->getGuestQuota());
	}

	public function testHasGuestQuotaOverride(): void {
		$this->globalAppConfig->method('hasKey')
			->with('guests', 'guest_quota')
			->willReturn(true);

		$this->assertTrue($this->guestConfig->hasGuestQuotaOverride());
	}

	public function testGetGuestQuotaDefaultWithoutOverride(): void {
		// No explicit value stored: the app config returns the preset-derived
		// lexicon default, getDetails() is not consulted.
		$this->globalAppConfig->method('hasKey')
			->with('guests', 'guest_quota')
			->willReturn(false);
		$this->appConfig->method('getAppValueString')
			->with('guest_quota')
			->willReturn('1 GB');

		$this->assertEquals('1 GB', $this->guestConfig->getGuestQuotaDefault());
	}

	public function testGetGuestQuotaDefaultWithOverride(): void {
		// An override is stored, so the preset default is read from the lexicon
		// details rather than from the (overridden) stored value.
		$this->globalAppConfig->method('hasKey')
			->with('guests', 'guest_quota')
			->willReturn(true);
		$this->globalAppConfig->method('getDetails')
			->with('guests', 'guest_quota')
			->willReturn(['default' => '10 GB']);

		$this->assertEquals('10 GB', $this->guestConfig->getGuestQuotaDefault());
	}

	public function testSetGuestQuotaValue(): void {
		$this->appConfig->expects($this->once())
			->method('setAppValueString')
			->with('guest_quota', '500 MB');

		$this->guestConfig->setGuestQuota('500 MB');
	}

	public function testSetGuestQuotaDefaultRemovesOverride(): void {
		$this->appConfig->expects($this->once())
			->method('deleteAppValue')
			->with('guest_quota');

		$this->guestConfig->setGuestQuota('default');
	}
}
