<?php

declare(strict_types=1);

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
	public function getCapabilities(): array {
		return [
			'guests' => [
				'enabled' => true,
			],
		];
	}
}
