<?php

declare(strict_types=1);
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

namespace OCA\Guests;

use OCP\IAppConfig;

class AppConfigOverwrite implements IAppConfig {
	private $inner;
	private $overWrite;

	public function __construct(
		IAppConfig $inner,
		array $overWrite
	) {
		$this->inner = $inner;
		$this->overWrite = $overWrite;
	}

	public function hasKey($app, $key) {
		return $this->inner->hasKey($app, $key);
	}

	public function getValues($app, $key) {
		return $this->inner->getValues($app, $key);
	}

	public function getFilteredValues($app) {
		return $this->inner->getFilteredValues($app);
	}

	public function getApps() {
		return $this->inner->getApps();
	}

	public function getValue($app, $key, $default = null) {
		if (isset($this->overWrite[$app]) && isset($this->overWrite[$app][$key])) {
			return $this->overWrite[$app][$key];
		} else {
			return $this->inner->getValue($app, $key, $default);
		}
	}

	public function deleteKey($app, $key) {
		return $this->inner->deleteKey($app, $key);
	}

	public function getKeys($app) {
		return $this->inner->getKeys($app);
	}

	public function setValue($app, $key, $value) {
		return $this->inner->setValue($app, $key, $value);
	}

	public function deleteApp($app) {
		return $this->inner->deleteApp($app);
	}
}
