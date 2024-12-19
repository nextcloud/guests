<?php

/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Migration;

use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version1Date20180615130406 extends SimpleMigrationStep {
	public function name(): string {
		return 'Add table for guest users';
	}

	public function description(): string {
		return 'Adds table to keep track of guest users';
	}

	public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('guests_users')) {
			$table = $schema->createTable('guests_users');
			$table->addColumn('uid', 'string', [
				'notnull' => true,
				'length' => 64,
				'default' => '',
			]);
			$table->addColumn('uid_lower', 'string', [
				'notnull' => true,
				'length' => 64,
				'default' => '',
			]);
			$table->addColumn('displayname', 'string', [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('password', 'string', [
				'notnull' => true,
				'length' => 255,
				'default' => '',
			]);
			$table->setPrimaryKey(['uid']);
			$table->addIndex(['uid_lower'], 'guests_user_uid_lower');
		}

		return $schema;
	}
}
