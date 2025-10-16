<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use InvalidArgumentException;
use OCP\Cache\CappedMemoryCache;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IDBConnection;
use OCP\Security\Events\ValidatePasswordPolicyEvent;
use OCP\Security\IHasher;
use OCP\User\Backend\ABackend;
use OCP\User\Backend\ICheckPasswordBackend;
use OCP\User\Backend\ICountUsersBackend;
use OCP\User\Backend\IGetDisplayNameBackend;
use OCP\User\Backend\IGetHomeBackend;
use OCP\User\Backend\IGetRealUIDBackend;
use OCP\User\Backend\IPasswordHashBackend;
use OCP\User\Backend\ISetDisplayNameBackend;
use OCP\User\Backend\ISetPasswordBackend;

/**
 * Class for user management in a SQL Database (e.g. MySQL, SQLite)
 */
class UserBackend extends ABackend implements
	ISetPasswordBackend,
	ISetDisplayNameBackend,
	IGetDisplayNameBackend,
	ICheckPasswordBackend,
	IGetHomeBackend,
	ICountUsersBackend,
	IGetRealUIDBackend,
	IPasswordHashBackend {
	/** @var CappedMemoryCache */
	private $cache;
	/** @var bool */
	private $allowListing = true;

	public function __construct(
		private IEventDispatcher $eventDispatcher,
		private IDBConnection $dbConn,
		private Config $config,
		private IHasher $hasher,
	) {
		$this->cache = new CappedMemoryCache();
	}

	public function setAllowListing(bool $allow): void {
		$this->allowListing = $allow;
	}

	/**
	 * Create a new user
	 *
	 * @param string $uid The username of the user to create
	 * @param string $password The password of the new user
	 * @return bool
	 *
	 * Creates a new user. Basic checking of username is done in OC_User
	 * itself, not in its subclasses.
	 */
	public function createUser(string $uid, string $password): bool {
		if (!$this->userExists($uid)) {
			$this->eventDispatcher->dispatchTyped(new ValidatePasswordPolicyEvent($password));

			$qb = $this->dbConn->getQueryBuilder();
			$qb->insert('guests_users')
				->values([
					'uid' => $qb->createNamedParameter($uid),
					'password' => $qb->createNamedParameter($this->hasher->hash($password)),
					'uid_lower' => $qb->createNamedParameter(mb_strtolower($uid)),
				]);

			$result = $qb->executeStatement();

			// Clear cache
			unset($this->cache[$uid]);

			return $result ? true : false;
		}

		return false;
	}

	/**
	 * delete a user
	 *
	 * @param string $uid The username of the user to delete
	 * @return bool
	 *
	 * Deletes a user
	 */
	public function deleteUser($uid): bool {
		// Delete user-group-relation
		$query = $this->dbConn->getQueryBuilder();
		$query->delete('guests_users')
			->where($query->expr()->eq('uid_lower', $query->createNamedParameter(mb_strtolower($uid))));
		$result = $query->executeStatement();

		if (isset($this->cache[$uid])) {
			unset($this->cache[$uid]);
		}

		return $result ? true : false;
	}

	/**
	 * Set password
	 *
	 * @param string $uid The username
	 * @param string $password The new password
	 * @return bool
	 *
	 * Change the password of a user
	 */
	public function setPassword(string $uid, string $password): bool {
		if ($this->userExists($uid)) {
			$this->eventDispatcher->dispatchTyped(new ValidatePasswordPolicyEvent($password));

			$hashedPassword = $this->hasher->hash($password);

			$query = $this->dbConn->getQueryBuilder();
			$query->update('guests_users')
				->set('password', $query->createNamedParameter($hashedPassword))
				->where($query->expr()->eq('uid_lower', $query->createNamedParameter(mb_strtolower($uid))));
			$result = $query->executeStatement();

			return $result ? true : false;
		}

		return false;
	}

	public function getPasswordHash(string $userId): ?string {
		if (!$this->userExists($userId)) {
			return null;
		}
		$qb = $this->dbConn->getQueryBuilder();
		$qb->select('password')
			->from('guests_users')
			->where($qb->expr()->eq('uid_lower', $qb->createNamedParameter(mb_strtolower($userId))));
		/** @var false|string $hash */
		$hash = $qb->executeQuery()->fetchOne();
		if ($hash === false) {
			return null;
		}
		return $hash;
	}

	public function setPasswordHash(string $userId, string $passwordHash): bool {
		if (!$this->hasher->validate($passwordHash)) {
			throw new InvalidArgumentException();
		}
		$qb = $this->dbConn->getQueryBuilder();
		$qb->update('guests_users')
			->set('password', $qb->createNamedParameter($passwordHash))
			->where($qb->expr()->eq('uid_lower', $qb->createNamedParameter(mb_strtolower($userId))));
		$result = $qb->executeStatement();
		return ($result !== 0);
	}

	/**
	 * Set display name
	 *
	 * @param string $uid The username
	 * @param string $displayName The new display name
	 * @return bool
	 *
	 * Change the display name of a user
	 */
	public function setDisplayName(string $uid, string $displayName): bool {
		if ($this->userExists($uid)) {
			$query = $this->dbConn->getQueryBuilder();
			$query->update('guests_users')
				->set('displayname', $query->createNamedParameter($displayName))
				->where($query->expr()->eq('uid_lower', $query->createNamedParameter(mb_strtolower($uid))));
			$query->executeStatement();

			$this->cache[$uid]['displayname'] = $displayName;

			return true;
		}

		return false;
	}

	/**
	 * get display name of the user
	 *
	 * @param string $uid user ID of the user
	 * @return string display name
	 */
	public function getDisplayName($uid): string {
		$this->loadUser($uid);
		return empty($this->cache[$uid]['displayname']) ? $uid : $this->cache[$uid]['displayname'];
	}

	/**
	 * Get a list of all display names and user ids.
	 *
	 * @param string $search
	 * @param int|null $limit
	 * @param int|null $offset
	 * @return array an array of all displayNames (value) and the corresponding uids (key)
	 */
	public function getDisplayNames($search = '', $limit = null, $offset = null): array {
		if (!$this->allowListing) {
			return [];
		} else {
			$query = $this->dbConn->getQueryBuilder();

			if ($search === '') {
				$query->select('uid', 'displayname')
					->from('guests_users', 'u')
					->orderBy('uid_lower', 'ASC')
					->setMaxResults($limit)
					->setFirstResult($offset);
			} else {
				$query->select('uid', 'displayname')
					->from('guests_users', 'u')
					->leftJoin('u', 'preferences', 'p', $query->expr()->andX(
						$query->expr()->eq('userid', 'uid'),
						$query->expr()->eq('appid', $query->expr()->literal('settings')),
						$query->expr()->eq('configkey', $query->expr()->literal('email')))
					)
					// sqlite doesn't like re-using a single named parameter here
					->where($query->expr()->iLike('uid', $query->createPositionalParameter('%' . $this->dbConn->escapeLikeParameter($search) . '%')))
					->orWhere($query->expr()->iLike('displayname', $query->createPositionalParameter('%' . $this->dbConn->escapeLikeParameter($search) . '%')))
					->orWhere($query->expr()->iLike('configvalue', $query->createPositionalParameter('%' . $this->dbConn->escapeLikeParameter($search) . '%')))
					->orderBy($query->func()->lower('displayname'), 'ASC')
					->orderBy('uid_lower', 'ASC')
					->setMaxResults($limit)
					->setFirstResult($offset);
			}

			$result = $query->executeQuery();
			$displayNames = [];
			while ($row = $result->fetch()) {
				$displayNames[(string)$row['uid']] = (string)$row['displayname'];
			}

			return $displayNames;
		}
	}

	/**
	 * Check if the password is correct
	 *
	 * @return string|false
	 *
	 * Check if the password is correct without logging in the user
	 * returns the user id or false
	 */
	public function checkPassword(string $loginName, string $password) {
		if (strpos($loginName, '@') === false) {
			return false;
		}

		$qb = $this->dbConn->getQueryBuilder();
		$qb->select('uid', 'password')
			->from('guests_users')
			->where(
				$qb->expr()->eq(
					'uid_lower', $qb->createNamedParameter(mb_strtolower($loginName))
				)
			);
		$result = $qb->executeQuery();
		$row = $result->fetch();
		$result->closeCursor();

		if ($row) {
			$storedHash = $row['password'];
			$newHash = '';
			if ($this->hasher->verify($password, $storedHash, $newHash)) {
				if (!empty($newHash)) {
					$this->setPassword($loginName, $password);
				}
				return (string)$row['uid'];
			}
		}

		return false;
	}

	/**
	 * Load an user in the cache
	 *
	 * @param string $uid the username
	 * @return bool true if user was found, false otherwise
	 */
	private function loadUser($uid): bool {
		// guests $uid could be NULL or ''
		// or is not an email anyway
		if (strpos($uid, '@') === false) {
			$this->cache[$uid] = false;
			return false;
		}

		if (!isset($this->cache[$uid])) {
			$qb = $this->dbConn->getQueryBuilder();
			$qb->select('uid', 'displayname')
				->from('guests_users')
				->where(
					$qb->expr()->eq(
						'uid_lower', $qb->createNamedParameter(mb_strtolower($uid))
					)
				);
			$result = $qb->executeQuery();
			$row = $result->fetch();
			$result->closeCursor();

			$this->cache[$uid] = false;

			// "uid" is primary key, so there can only be a single result
			if ($row !== false) {
				$this->cache[$uid] = [];
				$this->cache[$uid]['uid'] = (string)$row['uid'];
				$this->cache[$uid]['displayname'] = (string)$row['displayname'];
			} else {
				return false;
			}
		}

		return true;
	}

	/**
	 * Get a list of all users
	 *
	 * @param string $search
	 * @param null|int $limit
	 * @param null|int $offset
	 * @return string[] an array of all uids
	 */
	public function getUsers($search = '', $limit = null, $offset = null): array {
		$users = $this->getDisplayNames($search, $limit, $offset);
		$userIds = array_map(function ($uid) {
			return (string)$uid;
		}, array_keys($users));
		sort($userIds, SORT_STRING | SORT_FLAG_CASE);
		return $userIds;
	}

	/**
	 * check if a user exists
	 *
	 * @param string $uid the username
	 * @return bool
	 */
	public function userExists($uid): bool {
		$this->loadUser($uid);
		return $this->cache[$uid] !== false;
	}

	/**
	 * get the user's home directory
	 *
	 * @param string $uid the username
	 * @return string|false
	 */
	public function getHome(string $uid) {
		if ($this->userExists($uid)) {
			return $this->config->getHome($uid);
		}

		return false;
	}

	/**
	 * @return bool
	 */
	public function hasUserListings(): bool {
		return true;
	}

	/**
	 * counts the users in the database
	 *
	 * @return int|false
	 */
	public function countUsers() {
		$query = $this->dbConn->getQueryBuilder();
		$query->select($query->func()->count('uid'))
			->from('guests_users');
		$result = $query->executeQuery();

		return $result->fetchColumn();
	}

	/**
	 * returns the username for the given login name in the correct casing
	 *
	 * @param string $loginName
	 * @return string|false
	 */
	public function loginName2UserName($loginName) {
		if ($this->userExists($loginName)) {
			return $this->cache[$loginName]['uid'];
		}

		return false;
	}

	/**
	 * Backend name to be shown in user management
	 *
	 * @return string the name of the backend to be shown
	 */
	public function getBackendName(): string {
		return 'Guests';
	}

	public function getRealUID(string $uid): string {
		if (strpos($uid, '@') === false) {
			throw new \RuntimeException($uid . ' does not exist');
		}

		if (!isset($this->cache[$uid]['uid'])) {
			$this->loadUser($uid);
		}

		if (!isset($this->cache[$uid]['uid'])) {
			throw new \RuntimeException($uid . ' does not exist');
		}

		return $this->cache[$uid]['uid'];
	}
}
