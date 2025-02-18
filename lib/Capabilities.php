<?php

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use OCP\Capabilities\ICapability;

/**
 * Class Capabilities
 *
 * @package OCA\Guests
 */
class Capabilities implements ICapability {

	/**
	 * @inheritDoc
	 */
	public function getCapabilities() {
		return [
			'guests' => [
				'enabled' => true,
			],
		];
	}
}
