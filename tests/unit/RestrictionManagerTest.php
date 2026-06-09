<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Unit;

use OCA\Guests\AppWhitelist;
use OCA\Guests\Config;
use OCA\Guests\GuestManager;
use OCA\Guests\RestrictionManager;
use OCA\Guests\UserBackend;
use OCP\Files\Config\IMountProviderCollection;
use OCP\IRequest;
use OCP\IServerContainer;
use OCP\IUser;
use OCP\IUserSession;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Log\LoggerInterface;
use Test\TestCase;

class RestrictionManagerTest extends TestCase {
	private AppWhitelist&MockObject $whitelist;

	private IRequest&MockObject $request;

	private IUserSession&MockObject $userSession;

	private RestrictionManager $restrictionManager;

	protected function setUp(): void {
		parent::setUp();

		$this->whitelist = $this->createMock(AppWhitelist::class);
		$this->request = $this->createMock(IRequest::class);
		$this->userSession = $this->createMock(IUserSession::class);

		$this->restrictionManager = new RestrictionManager(
			$this->whitelist,
			$this->request,
			$this->userSession,
			$this->createMock(IServerContainer::class),
			$this->createMock(GuestManager::class),
			$this->createMock(IMountProviderCollection::class),
			$this->createMock(Config::class),
			$this->createMock(UserBackend::class),
			$this->createMock(LoggerInterface::class),
		);
	}

	/**
	 * Regression test for https://github.com/nextcloud/guests/issues/1588:
	 * when the UserLoggedInEvent is dispatched from the user_saml ACS handler
	 * the user is not yet bound to the session, so falling back to
	 * IUserSession::getUser() yields null. verifyAccess() must not forward that
	 * null to AppWhitelist::verifyAccess() (which is typed as non-nullable).
	 */
	public function testVerifyAccessIsSkippedWhenNoUser(): void {
		$this->userSession->method('getUser')
			->willReturn(null);

		$this->whitelist->expects($this->never())
			->method('verifyAccess');

		$this->restrictionManager->verifyAccess();
	}

	public function testVerifyAccessUsesSessionUserWhenNoArgumentGiven(): void {
		$user = $this->createMock(IUser::class);
		$this->userSession->method('getUser')
			->willReturn($user);

		$this->whitelist->expects($this->once())
			->method('verifyAccess')
			->with($user, $this->request);

		$this->restrictionManager->verifyAccess();
	}

	public function testVerifyAccessPrefersExplicitUserOverSession(): void {
		// The listener passes the user from the event; the session getUser()
		// must not even be consulted in that case.
		$eventUser = $this->createMock(IUser::class);
		$this->userSession->expects($this->never())
			->method('getUser');

		$this->whitelist->expects($this->once())
			->method('verifyAccess')
			->with($eventUser, $this->request);

		$this->restrictionManager->verifyAccess($eventUser);
	}
}
