<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use OC\AppConfig;

class AppConfigOverwrite extends AppConfig {

	/** @var string[][] */
	private $overWrite = [];

	public function setOverwrite(array $overwrite): void {
		$this->overWrite = $overwrite;
	}

	public function getValue(string $app, string $key, ?string $default = null): string {
		if (isset($this->overWrite[$app]) && isset($this->overWrite[$app][$key])) {
			return $this->overWrite[$app][$key];
		}

		return parent::getValue($app, $key, $default);
	}
}
