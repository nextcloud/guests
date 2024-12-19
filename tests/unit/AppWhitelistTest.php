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

	/** @var AppWhitelist */
	private $appWhitelist;

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

	public function testIsUrlAllowed() {
		$this->config->method('getAppWhitelist')
			->willReturn(['foo', 'bar']);
		$this->config->method('useWhitelist')
			->willReturn(true);
		$this->guestManager->method('isGuest')
			->willReturn(true);
		$user = $this->createMock(IUser::class);

		$this->assertFalse($this->appWhitelist->isUrlAllowed($user, '/apps/news/...'));
		$this->assertTrue($this->appWhitelist->isUrlAllowed($user, '/apps/foo/...'));
	}

	public function testIsUrlAllowedNoWhitelist() {
		$this->config->method('getAppWhitelist')
			->willReturn(['foo', 'bar']);
		$this->config->method('useWhitelist')
			->willReturn(false);
		$this->guestManager->method('isGuest')
			->willReturn(true);
		$user = $this->createMock(IUser::class);

		$this->assertTrue($this->appWhitelist->isUrlAllowed($user, '/apps/news/...'));
		$this->assertTrue($this->appWhitelist->isUrlAllowed($user, '/apps/foo/...'));
	}
}
