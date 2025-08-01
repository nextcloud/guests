<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Unit\Controller;

use OCA\Guests\Config;
use OCA\Guests\Controller\UsersController;
use OCA\Guests\Db\TransferMapper;
use OCA\Guests\GuestManager;
use OCA\Guests\Service\InviteService;
use OCA\Guests\TransferService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Services\IAppConfig;
use OCP\Group\ISubAdmin;
use OCP\IConfig;
use OCP\IGroup;
use OCP\IGroupManager;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Mail\IMailer;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class UsersControllerTest extends TestCase {
	/** @var IRequest|MockObject */
	private $request;
	/** @var IUserManager|MockObject */
	private $userManager;
	/** @var IL10N|MockObject */
	private $l10n;
	/** @var Config|MockObject */
	private $guestsConfig;
	/** @var IMailer|MockObject */
	private $mailer;
	/** @var GuestManager|MockObject */
	private $guestManager;
	/** @var IUserSession|MockObject */
	private $userSession;
	/** @var ISubAdmin|MockObject */
	private $subAdmin;
	/** @var IGroupManager|MockObject */
	private $groupManager;
	/** @var TransferService|MockObject */
	private $transferService;
	/** @var TransferMapper|MockObject */
	private $transferMapper;
	/** @var IAppConfig|MockObject */
	private $appConfig;
	/** @var IConfig|MockObject */
	private $config;
	/** @var InviteService|MockObject */
	private $inviteService;

	/** @var UsersController */
	private $controller;

	protected function setUp(): void {
		parent::setUp();

		$this->request = $this->createMock(IRequest::class);
		$this->userManager = $this->createMock(IUserManager::class);
		$this->l10n = $this->createMock(IL10N::class);
		$this->mailer = $this->createMock(IMailer::class);
		$this->guestManager = $this->createMock(GuestManager::class);
		$this->userSession = $this->createMock(IUserSession::class);
		$this->subAdmin = $this->createMock(ISubAdmin::class);
		$this->groupManager = $this->createMock(IGroupManager::class);
		$this->transferService = $this->createMock(TransferService::class);
		$this->transferMapper = $this->createMock(TransferMapper::class);
		$this->appConfig = $this->createMock(IAppConfig::class);
		$this->config = $this->createMock(IConfig::class);
		$this->inviteService = $this->createMock(InviteService::class);

		$this->guestsConfig = new Config(
			$this->config,
			$this->appConfig,
			$this->subAdmin,
			$this->userSession,
			$this->groupManager
		);

		$this->l10n->method('t')
			->willReturnCallback(function ($text) {
				return $text;
			});

		$this->controller = new UsersController(
			'guests',
			$this->request,
			$this->userManager,
			$this->l10n,
			$this->guestsConfig,
			$this->mailer,
			$this->guestManager,
			$this->userSession,
			$this->subAdmin,
			$this->groupManager,
			$this->transferService,
			$this->transferMapper,
			$this->inviteService
		);
	}

	/**
	 * Test that creation fails when the current user is a guest.
	 */
	public function testCreateWhenCurrentUserIsGuest() {
		$currentUser = $this->createMock(IUser::class);
		$this->userSession->method('getUser')
			->willReturn($currentUser);

		$this->guestManager->method('isGuest')
			->with($currentUser)
			->willReturn(true);

		// No restrictions in place
		$this->assertTrue($this->guestsConfig->canCreateGuests());

		$response = $this->controller->create('test@example.com', 'Test User', 'en', []);
		$this->assertEquals(Http::STATUS_FORBIDDEN, $response->getStatus());
		$this->assertEquals(['errorMessages' => ['Guests are not allowed to create guests']], $response->getData());
	}

	/**
	 * Test that creation fails when the user is not logged in.
	 */
	public function testCreateFailsWithNoUserSession() {
		// Mock user session to return null (no logged-in user)
		$this->userSession->method('getUser')
			->willReturn(null);

		// Empty user session will return false straight away
		$this->assertFalse($this->guestsConfig->canCreateGuests());

		$response = $this->controller->create('test@example.com', 'Test User', 'en', []);
		$this->assertEquals(Http::STATUS_FORBIDDEN, $response->getStatus());
		$this->assertEquals(['errorMessages' => ['You are not allowed to create guests']], $response->getData());
	}

	/**
	 * Test that creation fails when user is not in allowed groups
	 */
	public function testCreateFailsWhenUserNotInAllowedGroups() {
		// Mock current user
		$currentUser = $this->createMock(IUser::class);
		$currentUser->method('getUID')
			->willReturn('test_user');

		$this->userSession->method('getUser')
			->willReturn($currentUser);

		$this->guestManager->method('isGuest')
			->with($currentUser)
			->willReturn(false);

		// Set up group restriction check
		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn(['allowed_group1', 'allowed_group2']);

		// User's groups don't intersect with allowed groups
		$this->groupManager->method('getUserGroupIds')
			->with($currentUser)
			->willReturn(['other_group1', 'other_group2']);

		$response = $this->controller->create('test@example.com', 'Test User', 'en', []);
		$this->assertEquals(Http::STATUS_FORBIDDEN, $response->getStatus());
		$this->assertEquals(['errorMessages' => ['You are not allowed to create guests']], $response->getData());
	}

	/**
	 * Test that admin users can always create guests regardless of group restrictions
	 */
	public function testCreateSucceedsForAdminDespiteGroupRestrictions() {
		// Mock current user
		$currentUser = $this->createMock(IUser::class);
		$currentUser->method('getUID')
			->willReturn('admin_user');

		$this->userSession->method('getUser')
			->willReturn($currentUser);

		$this->guestManager->method('isGuest')
			->with($currentUser)
			->willReturn(false);

		// Set up group restriction check
		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn(['allowed_group1', 'allowed_group2']);

		// User is in the admin group
		$this->groupManager->method('getUserGroupIds')
			->with($currentUser)
			->willReturn(['admin', 'other_group']);

		// User is an admin
		$this->groupManager->method('isAdmin')
			->with('admin_user')
			->willReturn(true);

		// Other necessary mocks for a successful creation
		$this->mailer->method('validateMailAddress')
			->willReturn(true);

		$this->userManager->method('getByEmail')
			->willReturn([]);

		$this->userManager->method('userExists')
			->willReturn(false);

		$guestUser = $this->createMock(IUser::class);
		$this->guestManager->method('createGuest')
			->willReturn($guestUser);

		$this->userManager->method('get')
			->willReturn($guestUser);

		$response = $this->controller->create('new@example.com', 'Test User', 'en', []);
		$this->assertEquals(Http::STATUS_CREATED, $response->getStatus());
	}

	/**
	 * Test that creation succeeds when user is in one of the allowed groups
	 */
	public function testCreateSucceedsWhenUserInAllowedGroup() {
		// Mock current user
		$currentUser = $this->createMock(IUser::class);
		$currentUser->method('getUID')
			->willReturn('test_user');

		$this->userSession->method('getUser')
			->willReturn($currentUser);

		$this->guestManager->method('isGuest')
			->with($currentUser)
			->willReturn(false);

		// Set up group restriction check
		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn(['allowed_group1', 'allowed_group2']);

		// User is in one of the allowed groups
		$this->groupManager->method('getUserGroupIds')
			->with($currentUser)
			->willReturn(['other_group', 'allowed_group2']);

		// Other necessary mocks for a successful creation
		$this->mailer->method('validateMailAddress')
			->willReturn(true);

		$this->userManager->method('getByEmail')
			->willReturn([]);

		$this->userManager->method('userExists')
			->willReturn(false);

		$guestUser = $this->createMock(IUser::class);
		$this->guestManager->method('createGuest')
			->willReturn($guestUser);

		$this->userManager->method('get')
			->willReturn($guestUser);

		$response = $this->controller->create('new@example.com', 'Test User', 'en', []);
		$this->assertEquals(Http::STATUS_CREATED, $response->getStatus());
	}

	/**
	 * Test that SubAdmin can create guests when sharing is restricted to group
	 */
	public function testCreateSucceedsForSubAdminWhenSharingIsRestricted() {
		// Mock current user
		$currentUser = $this->createMock(IUser::class);
		$currentUser->method('getUID')
			->willReturn('subadmin_user');

		$group = $this->createMock(IGroup::class);
		$group->method('getGID')
			->willReturn('allowed_group1');
		$this->groupManager->method('get')
			->with('allowed_group1')
			->willReturn($group);

		$this->userSession->method('getUser')
			->willReturn($currentUser);

		$this->guestManager->method('isGuest')
			->with($currentUser)
			->willReturn(false);

		// No group restrictions
		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn([]);

		// Sharing is restricted to group
		$this->config->method('getAppValue')
			->with('core', 'shareapi_only_share_with_group_members', 'no')
			->willReturn('yes');

		// User is a subadmin
		$this->subAdmin->method('isSubAdmin')
			->with($currentUser)
			->willReturn(true);
		$this->subAdmin->method('isSubAdminOfGroup')
			->with($currentUser, $group)
			->willReturn(true);

		// Other necessary mocks for a successful creation
		$this->mailer->method('validateMailAddress')
			->willReturn(true);

		$this->userManager->method('getByEmail')
			->willReturn([]);

		$this->userManager->method('userExists')
			->willReturn(false);

		$guestUser = $this->createMock(IUser::class);
		$this->guestManager->method('createGuest')
			->willReturn($guestUser);

		$this->userManager->method('get')
			->willReturn($guestUser);

		$this->assertTrue($this->guestsConfig->canCreateGuests());
		$this->assertTrue($this->guestsConfig->isSharingRestrictedToGroup());

		$response = $this->controller->create('new@example.com', 'Test User', 'en', ['allowed_group1']);
		$this->assertEquals(Http::STATUS_CREATED, $response->getStatus());
	}

	/**
	 * Test that non-SubAdmin cannot create guests when sharing is restricted to group
	 */
	public function testCreateFailsForNonSubAdminWhenSharingIsRestricted() {
		// Mock current user
		$currentUser = $this->createMock(IUser::class);
		$currentUser->method('getUID')
			->willReturn('regular_user');

		$this->userSession->method('getUser')
			->willReturn($currentUser);

		$this->guestManager->method('isGuest')
			->with($currentUser)
			->willReturn(false);

		// No group restrictions
		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn([]);

		// Sharing is restricted to group
		$this->config->method('getAppValue')
			->with('core', 'shareapi_only_share_with_group_members', 'no')
			->willReturn('yes');

		// User is NOT a subadmin
		$this->subAdmin->method('isSubAdmin')
			->with($currentUser)
			->willReturn(false);

		$response = $this->controller->create('test@example.com', 'Test User', 'en', []);
		$this->assertEquals(Http::STATUS_FORBIDDEN, $response->getStatus());
		$this->assertEquals(['errorMessages' => ['You are not allowed to create guests']], $response->getData());
	}

	/**
	 * Test that creation succeeds when there are no restrictions
	 */
	public function testCreateSucceedsWhenNoRestrictions() {
		// Mock current user
		$currentUser = $this->createMock(IUser::class);
		$currentUser->method('getUID')
			->willReturn('regular_user');

		$this->userSession->method('getUser')
			->willReturn($currentUser);

		$this->guestManager->method('isGuest')
			->with($currentUser)
			->willReturn(false);

		// No group restrictions
		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn([]);

		// Sharing is restricted to group
		$this->config->method('getAppValue')
			->with('core', 'shareapi_only_share_with_group_members', 'no')
			->willReturn('no');

		// Other necessary mocks for a successful creation
		$this->mailer->method('validateMailAddress')
			->willReturn(true);

		$this->userManager->method('getByEmail')
			->willReturn([]);

		$this->userManager->method('userExists')
			->willReturn(false);

		$guestUser = $this->createMock(IUser::class);
		$this->guestManager->method('createGuest')
			->willReturn($guestUser);

		$this->userManager->method('get')
			->willReturn($guestUser);

		$response = $this->controller->create('new@example.com', 'Test User', 'en', []);
		$this->assertEquals(Http::STATUS_CREATED, $response->getStatus());
	}

	/**
	 * Test that creation fails when sharing is restricted to group but no groups are provided
	 */
	public function testCreateWhenSharingRestrictedToGroupButNoGroups() {
		$currentUser = $this->createMock(IUser::class);
		$currentUser->method('getUID')
			->willReturn('admin_user');
		$this->userSession->method('getUser')
			->willReturn($currentUser);

		$this->guestManager->method('isGuest')
			->with($currentUser)
			->willReturn(false);

		// Groups restriction is empty
		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn([]);

		// Sharing is restricted to group
		$this->config->method('getAppValue')
			->with('core', 'shareapi_only_share_with_group_members', 'no')
			->willReturn('yes');

		// User is an admin
		// so they are allowed to create guests
		$this->groupManager->method('isAdmin')
			->with('admin_user')
			->willReturn(true);

		$this->assertTrue($this->guestsConfig->canCreateGuests());
		$this->assertTrue($this->guestsConfig->isSharingRestrictedToGroup());

		$response = $this->controller->create('test@example.com', 'Test User', 'en', []);
		$this->assertEquals(Http::STATUS_FORBIDDEN, $response->getStatus());
		$this->assertEquals(['errorMessages' => ['Guest user must be added to at least one group']], $response->getData());
	}

	/**
	 * Test that creation fails when group does not exist
	 */
	public function testCreateWithNonExistentGroup() {
		$currentUser = $this->createMock(IUser::class);
		$currentUser->method('getUID')
			->willReturn('admin_user');
		$this->userSession->method('getUser')
			->willReturn($currentUser);

		$this->guestManager->method('isGuest')
			->with($currentUser)
			->willReturn(false);

		// User is an admin
		// so they are allowed to create guests
		$this->groupManager->method('isAdmin')
			->with('admin_user')
			->willReturn(true);

		// Sharing is restricted to group
		$this->config->method('getAppValue')
			->with('core', 'shareapi_only_share_with_group_members', 'no')
			->willReturn('yes');

		$this->assertTrue($this->guestsConfig->canCreateGuests());
		$this->assertTrue($this->guestsConfig->isSharingRestrictedToGroup());

		$this->groupManager->method('get')
			->with('nonexistent')
			->willReturn(null);

		$response = $this->controller->create('test@example.com', 'Test User', 'en', ['nonexistent']);
		$this->assertEquals(Http::STATUS_BAD_REQUEST, $response->getStatus());
		$this->assertEquals(['errorMessages' => ['Group nonexistent not found']], $response->getData());
	}

	/**
	 * Test that creation fails when user is subadmin, but is not a subadmin of the group
	 */
	public function testCreateWithGroupButNotSubAdmin() {
		$currentUser = $this->createMock(IUser::class);
		$currentUser->method('getUID')
			->willReturn('current_user');
		$this->userSession->method('getUser')
			->willReturn($currentUser);

		$this->guestManager->method('isGuest')
			->with($currentUser)
			->willReturn(false);

		$group = $this->createMock(IGroup::class);
		$this->groupManager->method('get')
			->with('testgroup')
			->willReturn($group);

		$this->subAdmin->method('isSubAdmin')
			->with($currentUser)
			->willReturn(true);

		$this->subAdmin->method('isSubAdminOfGroup')
			->with($currentUser, $group)
			->willReturn(false);

		$this->groupManager->method('isAdmin')
			->with('current_user')
			->willReturn(false);

		// Sharing is restricted to group
		$this->config->method('getAppValue')
			->with('core', 'shareapi_only_share_with_group_members', 'no')
			->willReturn('yes');

		// There is no group restriction in place
		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn([]);

		$this->assertTrue($this->guestsConfig->canCreateGuests());
		$this->assertTrue($this->guestsConfig->isSharingRestrictedToGroup());

		$response = $this->controller->create('test@example.com', 'Test User', 'en', ['testgroup']);
		$this->assertEquals(Http::STATUS_FORBIDDEN, $response->getStatus());
		$this->assertEquals(['errorMessages' => ['You are not allowed to add users to group testgroup']], $response->getData());
	}

	/**
	 * Test that creation fails when email is invalid
	 */
	public function testCreateWithInvalidEmail() {
		$currentUser = $this->createMock(IUser::class);
		$currentUser->method('getUID')
			->willReturn('current_user');
		$this->userSession->method('getUser')
			->willReturn($currentUser);

		$this->guestManager->method('isGuest')
			->with($currentUser)
			->willReturn(false);

		$this->mailer->method('validateMailAddress')
			->with('invalid_email')
			->willReturn(false);

		$this->userManager->method('getByEmail')
			->with('invalid_email')
			->willReturn([]);

		$this->assertTrue($this->guestsConfig->canCreateGuests());

		$response = $this->controller->create('invalid_email', 'Test User', 'en', []);
		$this->assertEquals(Http::STATUS_UNPROCESSABLE_ENTITY, $response->getStatus());
		$this->assertEquals(['errorMessages' => ['email' => 'Invalid mail address']], $response->getData());
	}

	/**
	 * Test that creation fails when user with the same email already exists
	 */
	public function testCreateWithExistingEmailUser() {
		$currentUser = $this->createMock(IUser::class);
		$currentUser->method('getUID')
			->willReturn('current_user');
		$this->userSession->method('getUser')
			->willReturn($currentUser);

		$this->guestManager->method('isGuest')
			->with($currentUser)
			->willReturn(false);

		$this->mailer->method('validateMailAddress')
			->with('existing@example.com')
			->willReturn(true);

		$existingUser = $this->createMock(IUser::class);
		$this->userManager->method('getByEmail')
			->with('existing@example.com')
			->willReturn([$existingUser]);

		$this->assertTrue($this->guestsConfig->canCreateGuests());

		$response = $this->controller->create('existing@example.com', 'Test User', 'en', []);
		$this->assertEquals(Http::STATUS_UNPROCESSABLE_ENTITY, $response->getStatus());
		$this->assertEquals(['errorMessages' => ['email' => 'A user with that email already exists.']], $response->getData());
	}

	/**
	 * Test that creation fails when user with the same username already exists
	 */
	public function testCreateWithExistingUsernameUser() {
		$currentUser = $this->createMock(IUser::class);
		$currentUser->method('getUID')
			->willReturn('current_user');
		$this->userSession->method('getUser')
			->willReturn($currentUser);

		$this->guestManager->method('isGuest')
			->with($currentUser)
			->willReturn(false);

		$this->mailer->method('validateMailAddress')
			->with('existing@example.com')
			->willReturn(true);

		$this->userManager->method('getByEmail')
			->with('existing@example.com')
			->willReturn([]);

		$this->userManager->method('userExists')
			->with('existing@example.com')
			->willReturn(true);

		$this->assertTrue($this->guestsConfig->canCreateGuests());

		$response = $this->controller->create('existing@example.com', 'Test User', 'en', []);
		$this->assertEquals(Http::STATUS_UNPROCESSABLE_ENTITY, $response->getStatus());
		$this->assertEquals(['errorMessages' => ['username' => 'A user with that name already exists.']], $response->getData());
	}

	/**
	 * Test that creation succeeds when user is a subadmin of groups
	 * the new guest is added to. But not a member of the allowed groups.
	 * Enforcing group restrictions won't have any effect
	 * since the user is a subadmin and can create guests anyway.
	 */
	public function testCreateSuccessWithGroupsAsSubadmin() {
		$currentUser = $this->createMock(IUser::class);
		$currentUser->method('getUID')
			->willReturn('current_user');
		$this->userSession->method('getUser')
			->willReturn($currentUser);

		$this->guestManager->method('isGuest')
			->with($currentUser)
			->willReturn(false);

		$group1 = $this->createMock(IGroup::class);
		$group2 = $this->createMock(IGroup::class);
		$this->groupManager->method('get')
			->willReturnMap([
				['group1', $group1],
				['group2', $group2],
			]);

		$this->subAdmin->method('isSubAdmin')
			->willReturn(true);
		$this->subAdmin->method('isSubAdminOfGroup')
			->with($currentUser, $group1)
			->willReturn(true);
		$this->subAdmin->method('isSubAdminOfGroup')
			->with($currentUser, $group2)
			->willReturn(true);

		$this->mailer->method('validateMailAddress')
			->with('new@example.com')
			->willReturn(true);

		$this->userManager->method('getByEmail')
			->with('new@example.com')
			->willReturn([]);

		$this->userManager->method('userExists')
			->with('new@example.com')
			->willReturn(false);

		$guestUser = $this->createMock(IUser::class);
		$this->userManager->method('get')
			->with('new@example.com')
			->willReturn($guestUser);

		$this->guestManager->expects($this->once())
			->method('createGuest')
			->with($currentUser, 'new@example.com', 'new@example.com', 'Test User', 'en')
			->willReturn($guestUser);

		$group1->expects($this->once())
			->method('addUser')
			->with($guestUser);
		$group2->expects($this->once())
			->method('addUser')
			->with($guestUser);

		// Enable restrictions
		$this->appConfig->method('getAppValueArray')
			->with('create_restricted_to_group', [])
			->willReturn(['group1', 'group2']);

		// User's groups don't intersect with allowed groups
		$this->groupManager->method('getUserGroupIds')
			->with($currentUser)
			->willReturn(['other_group1', 'other_group2']);

		// Sharing is restricted to group
		$this->config->method('getAppValue')
			->with('core', 'shareapi_only_share_with_group_members', 'no')
			->willReturn('yes');

		$this->assertTrue($this->guestsConfig->canCreateGuests());
		$this->assertTrue($this->guestsConfig->isSharingRestrictedToGroup());

		$response = $this->controller->create('new@example.com', 'Test User', 'en', ['group1', 'group2']);
		$this->assertEquals(Http::STATUS_CREATED, $response->getStatus());
		$this->assertEquals(['message' => 'User successfully created'], $response->getData());
	}

	/**
	 * Test that creation fails when an exception is thrown.
	 * This is a generic test to ensure that the controller
	 * handles exceptions correctly.
	 */
	public function testCreateException() {
		$currentUser = $this->createMock(IUser::class);
		$currentUser->method('getUID')
			->willReturn('current_user');
		$this->userSession->method('getUser')
			->willReturn($currentUser);

		$this->guestManager->method('isGuest')
			->with($currentUser)
			->willReturn(false);

		$this->mailer->method('validateMailAddress')
			->with('new@example.com')
			->willReturn(true);

		$this->userManager->method('getByEmail')
			->with('new@example.com')
			->willReturn([]);

		$this->userManager->method('userExists')
			->with('new@example.com')
			->willReturn(false);

		$this->guestManager->expects($this->once())
			->method('createGuest')
			->with($currentUser, 'new@example.com', 'new@example.com', 'Test User', 'en')
			->willThrowException(new \Exception('Error creating guest'));

		$this->assertTrue($this->guestsConfig->canCreateGuests());

		$response = $this->controller->create('new@example.com', 'Test User', 'en', []);
		$this->assertEquals(Http::STATUS_UNPROCESSABLE_ENTITY, $response->getStatus());
		$this->assertEquals(['errorMessages' => ['email' => 'Error creating guest']], $response->getData());
	}
}
