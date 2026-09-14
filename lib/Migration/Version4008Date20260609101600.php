<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\Attributes\AddIndex;
use OCP\Migration\Attributes\IndexType;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

#[AddIndex(table: 'guests_users', type: IndexType::INDEX, description: 'Add missing index')]
class Version4008Date20260609101600 extends SimpleMigrationStep {
	private bool $columnAdded = false;

	public function __construct(
		protected IDBConnection $db,
	) {
	}

	/**
	 * @param Closure(): ISchemaWrapper $schemaClosure
	 */
	#[\Override]
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('guests_users');
		$changed = false;

		if (!$table->hasColumn('email')) {
			$table->addColumn('email', 'string', [
				'notnull' => false,
				'length' => 64,
				'default' => '',
			]);
			$this->columnAdded = true;
			$changed = true;
		}

		if (!$table->hasIndex('guests_users_email')) {
			$table->addIndex(['email'], 'guests_users_email');
			$changed = true;
		}

		return $changed ? $schema : null;
	}

	/**
	 * @param Closure(): ISchemaWrapper $schemaClosure
	 */
	#[\Override]
	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		if (!$this->columnAdded) {
			return;
		}

		$query = $this->db->getQueryBuilder();
		$query->update('guests_users')
			->set('email', 'uid_lower');
		$query->executeStatement();
	}
}
