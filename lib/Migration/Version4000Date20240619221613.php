<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Migration;

use Closure;
use OCA\Guests\Db\TransferMapper;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version4000Date20240619221613 extends SimpleMigrationStep {
	/**
	 * @param Closure(): ISchemaWrapper $schemaClosure
	 */
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if ($schema->hasTable(TransferMapper::TABLE_NAME)) {
			return null;
		}

		$table = $schema->createTable(TransferMapper::TABLE_NAME);
		$table->addColumn('id', Types::BIGINT, [
			'autoincrement' => true,
			'notnull' => true,
			'length' => 20,
			'unsigned' => true,
		]);
		$table->addColumn('author', Types::STRING, [
			'notnull' => true,
			'length' => 64,
		]);
		$table->addColumn('source', Types::STRING, [
			'notnull' => true,
			'length' => 64,
		]);
		$table->addColumn('target', Types::STRING, [
			'notnull' => true,
			'length' => 64,
		]);
		$table->addColumn('status', Types::STRING, [
			'notnull' => true,
		]);
		$table->setPrimaryKey(['id']);

		return $schema;
	}
}
