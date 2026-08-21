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
	private array $overWrite = [];

	/**
	 * @param string[][] $overwrite
	 */
	public function setOverwrite(array $overwrite): void {
		$this->overWrite = $overwrite;
	}

	#[\Override]
	public function getValue($app, $key, $default = '') {
		if (isset($this->overWrite[$app]) && isset($this->overWrite[$app][$key])) {
			return $this->overWrite[$app][$key];
		}

		return parent::getValue($app, $key, $default);
	}

	#[\Override]
	public function getValueString(string $app, string $key, string $default = '', bool $lazy = false): string {
		if (isset($this->overWrite[$app]) && isset($this->overWrite[$app][$key])) {
			return $this->overWrite[$app][$key];
		}

		return parent::getValueString($app, $key, $default, $lazy);
	}

	#[\Override]
	public function getValueBool(string $app, string $key, bool $default = false, bool $lazy = false): bool {
		if (isset($this->overWrite[$app]) && isset($this->overWrite[$app][$key])) {
			return in_array(strtolower($this->overWrite[$app][$key]), ['1', 'true', 'yes', 'on'], true);
		}

		return parent::getValueBool($app, $key, $default, $lazy);
	}

	#[\Override]
	public function getValueInt(string $app, string $key, int $default = 0, bool $lazy = false): int {
		if (isset($this->overWrite[$app]) && isset($this->overWrite[$app][$key])) {
			return (int)$this->overWrite[$app][$key];
		}

		return parent::getValueInt($app, $key, $default, $lazy);
	}

	#[\Override]
	public function getValueFloat(string $app, string $key, float $default = 0, bool $lazy = false): float {
		if (isset($this->overWrite[$app]) && isset($this->overWrite[$app][$key])) {
			return (float)$this->overWrite[$app][$key];
		}

		return parent::getValueFloat($app, $key, $default, $lazy);
	}

	#[\Override]
	public function getValueArray(string $app, string $key, array $default = [], bool $lazy = false): array {
		if (isset($this->overWrite[$app]) && isset($this->overWrite[$app][$key])) {
			$value = json_decode($this->overWrite[$app][$key], true);
			return is_array($value) ? $value : $default;
		}

		return parent::getValueArray($app, $key, $default, $lazy);
	}
}
