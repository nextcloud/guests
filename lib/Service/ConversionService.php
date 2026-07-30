<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Service;

use OCA\Guests\AppInfo\Application;
use OCA\Guests\ConfigLexicon;
use OCP\Config\IUserConfig;
use OCP\IDBConnection;
use OCP\IUser;

/**
 * Converts a regular account into a guest account by moving it from the core
 * "Database" user backend into the guests backend.
 *
 * The user ID is preserved, so all existing account data, home storage and
 * mounts stay valid, and the password hash is carried over unchanged. The
 * caller is responsible for checking eligibility (database backend, never
 * logged in, not already a guest).
 */
class ConversionService {
	public function __construct(
		private readonly IDBConnection $connection,
		private readonly IUserConfig $userConfig,
	) {
	}

	public function convertToGuest(IUser $user, IUser $createdBy): void {
		$uid = $user->getUID();
		$uidLower = mb_strtolower($uid);
		$displayName = $user->getDisplayName();
		$email = $user->getSystemEMailAddress() ?? '';

		// Carry over the existing password hash from the database backend.
		$query = $this->connection->getQueryBuilder();
		$query->select('password')
			->from('users')
			->where($query->expr()->eq('uid_lower', $query->createNamedParameter($uidLower)));
		$result = $query->executeQuery();
		$passwordHash = $result->fetchOne();
		$result->closeCursor();
		if ($passwordHash === false) {
			throw new \RuntimeException('No password hash found for "' . $uid . '"');
		}

		// Move the account between backends in a single transaction. The user ID
		// is unchanged, so all data keyed by it (account, home storage, mounts,
		// shares) stays valid.
		$this->connection->beginTransaction();
		try {
			$insert = $this->connection->getQueryBuilder();
			$insert->insert('guests_users')
				->values([
					'uid' => $insert->createNamedParameter($uid),
					'uid_lower' => $insert->createNamedParameter($uidLower),
					'displayname' => $insert->createNamedParameter($displayName),
					'password' => $insert->createNamedParameter($passwordHash),
					'email' => $insert->createNamedParameter($email),
				]);
			$insert->executeStatement();

			$delete = $this->connection->getQueryBuilder();
			$delete->delete('users')
				->where($delete->expr()->eq('uid_lower', $delete->createNamedParameter($uidLower)));
			$delete->executeStatement();

			$this->connection->commit();
		} catch (\Throwable $e) {
			$this->connection->rollBack();
			throw $e;
		}

		$this->userConfig->setValueString($uid, Application::APP_ID, ConfigLexicon::USER_CREATED_BY, $createdBy->getUID());
	}
}
