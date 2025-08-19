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


	/**
	 * @param $app
	 * @param $key
	 * @param $default
	 * @return string
	 */
	public function getValue($app, $key, $default = '') {
		if (isset($this->overWrite[$app]) && isset($this->overWrite[$app][$key])) {
			return $this->overWrite[$app][$key];
		}

		return parent::getValue($app, $key, $default);
	}
}
