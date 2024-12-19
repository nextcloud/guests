<?php

/**
 * SPDX-FileCopyrightText: 2017-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2017 ownCloud GmbH
 * SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
 */

namespace OCA\Guests\Storage;

/**
 * read only mask for home storages
 */
class ReadOnlyJail extends DirMask {

	/**
	 * @param $path
	 * @return bool
	 */
	protected function checkPath($path): bool {
		if ($path === 'files') {
			return true;
		}

		return parent::checkPath($path);
	}


	/**
	 * @param string $path
	 * @return bool
	 */
	public function isDeletable($path): bool {
		if (pathinfo($path, PATHINFO_EXTENSION) === 'part') {
			return true;
		}

		return $this->getWrapperStorage()->isDeletable($path);
	}

	/**
	 * @param string $path
	 * @return bool
	 */
	public function mkdir($path): bool {
		// Lift restrictions if files dir is created (at first login)
		if ($path === 'files') {
			return $this->storage->mkdir($path);
		} else {
			return parent::mkdir($path);
		}
	}
}
