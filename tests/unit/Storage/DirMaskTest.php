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

namespace OCA\Guests\Test\Unit\Storage;

use OC\Files\Storage\Temporary;
use OCA\Guests\Storage\DirMask;
use OCP\Constants;
use Test\TestCase;

class DirMaskTest extends TestCase {
	public function testReadonlyDir() {
		$storage = new Temporary([]);

		$storage->mkdir('readonly');

		$mask = new DirMask([
			'path' => 'readonly',
			'storage' => $storage,
			'mask' => Constants::PERMISSION_READ,
		]);

		$this->assertEquals(Constants::PERMISSION_ALL - Constants::PERMISSION_DELETE, $mask->getPermissions(''));
		$this->assertEquals(Constants::PERMISSION_READ, $mask->getPermissions('readonly'));

		$this->assertFalse($mask->isCreatable('readonly'));
		$this->assertFalse($mask->isDeletable('readonly'));
		$this->assertFalse($mask->isUpdatable('readonly'));
		$this->assertFalse($mask->isSharable('readonly'));
		$this->assertTrue($mask->isReadable('readonly'));

		$this->assertTrue($storage->isCreatable('readonly'));
		$this->assertTrue($storage->isDeletable('readonly'));
		$this->assertTrue($storage->isUpdatable('readonly'));
		$this->assertTrue($storage->isSharable('readonly'));
		$this->assertTrue($mask->isReadable('readonly'));

		$this->assertFalse($mask->file_put_contents('readonly/foo.txt', 'foo'));
		$this->assertEquals(3, $storage->file_put_contents('readonly/foo.txt', 'foo'));

		$storage->file_put_contents('bar.txt', 'bar');

		$this->assertFalse($mask->copy('bar.txt', 'readonly/bar.txt'));
		$this->assertFalse($mask->rename('bar.txt', 'readonly/bar.txt'));

		$this->assertFalse($mask->rename('readonly/foo.txt', 'foo.txt'));

		$this->assertTrue($mask->copy('readonly/foo.txt', 'foo.txt'));
	}
}
