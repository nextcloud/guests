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
