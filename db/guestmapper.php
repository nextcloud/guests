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


use OCP\AppFramework\Db\Mapper;
use OCP\IDBConnection;
use OCP\ILogger;

class GuestMapper extends Mapper {

	private $logger;

	public function __construct(IDBConnection $db, ILogger $logger){
		parent::__construct($db, 'guests', '\OCA\Guests\Db\Guest');
		$this->logger = $logger;
	}

	/**
	 * @param $uid
	 * @return \OCA\Guests\Db\Guest
	 */
	public function findByUid($uid){
		$sql = 'SELECT * FROM `*PREFIX*guests` WHERE `uid` = ?';
		$params = [$uid];

		return $this->findEntity($sql, $params);
	}

	/**
	 * @param string $search
	 * @param null $limit
	 * @param null $offset
	 * @return Guest[]
	 */
	public function search ($search = '', $limit = null, $offset = null) {

		$sql = 'SELECT * FROM `*PREFIX*guests` WHERE `uid` ILIKE ?';
		$params = [$search];

		return $this->findEntities($sql, $params, $limit, $offset);
	}

}
