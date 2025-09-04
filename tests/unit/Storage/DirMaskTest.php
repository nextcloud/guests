<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Unit\Storage;

use OC\Files\Storage\Temporary;
use OCA\Guests\Storage\DirMask;
use OCP\Constants;
use Test\TestCase;

/**
 * @group DB
 */
class DirMaskTest extends TestCase {
	public function testReadonlyDir() {
		$storage = new Temporary([]);

		$storage->mkdir('readonly');

		$mask = new DirMask([
			'path' => 'readonly',
			'storage' => $storage,
			'mask' => Constants::PERMISSION_READ,
		]);

		$this->assertEquals($storage->getPermissions(''), $mask->getPermissions(''));
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
