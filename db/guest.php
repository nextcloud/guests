<?php
/**
 * ownCloud
 *
 * @author Jörn Friedrich Dreyer <jfd@owncloud.com>
 * @copyright (C) 2015-2016 ownCloud, Inc.
 *
 * This code is covered by the ownCloud Commercial License.
 *
 * You should have received a copy of the ownCloud Commercial License
 * along with this program. If not, see <https://owncloud.com/licenses/owncloud-commercial/>.
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
