<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2017 Robin Appelman <robin@icewind.nl>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Guests;

use OC\Cache\CappedMemoryCache;
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
	IGetRealUIDBackend {
	private $cache;
	private $eventDispatcher;
	private $dbConn;
	private $config;
	private $hasher;
	private $allowListing = true;

	public function __construct(
		IEventDispatcher $eventDispatcher,
		IDBConnection $connection,
		Config $config,
		IHasher $hasher
	) {
		$this->cache = new CappedMemoryCache();
		$this->eventDispatcher = $eventDispatcher;
		$this->dbConn = $connection;
		$this->config = $config;
		$this->hasher = $hasher;
	}

	public function setAllowListing(bool $allow) {
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

			$result = $qb->execute();

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
		$result = $query->execute();

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
			$result = $query->execute();

			return $result ? true : false;
		}

		return false;
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
			$query->execute();

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
		$uid = (string)$uid;
		$this->loadUser($uid);
		return empty($this->cache[$uid]['displayname']) ? $uid : $this->cache[$uid]['displayname'];
	}

	/**
	 * Get a list of all display names and user ids.
	 *
	 * @param string $search
	 * @param string|null $limit
	 * @param string|null $offset
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

			$result = $query->execute();
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
	 * @param string $uid The username
	 * @param string $password The password
	 * @return string
	 *
	 * Check if the password is correct without logging in the user
	 * returns the user id or false
	 */
	public function checkPassword(string $uid, string $password): string {
		$qb = $this->dbConn->getQueryBuilder();
		$qb->select('uid', 'password')
			->from('guests_users')
			->where(
				$qb->expr()->eq(
					'uid_lower', $qb->createNamedParameter(mb_strtolower($uid))
				)
			);
		$result = $qb->execute();
		$row = $result->fetch();
		$result->closeCursor();

		if ($row) {
			$storedHash = $row['password'];
			$newHash = '';
			if ($this->hasher->verify($password, $storedHash, $newHash)) {
				if (!empty($newHash)) {
					$this->setPassword($uid, $password);
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
		$uid = (string)$uid;
		if (!isset($this->cache[$uid])) {
			//guests $uid could be NULL or ''
			if ($uid === '') {
				$this->cache[$uid] = false;
				return true;
			}

			$qb = $this->dbConn->getQueryBuilder();
			$qb->select('uid', 'displayname')
				->from('guests_users')
				->where(
					$qb->expr()->eq(
						'uid_lower', $qb->createNamedParameter(mb_strtolower($uid))
					)
				);
			$result = $qb->execute();
			$row = $result->fetch();
			$result->closeCursor();

			$this->cache[$uid] = false;

			// "uid" is primary key, so there can only be a single result
			if ($row !== false) {
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
	public function hasUserListings() {
		return true;
	}

	/**
	 * counts the users in the database
	 *
	 * @return int|bool
	 */
	public function countUsers() {
		$query = $this->dbConn->getQueryBuilder();
		$query->select($query->func()->count('uid'))
			->from('guests_users');
		$result = $query->execute();

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
		$qb = $this->dbConn->getQueryBuilder();
		$qb->select('uid')
			->from('guests_users')
			->where(
				$qb->expr()->eq(
					'uid_lower', $qb->createNamedParameter(mb_strtolower($uid))
				)
			);
		$result = $qb->execute();
		$row = $result->fetch();
		$result->closeCursor();

		if (!$row) {
			throw new \RuntimeException($uid . ' does not exist');
		}

		return $row['uid'];
	}
}
