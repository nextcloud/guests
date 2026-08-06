<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Unit;

use OCA\Guests\AppConfigOverwrite;
use OCP\Server;
use Test\TestCase;

/**
 * @group DB
 */
class AppConfigOverwriteTest extends TestCase {
	private const KEY = 'shareapi_only_share_with_group_members';

	private ?AppConfigOverwrite $appConfig = null;

	protected function setUp(): void {
		parent::setUp();

		$this->appConfig = Server::get(AppConfigOverwrite::class);
		$this->appConfig->setOverwrite(['core' => [self::KEY => 'yes']]);
	}

	protected function tearDown(): void {
		$this->appConfig->setOverwrite([]);

		parent::tearDown();
	}

	/**
	 * The server reads the overwritten values through several getters:
	 * IConfig::getAppValue() ends up in getValue(), the share recipient
	 * autocompletion uses getValueString() and OCA\Guests\Config uses
	 * getValueBool(). All of them have to see the overwrite.
	 */
	public function testOverwriteIsAppliedToAllGetters(): void {
		$this->assertSame('yes', $this->appConfig->getValue('core', self::KEY, 'no'));
		$this->assertSame('yes', $this->appConfig->getValueString('core', self::KEY, 'no'));
		$this->assertTrue($this->appConfig->getValueBool('core', self::KEY));
	}

	public function testWithoutOverwriteTheStoredValueIsUsed(): void {
		$this->appConfig->setOverwrite([]);

		$this->assertSame('no', $this->appConfig->getValue('core', self::KEY, 'no'));
		$this->assertSame('no', $this->appConfig->getValueString('core', self::KEY, 'no'));
		$this->assertFalse($this->appConfig->getValueBool('core', self::KEY));
	}
}
