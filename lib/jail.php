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

namespace OCA\Guests;

use OCA\Guests\Db\GuestMapper;
use OCA\Guests\Files\Storage\Wrapper\DirMask;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\Contacts\IManager;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\ILogger;
use OCP\IUserManager;


class Jail {

	/** @var IConfig */
	private $config;

	/** @var ILogger */
	private $logger;

	/** @var GuestMapper */
	private $mapper;

	/** @var IManager */
	private $contactsManager;

	/** @var IUserManager */
	private $userManager;

	/** @var IGroupManager */
	private $groupManager;

	public function __construct(
		IConfig $config,
		ILogger $logger,
		GuestMapper $mapper,
		IManager $contactsManager,
		IUserManager $userManager,
		IGroupManager $groupManager
	) {
		$this->config = $config;
		$this->logger = $logger;
		$this->mapper = $mapper;
		$this->contactsManager = $contactsManager;
		$this->userManager = $userManager;
		$this->groupManager = $groupManager;
	}

	/**
	 * @var Jail
	 */
	private static $instance;

	/**
	 * @deprecated use DI
	 * @return Jail
	 */
	public static function createForStaticLegacyCode() {
		if (!self::$instance) {
			$logger = \OC::$server->getLogger();

			self::$instance = new Jail(
				\OC::$server->getConfig(),
				$logger,
				new GuestMapper(\OC::$server->getDatabaseConnection(), $logger),
				\OC::$server->getContactsManager(),
				\OC::$server->getUserManager(),
				\OC::$server->getGroupManager()
			);
		}
		return self::$instance;
	}

	public function isGuest($uid) {
		$conditions = $this->config->getAppValue('guests', 'conditions', 'quota');
		$conditions = explode(',',$conditions);
		return
			$uid !== '' && $this->userManager->userExists($uid) && (
			( in_array('quota', $conditions) && $this->isGuestByQuota($uid) ) ||
			( in_array('group', $conditions) && $this->isGuestByGroup($uid) ) ||
			( in_array('contact', $conditions) && $this->isGuestByContact($uid) )
			);

	}

	public function isGuestByContact($uid) {
		if (filter_var($uid, FILTER_VALIDATE_EMAIL)) {
			try {
				$this->mapper->findByUid($uid);
				return true;
			} catch (DoesNotExistException $ex) {
				// not a guest
			}
		}
		return false;
	}
	public function isGuestByQuota($uid) {
		$userQuota = $this->config->getUserValue($uid, 'files', 'quota', 'default');
		if ($userQuota === 'default') {
			$userQuota = $this->config->getAppValue('files', 'default_quota', 'none');
		}
		if ($userQuota !== 'none' && (int)\OCP\Util::computerFileSize($userQuota) === 0) {
			return true;
		}
		return false;
	}
	public function isGuestByGroup($uid) {
		$group = $this->config->getAppValue('guests', 'group', 'guests');
		return $this->groupManager->isInGroup($uid, $group);
	}

	const DEFAULT_WHITELIST = ',core,settings,avatar,files,files_trashbin,files_versions,files_sharing,files_texteditor,activity,firstrunwizard,gallery,notifications';
	//TODO add reset button
	public function getGuestApps () {
		$apps = $this->config->getAppValue('guests', 'apps', self::DEFAULT_WHITELIST);
		// the guests app is always enabled because we need to execute navigation.js
		// to hide apps in the navigation
		return array_merge(['guests'], explode(',', $apps));
	}

	/**
	 * TODO Core has \OC::$REQUESTEDAPP but it isn't set until the routes are matched
	 * taken from \OC\Route\Router::match()
	 */
	public function getRequestedApp($url) {
		if (substr($url, 0, 6) === '/apps/') {
			// empty string / 'apps' / $app / rest of the route
			list(, , $app,) = explode('/', $url, 4);

			return  \OC_App::cleanAppId($app);
		} else if (substr($url, 0, 6) === '/core/') {
			return 'core';
		} else if (substr($url, 0, 10) === '/settings/') {
			return 'settings';
		} else if (substr($url, 0, 8) === '/avatar/') {
			return 'avatar';
		} else if (substr($url, 0, 10) === '/heartbeat') {
			return 'heartbeat';
		}
		return false;
	}

	public function createJail($uid) {
		// FIXME without this the cache tries to gc a not existing folder
		//trigger creation of user home and /files folder
		//\OC::$server->getUserFolder($uid);

		// make root and home storage readonly
		// root also needs to be readonly for objectstorage
		\OC\Files\Filesystem::addStorageWrapper('readonly', function ($mountPoint, $storage) use ($uid) {
			if ($mountPoint === '/' || $mountPoint === "/$uid/") {
				return new DirMask(array('storage' => $storage, 'mask' => \OCP\Constants::PERMISSION_READ, 'path' => 'files'));
				//return new \OC\Files\Storage\Wrapper\PermissionsMask(array('storage' => $storage, 'mask' => \OCP\Constants::PERMISSION_READ));
			} else {
				return $storage;
			}
		});
	}
}
