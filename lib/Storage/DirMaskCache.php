<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Storage;

use OC\Files\Cache\Wrapper\CachePermissionsMask;

class DirMaskCache extends CachePermissionsMask {
	private $checkPath;

	/**
	 * @param \OCP\Files\Cache\ICache $cache
	 * @param int $mask
	 */
	public function __construct($cache, $mask, callable $checkPath) {
		parent::__construct($cache, $mask);
		$this->checkPath = $checkPath;
	}

	/**
	 * @psalm-suppress MethodSignatureMustProvideReturnType
	 */
	protected function formatCacheEntry($entry) {
		$checkPath = $this->checkPath;
		if ($checkPath($entry['path'])) {
			return parent::formatCacheEntry($entry);
		}
		return $entry;
	}
}
