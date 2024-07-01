<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Db;

use OCP\AppFramework\Db\Entity;

/**
 * @method void setAuthor(string $userId)
 * @method string getAuthor()
 *
 * @method void setSource(string $userId)
 * @method string getSource()
 *
 * @method void setTarget(string $userId)
 * @method string getTarget()
 *
 * @method void setStatus(string $status)
 * @method string getStatus()
 */
class Transfer extends Entity {
	public const STATUS_WAITING = 'waiting';
	public const STATUS_STARTED = 'started';

	/** @var string */
	protected $author;
	/** @var string */
	protected $source;
	/** @var string */
	protected $target;
	/** @var string */
	protected $status;

	public function __construct() {
		$this->addType('author', 'string');
		$this->addType('source', 'string');
		$this->addType('target', 'string');
		$this->addType('status', 'string');
	}
}
