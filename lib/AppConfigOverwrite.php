<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use OC\AppConfig;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\Security\ICrypto;
use Psr\Log\LoggerInterface;

class AppConfigOverwrite extends AppConfig {

	/** @var string[][] */
	private $overWrite;

	public function __construct(
		IDBConnection $connection,
		IConfig $config,
		LoggerInterface $logger,
		ICrypto $crypto,
		array $overWrite,
	) {
		parent::__construct($connection, $config, $logger, $crypto);
		$this->overWrite = $overWrite;
	}

	/**
	 * @psalm-suppress MethodSignatureMustProvideReturnType
	 */
	public function getValue($app, $key, $default = null) {
		if (isset($this->overWrite[$app]) && isset($this->overWrite[$app][$key])) {
			return $this->overWrite[$app][$key];
		}

		return parent::getValue($app, $key, $default);
	}
}
