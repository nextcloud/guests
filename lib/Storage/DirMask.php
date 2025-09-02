<?php

/**
 * SPDX-FileCopyrightText: 2017-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2017 ownCloud GmbH
 * SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
 */

namespace OCA\Guests\Storage;

use OC\Files\Storage\Wrapper\PermissionsMask;
use OCP\Files\Cache\ICache;

/**
 * While PermissionMask can mask a whole storage this  can
 * mask a certain directory inside a storage
 *
 * @package OC\Files\Storage\Wrapper
 */
class DirMask extends PermissionsMask {

	/**
	 * @var string the dir that should be masked
	 */
	private $path;
	/**
	 * @var int remember length
	 */
	private $pathLength;

	private $mask;

	/**
	 * @param array $arguments ['storage' => $storage, 'mask' => $mask, 'path' => $path]
	 *
	 * $storage: The storage the permissions mask should be applied on
	 * $mask: The permission bits that should be kept, a combination of the \OCP\Constant::PERMISSION_ constants
	 * $path: The path relative to the storage root that should be masked
	 */
	public function __construct($arguments) {
		parent::__construct($arguments);
		$this->path = rtrim($arguments['path'], '/');
		$this->pathLength = strlen($arguments['path']);
		$this->mask = $arguments['mask'];
	}

	protected function checkPath(string $path): bool {
		return $path === $this->path || substr($path, 0, $this->pathLength + 1) === $this->path . '/';
	}

	public function isUpdatable($path): bool {
		if ($this->checkPath($path)) {
			return parent::isUpdatable($path);
		} else {
			return $this->storage->isUpdatable($path);
		}
	}

	public function isCreatable($path): bool {
		if ($this->checkPath($path)) {
			return parent::isCreatable($path);
		} else {
			return $this->storage->isCreatable($path);
		}
	}

	public function isDeletable($path): bool {
		if ($this->checkPath($path)) {
			return parent::isDeletable($path);
		} else {
			return $this->storage->isDeletable($path);
		}
	}

	public function isSharable($path): bool {
		if ($this->checkPath($path)) {
			return parent::isSharable($path);
		} else {
			return $this->storage->isSharable($path);
		}
	}

	public function getPermissions($path): int {
		if ($this->checkPath($path)) {
			return parent::getPermissions($path);
		} else {
			return $this->storage->getPermissions($path);
		}
	}

	public function rename($source, $target): bool {
		if (!$this->isUpdatable($source)) {
			return false;
		}
		if ($this->file_exists($target)) {
			if ($this->isUpdatable($target)) {
				return $this->storage->rename($source, $target);
			}
		} else {
			$parent = dirname($target);
			if ($parent === '.') {
				$parent = '';
			}
			if ($this->isCreatable($parent)) {
				return $this->storage->rename($source, $target);
			}
		}
		return false;
	}

	public function copy($source, $target): bool {
		if (!$this->isReadable($source)) {
			return false;
		}
		if ($this->file_exists($target)) {
			if ($this->isUpdatable($target)) {
				return $this->storage->copy($source, $target);
			}
		} else {
			$parent = dirname($target);
			if ($parent === '.') {
				$parent = '';
			}
			if ($this->isCreatable($parent)) {
				return $this->storage->copy($source, $target);
			}
		}
		return false;
	}

	public function touch($path, $mtime = null): bool {
		if ($this->checkPath($path)) {
			return parent::touch($path);
		} else {
			return $this->storage->touch($path);
		}
	}

	public function mkdir($path): bool {
		// Always allow creating the path of the dir mask.
		if ($path !== $this->path && $this->checkPath($path)) {
			return parent::mkdir($path);
		} else {
			return $this->storage->mkdir($path);
		}
	}

	public function rmdir($path): bool {
		if ($this->checkPath($path)) {
			return parent::rmdir($path);
		} else {
			return $this->storage->rmdir($path);
		}
	}

	public function unlink($path): bool {
		if ($this->checkPath($path)) {
			return parent::unlink($path);
		} else {
			return $this->storage->unlink($path);
		}
	}

	public function file_put_contents($path, $data): int|float|false {
		if ($this->checkPath($path)) {
			return parent::file_put_contents($path, $data);
		} else {
			return $this->storage->file_put_contents($path, $data);
		}
	}

	public function fopen($path, $mode) {
		if ($this->checkPath($path)) {
			return parent::fopen($path, $mode);
		} else {
			return $this->storage->fopen($path, $mode);
		}
	}

	public function getCache($path = '', $storage = null): ICache {
		if (!$storage) {
			$storage = $this;
		}
		$sourceCache = $this->storage->getCache($path, $storage);
		return new DirMaskCache($sourceCache, $this->mask, function (string $path) {
			return $this->checkPath($path);
		});
	}
}
