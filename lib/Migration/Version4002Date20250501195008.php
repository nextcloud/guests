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
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Add a column for the email so we know the originally invited email as well
 */
class Version4002Date20250501195008 extends SimpleMigrationStep {
	public function __construct(
		protected IDBConnection $db,
	) {
	}

	/**
	 * @param IOutput $output
	 * @param Closure(): ISchemaWrapper $schemaClosure
	 * @param array $options
	 * @return null|ISchemaWrapper
	 */
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('guests_users');
		if ($table->hasColumn('email')) {
			return null;
		}

		$table->addColumn('email', 'string', [
			'notnull' => false,
			'length' => 64,
			'default' => '',
		]);
		return $schema;
	}

	/**
	 * @param IOutput $output
	 * @param Closure(): ISchemaWrapper $schemaClosure
	 * @param array $options
	 */
	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		$query = $this->db->getQueryBuilder();
		$query->update('guests_users')
			->set('email', 'uid_lower');
		$query->executeStatement();
	}
}
