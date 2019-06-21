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

use OCA\Guests\AppWhitelist;
use OCA\Guests\Config;
use OCA\Guests\GuestManager;
use OCP\App\IAppManager;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\IUser;
use Test\TestCase;

class AppWhitelistTest extends TestCase {
	/** @var Config|\PHPUnit_Framework_MockObject_MockObject */
	private $config;
	/** @var GuestManager|\PHPUnit_Framework_MockObject_MockObject */
	private $guestManager;
	/** @var IL10N|\PHPUnit_Framework_MockObject_MockObject */
	private $l10n;
	/** @var IAppManager|\PHPUnit_Framework_MockObject_MockObject */
	private $appManager;
	/** @var IURLGenerator|\PHPUnit_Framework_MockObject_MockObject */
	private $urlGenerator;

	/** @var AppWhitelist */
	private $appWhitelist;

	protected function setUp() {
		parent::setUp();

		$this->config = $this->createMock(Config::class);
		$this->guestManager = $this->createMock(GuestManager::class);
		$this->l10n = $this->createMock(IL10N::class);
		$this->appManager = $this->createMock(IAppManager::class);
		$this->urlGenerator = $this->createMock(IURLGenerator::class);
		$this->urlGenerator->method('getBaseUrl')
			->willReturn('');

		$this->appWhitelist = new AppWhitelist(
			$this->config,
			$this->guestManager,
			$this->l10n,
			$this->appManager,
			$this->urlGenerator
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
