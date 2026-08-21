<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Unit;

use OCA\Guests\AppWhitelist;
use OCA\Guests\Config;
use OCA\Guests\GuestManager;
use OCP\App\IAppManager;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\IUser;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Log\LoggerInterface;
use Test\TestCase;

class AppWhitelistTest extends TestCase {
	private Config&MockObject $config;

	private GuestManager&MockObject $guestManager;

	private IL10N&MockObject $l10n;

	private IAppManager&MockObject $appManager;

	private IURLGenerator&MockObject $urlGenerator;

	private ?AppWhitelist $appWhitelist = null;

	protected function setUp(): void {
		parent::setUp();

		$this->config = $this->createMock(Config::class);
		$this->guestManager = $this->createMock(GuestManager::class);
		$this->l10n = $this->createMock(IL10N::class);
		$this->appManager = $this->createMock(IAppManager::class);
		$this->urlGenerator = $this->createMock(IURLGenerator::class);
		$this->urlGenerator->method('getBaseUrl')
			->willReturn('');

		$this->appWhitelist = new AppWhitelist(
			$this->urlGenerator,
			$this->config,
			$this->guestManager,
			$this->l10n,
			$this->appManager,
			$this->createMock(LoggerInterface::class)
		);
	}

	public function testIsUrlAllowed(): void {
		$this->config->method('getAppWhitelist')
			->willReturn(['foo', 'bar']);
		$this->config->method('useWhitelist')
			->willReturn(true);
		$this->guestManager->method('isGuest')
			->willReturn(true);
		$this->appManager->method('cleanAppId')
			->willReturnCallback(fn (string $appId) => $appId);
		$user = $this->createStub(IUser::class);

		$this->assertFalse($this->appWhitelist->isUrlAllowed($user, '/apps/news/...'));
		$this->assertTrue($this->appWhitelist->isUrlAllowed($user, '/apps/foo/...'));
	}

	public function testIsUrlAllowedNoWhitelist(): void {
		$this->config->method('getAppWhitelist')
			->willReturn(['foo', 'bar']);
		$this->config->method('useWhitelist')
			->willReturn(false);
		$this->guestManager->method('isGuest')
			->willReturn(true);
		$this->appManager->method('cleanAppId')
			->willReturnCallback(fn (string $appId) => $appId);
		$user = $this->createStub(IUser::class);

		$this->assertTrue($this->appWhitelist->isUrlAllowed($user, '/apps/news/...'));
		$this->assertTrue($this->appWhitelist->isUrlAllowed($user, '/apps/foo/...'));
	}

	/**
	 * getRequestedApp() returns an empty string for urls that carry no
	 * resolvable app id, so it must never be treated as whitelisted.
	 */
	public function testEmptyAppIdIsNotWhitelisted(): void {
		$this->config->method('getAppWhitelist')
			->willReturn(['foo', 'bar']);

		$this->assertFalse($this->appWhitelist->isAppWhitelisted(''));
	}

	/**
	 * Two-factor authentication has to keep working for guests, so an app that
	 * declares a provider in its info.xml is allowed without the administrator
	 * having to whitelist it by hand.
	 */
	public function testTwoFactorProviderAppIsWhitelisted(): void {
		$this->config->method('getAppWhitelist')
			->willReturn(['foo', 'bar']);
		$this->appManager->method('getEnabledApps')
			->willReturn(['twofactor_email']);
		$this->appManager->method('getAppInfo')
			->willReturn(['two-factor-providers' => ['OCA\TwoFactorEmail\Provider\EmailProvider']]);

		$this->assertTrue($this->appWhitelist->isAppWhitelisted('twofactor_email'));
	}

	/**
	 * A provider app the administrator disabled must not be whitelisted, and an
	 * unknown app id must not reach the info.xml lookup at all, so that guesses
	 * cannot make every request resolve an app path on disk.
	 */
	public function testDisabledTwoFactorProviderAppIsNotWhitelisted(): void {
		$this->config->method('getAppWhitelist')
			->willReturn([]);
		$this->appManager->method('getEnabledApps')
			->willReturn([]);
		$this->appManager->expects($this->never())
			->method('getAppInfo');

		$this->assertFalse($this->appWhitelist->isAppWhitelisted('twofactor_email'));
	}

	/**
	 * The runtime lookup only sees providers declared in info.xml, and only
	 * while info.xml is readable, so the provider apps that are whitelisted by
	 * name have to stay whitelisted by name. Both stubs are deliberately empty
	 * here so that only WHITELIST_ALWAYS can satisfy the assertions.
	 */
	public function testTwoFactorAppsAreWhitelistedWithoutTheInfoXmlLookup(): void {
		$this->config->method('getAppWhitelist')
			->willReturn([]);
		$this->appManager->method('getEnabledApps')
			->willReturn([]);
		$this->appManager->method('getAppInfo')
			->willReturn(null);

		foreach ([
			'twofactor_totp',
			'twofactor_webauthn',
			'twofactor_backupcodes',
			'twofactor_nextcloud_notification',
			'twofactor_gateway',
		] as $appId) {
			$this->assertTrue($this->appWhitelist->isAppWhitelisted($appId), $appId);
		}
	}

	public function testAppWithoutTwoFactorProviderIsNotWhitelisted(): void {
		$this->config->method('getAppWhitelist')
			->willReturn([]);
		$this->appManager->method('getEnabledApps')
			->willReturn(['news']);
		$this->appManager->method('getAppInfo')
			->willReturn(['two-factor-providers' => []]);

		$this->assertFalse($this->appWhitelist->isAppWhitelisted('news'));
	}
}
