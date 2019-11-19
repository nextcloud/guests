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


use OCA\Guests\Config;
use OCA\Guests\UserBackend;
use PHPUnit\Framework\MockObject\MockObject;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Test\TestCase;

/**
 * @group DB
 */
class UserBackendTest extends TestCase {
	/** @var Config|MockObject */
	private $config;

	/** @var UserBackend */
	private $backend;

	private function clearGuests() {
		$query = \OC::$server->getDatabaseConnection()->getQueryBuilder();

		$query->delete('guests_users')->execute();
	}

	protected function setUp() {
		parent::setUp();

		$this->clearGuests();

		$this->config = $this->createMock(Config::class);

		$this->backend = new UserBackend(
			$this->createMock(EventDispatcherInterface::class),
			\OC::$server->getDatabaseConnection(),
			$this->config,
			\OC::$server->getHasher()
		);
	}

	protected function tearDown() {
		$this->clearGuests();

		return parent::tearDown();
	}

	public function testCreate() {
		$this->backend->createUser('foo', 'bar');
		$this->assertTrue($this->backend->userExists('foo'));

		$this->assertEquals(['foo'], $this->backend->getUsers());
	}

	public function testNoListing() {
		$this->backend->createUser('foo', 'bar');
		$this->assertTrue($this->backend->userExists('foo'));

		$this->assertEquals(['foo'], $this->backend->getUsers());

		$this->backend->setAllowListing(false);

		$this->assertEquals([], $this->backend->getUsers());
	}
}
