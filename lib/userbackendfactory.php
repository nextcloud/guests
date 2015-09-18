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

class UserBackendFactory {

	/**
	 * @deprecated use DI
	 * @return UserBackend
	 */
	public static function createForStaticLegacyCode() {
		$logger = \OC::$server->getLogger();

		$userBackend = new UserBackend(
			\OC::$server->getConfig(),
			$logger,
			new GuestMapper(\OC::$server->getDatabaseConnection(), $logger),
			\OC::$server->getHasher(),
			\OC::$server->getContactsManager()
		);

		return $userBackend;
	}
}
