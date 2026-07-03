<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Unit\Controller;

use OCA\Guests\AppWhitelist;
use OCA\Guests\Config;
use OCA\Guests\Controller\SettingsController;
use OCP\AppFramework\Services\IAppConfig;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class SettingsControllerTest extends TestCase {
	private IRequest&MockObject $request;
	private Config&MockObject $config;
	private IAppConfig&MockObject $appConfig;
	private AppWhitelist&MockObject $appWhitelist;
	private SettingsController $controller;

	protected function setUp(): void {
		parent::setUp();

		$this->request = $this->createMock(IRequest::class);
		$this->config = $this->createMock(Config::class);
		$this->appConfig = $this->createMock(IAppConfig::class);
		$this->appWhitelist = $this->createMock(AppWhitelist::class);

		$this->controller = new SettingsController(
			$this->request,
			$this->config,
			$this->appConfig,
			$this->appWhitelist,
		);
	}

	private function setConfigWithQuota(string $quota): void {
		$this->controller->setConfig(false, [], false, true, false, [], $quota);
	}

	public function testSetConfigStoresValidQuota(): void {
		$this->config->expects($this->once())
			->method('setGuestQuota')
			->with('500 MB');

		$this->setConfigWithQuota('500 MB');
	}

	public function testSetConfigStoresDefaultSentinel(): void {
		$this->config->expects($this->once())
			->method('setGuestQuota')
			->with('default');

		$this->setConfigWithQuota('default');
	}

	public function testSetConfigStoresUnlimited(): void {
		$this->config->expects($this->once())
			->method('setGuestQuota')
			->with('none');

		$this->setConfigWithQuota('none');
	}

	public function testSetConfigIgnoresQuotaWithoutUnit(): void {
		$this->config->expects($this->never())
			->method('setGuestQuota');

		$this->setConfigWithQuota('500');
	}

	public function testSetConfigIgnoresGarbageQuota(): void {
		$this->config->expects($this->never())
			->method('setGuestQuota');

		$this->setConfigWithQuota('not a size');
	}
}
