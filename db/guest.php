<?php
/**
 * @author Jörn Friedrich Dreyer <jfd@butonic.de>
 *
 * @copyright Copyright (c) 2017, ownCloud GmbH
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
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
