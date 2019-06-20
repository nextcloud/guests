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

use OC\AppConfig;
use OCA\Activity\Tests\TestCase;
use OCA\Guests\AppConfigOverwrite;
use OCP\IAppConfig;

class AppConfigOverwriteTest extends TestCase {
	private function getBaseConfig(array $values): IAppConfig {
		$baseConfig = $this->getMockBuilder(AppConfig::class)
			->disableOriginalConstructor()
			->getMock();

		$baseConfig->method('getValue')
			->willReturnCallback(function ($app, $key, $default) use ($values) {
				if (isset($values[$app]) && isset($values[$app][$key])) {
					return $values[$app][$key];
				} else {
					return $default;
				}
			});

		return $baseConfig;
	}

	public function testOverwrite() {
		$base = $this->getBaseConfig(['test' => [
			'foo' => 'bar',
			'asd' => 'foo',
		]]);

		$config = new AppConfigOverwrite($base, [
			'test' => [
				'foo' => 'nobar',
			],
		]);

		$this->assertEquals('nobar', $config->getValue('test', 'foo'));
		$this->assertEquals('foo', $config->getValue('test', 'asd'));
	}
}
