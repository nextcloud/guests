<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Guests\Tests;

use OCA\Guests\Capabilities;
use Test\TestCase;

class CapabilitiesTest extends TestCase {
	public function testCapabilities(): void {
		$capabilities = new Capabilities();

		$this->assertEquals([
			'guests' => [
				'enabled' => true,
			]
		], $capabilities->getCapabilities());
	}
}
