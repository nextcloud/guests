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

namespace OCA\Guests\Db;

use OCP\AppFramework\Db\Entity;

/**
 * @method string getUid()
 * @method void setUid(string $uid)
 * @method string getHash()
 * @method void setHash(string $hash)
 */
class Guest extends Entity {

	public $uid;
	public $hash;

	/**
	 * @param string $uid
	 * @param string $hash
	 */
	public function __construct($uid = null, $hash = null) {
		// use setters to mark properties as updated
		$this->setUid($uid);
		$this->setHash($hash);
	}

}
