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

use OCA\Guests\Db\Guest;
use OCA\Guests\Db\GuestMapper;
use OCP\AppFramework\Db\DoesNotExistException;

class Hooks {

	/**
	 * jail into readonly storage
	 * @param array $params
	 */
	static public function preSetup($params) {
		if (!empty($params['user'])) {
			$uid = $params['user'];

			foreach(\OC::$server->getUserManager()->getBackends() as $backend) {
				if ($backend instanceof Backend && $backend->isGuest($uid)) {
					$backend->createJail($uid);

					return;
				}
			}
		}

	}
	/**
	 * add guest account
	 * @param array $params
	 */
	static public function preShareHook($params) {
		$shareWith = $params['shareWith'];
		if (filter_var($shareWith, FILTER_VALIDATE_EMAIL)) {
			$mapper = new GuestMapper(
				\OC::$server->getDatabaseConnection(),
				\OC::$server->getLogger()
			);
			try {
				$mapper->findByUid($shareWith);
				// guest exists, all good to go
			} catch (DoesNotExistException $ex) {
				$guest = new Guest($shareWith, null);
				$mapper->insert($guest);
			}
		}
	}

	/**
	 * generate guest password if new
	 * @param array $params
	 */
	static public function postShareHook($params) {

		$logger = \OC::$server->getLogger();
		$itemType = $params['itemType'];

		if ($itemType === 'folder' || $itemType === 'file') {

			$shareWith = $params['shareWith'];

			if (!filter_var($shareWith, FILTER_VALIDATE_EMAIL)) {
				$logger->debug("'$shareWith' does not look like an email",
					['app'=>'guests']);
			}

			$shareType = $params['shareType'];

			if ($shareType === \OCP\Share::SHARE_TYPE_USER) {
				self::generatePasswordIfNotExists($shareWith);
			} elseif ($shareType === \OCP\Share::SHARE_TYPE_GROUP) {
				foreach (\OC_Group::usersInGroup($shareWith) as $uid) {
					self::generatePasswordIfNotExists($uid);
				}
			}
		} else {
			$logger->debug("ignoring share for itemType '$itemType'",
				['app'=>'guests']);
		}
	}

	public static function generatePasswordIfNotExists ($uid) {

		$logger = \OC::$server->getLogger();

		$mapper = new GuestMapper(
			\OC::$server->getDatabaseConnection(),
			\OC::$server->getLogger()
		);

		try {
			$logger->debug("checking if '$uid' has a password",
				['app'=>'guests']);
			$guest = $mapper->findByUid($uid);
			if ($guest->getHash() === null) {

				// no quota
				$config = \OC::$server->getConfig();
				$config->setUserValue($uid, 'files', 'quota', 0);

				$password = \OC::$server->getSecureRandom()->generate(16);
				$hash = \OC::$server->getHasher()->hash($password);
				$guest->setHash($hash);
				$mapper->update($guest);

				\OC::$server->getLogger()->debug("generated password '$password' for '$uid'",
					['app'=>'guests']);

				//TODO send mail? cant we call existing code here?
			} else {
				\OC::$server->getLogger()->debug("guest '$uid' already has a password",
					['app'=>'guests']);
			}
		} catch (DoesNotExistException $ex) {
			\OC::$server->getLogger()->debug("'$uid' does not exist",
				['app'=>'guests']);
		}
	}
}