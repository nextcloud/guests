<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\QBMapper;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<Transfer>
 */
class TransferMapper extends QBMapper {
	public const TABLE_NAME = 'guests_transfers';

	public function __construct(IDBConnection $db) {
		parent::__construct(
			$db,
			static::TABLE_NAME,
			Transfer::class,
		);
	}

	/**
	 * @throws DoesNotExistException
	 */
	public function getById(int $id): Transfer {
		$qb = $this->db->getQueryBuilder();

		$qb->select('*')
			->from(static::TABLE_NAME)
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id)));

		return $this->findEntity($qb);
	}

	/**
	 * @throws DoesNotExistException
	 */
	public function getBySource(string $userId): Transfer {
		$qb = $this->db->getQueryBuilder();

		$qb->select('*')
			->from(static::TABLE_NAME)
			->where($qb->expr()->eq('source', $qb->createNamedParameter($userId)));

		return $this->findEntity($qb);
	}

	/**
	 * @throws DoesNotExistException
	 */
	public function getByTarget(string $userId): Transfer {
		$qb = $this->db->getQueryBuilder();

		$qb->select('*')
			->from(static::TABLE_NAME)
			->where($qb->expr()->eq('target', $qb->createNamedParameter($userId)));

		return $this->findEntity($qb);
	}
}
