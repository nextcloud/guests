<?php
/**
 * ownCloud
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING-AGPL file.
 *
 * @author Jörn Friedrich Dreyer <jfd@butonic.de>
 * @copyright Jörn Friedrich Dreyer 2015
 */

namespace OCA\Guests;

use OCA\Guests\Db\GuestMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\Contacts\IManager;
use OCP\IConfig;
use OCP\ILogger;
use OCP\IUserBackend;
use OCP\Security\IHasher;
use OCP\UserInterface;


class UserBackend implements UserInterface, IUserBackend {

	/** @var IConfig */
	private $config;

	/** @var ILogger */
	private $logger;

	/** @var GuestMapper */
	private $mapper;

	/** @var IHasher */
	private $hasher;

	/** @var IManager */
	private $manager;

	public function __construct(
		IConfig $config,
		ILogger $logger,
		GuestMapper $mapper,
		IHasher $hasher,
		IManager $manager
	) {
		$this->config = $config;
		$this->logger = $logger;
		$this->mapper = $mapper;
		$this->hasher = $hasher;
		$this->manager = $manager;
	}

	/**
	* Check if backend implements actions
	* @param array $actions bitwise-or'ed actions
	* @returns boolean
	*
	* Returns the supported actions as int to be
	* compared with OC_USER_BACKEND_CREATE_USER etc.
	*/
	public function implementsActions($actions) {
		return (bool)((\OC_User_Backend::CHECK_PASSWORD
			| \OC_User_Backend::SET_PASSWORD
			//| \OC_User_Backend::GET_DISPLAYNAME
			//| \OC_User_Backend::PROVIDE_AVATAR
			//| \OC_User_Backend::COUNT_USERS
			) & $actions);
	}


	/**
	 * returns a counts of the users
	 *
	 * @return int | bool
	 */
	public function countUsers() {
		return false;
	}

	/**
	* delete a user
	* @param string $uid The username of the user to delete
	* @returns boolean
	*
	* Deletes a user
	*/
	public function deleteUser($uid) {
		return false;
	}

	/**
	 * Get a list of all users
	 *
	 * @param string $search
	 * @param integer|null $limit
	 * @param integer|null $offset
	 * @return string[] with all uids
	 */
	public function getUsers($search = '', $limit = null, $offset = null) {
		$this->logger->debug("getUsers '$search'",
			['app'=>'guests']);
		$guests = $this->mapper->search($search, $limit, $offset);
		// TODO check if uid is still a recipient for shares?
		$results = [];
		if ($guests) {
			foreach ($guests as $guest) {
				$results[] = $guest->getUid();
			}
		} else {
			if (filter_var($search, FILTER_VALIDATE_EMAIL)) {
				$results[] = $search;
			}
		}
		return $results;
	}


	/**
	* check if a user exists
	* @param string $uid the username
	* @return boolean
	*/
	public function userExists($uid) {
		$guests = $this->manager->search($uid, ['EMAIL']);
		if ($guests) {
			return true;
		}
		try {
			$guest = $this->mapper->findByUid($uid);
			// TODO check if uid is still a recipient for shares?
			return true;
		} catch (DoesNotExistException $ex) {
			return false;
		}
	}

	/**
	 * get display name of the user
	 * @param string $uid user ID of the user
	 * @return string display name
	 */
	public function getDisplayName($uid) {
		return $uid;
	}

	/**
	 * Get a list of all display names
	 * @param string $search
	 * @param int|null $limit
	 * @param int|null $offset
	 * @returns array with  all displayNames (value) and the corresponding uids (key)
	 *
	 * Get a list of all display names and user ids.
	 */
	public function getDisplayNames($search = '', $limit = null, $offset = null) {
		$this->logger->debug("getUsers '$search'",
			['app'=>'guests']);
		if (filter_var($search, FILTER_VALIDATE_EMAIL)) {
			return [$search => $search];
		}
		return [];
	}

	/**
	 * Check if a user list is available or not
	 * @return boolean if users can be listed or not
	 */
	public function hasUserListings() {
		return false;
	}

	/**
	 * Check if the password is correct
	 * @param string $uid The username
	 * @param string $password The password
	 * @return string
	 *
	 * Check if the password is correct without logging in the user
	 * returns the user id or false
	 */
	public function checkPassword($uid, $password) {
		try {
			$guest = $this->mapper->findByUid($uid);
			$storedHash = $guest->getHash();
			$newHash = '';
			if ($this->hasher->verify($password, $storedHash, $newHash)) {
				if (!empty($newHash)) {
					$guest->setHash($newHash);
					$this->mapper->update($guest);
				}
				return $guest->getUid();
			}
			return false;
		} catch (DoesNotExistException $ex) {
			return false;
		}
	}

	/**
	 * Set password
	 * @param string $uid The username
	 * @param string $password The new password
	 * @return bool
	 *
	 * Change the password of a user
	 */
	public function setPassword($uid, $password) {
		try {
			$guest = $this->mapper->findByUid($uid);
			$guest->setHash($this->hasher->hash($password));
			$this->mapper->update($guest);
			return true;
		} catch (DoesNotExistException $ex) {
			return false;
		}
	}

	/**
	 * Backend name to be shown in user management
	 *
	 * @return string the name of the backend to be shown
	 */
	public function getBackendName() {
		return 'Guests';
	}
}
