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
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\ILogger;
use OCP\IRequest;
use OCP\IUserSession;

class Hooks {

	/**
	 * @var ILogger
	 */
	private $logger;

	/**
	 * @var IUserSession
	 */
	private $userSession;
	/**
	 * @var IRequest
	 */
	private $request;

	/**
	 * @var Mail
	 */
	private $mail;

	/**
	 * @var Jail
	 */
	private $jail;

	/**
	 * @var GuestMapper
	 */
	private $mapper;

	/**
	 * Hooks constructor.
	 *
	 * @param ILogger $logger
	 * @param IUserSession $userSession
	 * @param IRequest $request
	 * @param Mail $mail
	 * @param Jail $jail
	 * @param GuestMapper $mapper
	 */
	public function __construct(
		ILogger $logger,
		IUserSession $userSession,
		IRequest $request,
		Mail $mail,
		Jail $jail,
		GuestMapper $mapper
	) {
		$this->logger = $logger;
		$this->userSession = $userSession;
		$this->request = $request;
		$this->mail = $mail;
		$this->jail = $jail;
		$this->mapper = $mapper;
	}

	/**
	 * @var Jail
	 */
	private static $instance;

	/**
	 * @deprecated use DI
	 * @return Hooks
	 */
	public static function createForStaticLegacyCode() {
		if (!self::$instance) {
			$logger = \OC::$server->getLogger();

			self::$instance = new Hooks(
				$logger,
				\OC::$server->getUserSession(),
				\OC::$server->getRequest(),
				Mail::createForStaticLegacyCode(),
				Jail::createForStaticLegacyCode(),
				new GuestMapper(
					\OC::$server->getDatabaseConnection(),
					$logger
				)
			);
		}
		return self::$instance;
	}

	/**
	 * jail into readonly storage
	 * @param array $params
	 */
	static public function preSetup($params) {
		if (!empty($params['user'])) {
			$hook = self::createForStaticLegacyCode();
			$hook->handlePreSetup($params['user']);
		}
	}

	public function handlePreSetup($uid) {
		if ($this->jail->isGuest($uid)) {
			$app = $this->jail->getRequestedApp(
				$this->request->getRawPathInfo()
			);
			if ( ! in_array($app, $this->jail->getGuestApps()) ) {
				// send forbidden and exit
				header('HTTP/1.0 403 Forbidden');

				$l = \OC::$server->getL10NFactory()->get('guests');
				\OCP\Template::printErrorPage($l->t(
						'Access to this resource is forbidden for guests.'
				));
				exit;
			}
			$this->jail->createJail($uid);
			return;
		}
	}

	/**
	 * generate guest password if new
	 *
	 * @param array $params
	 * @throws \Exception
	 */
	static public function postShareHook($params) {
		$hook = self::createForStaticLegacyCode();
		$hook->handlePostShare(
				$params['shareType'],
				$params['shareWith'],
				$params['itemType'],
				$params['itemSource']
		);
	}

	public function handlePostShare(
		$shareType,
		$shareWith,
		$itemType,
		$itemSource
	) {

		if ($shareType !== \OCP\Share::SHARE_TYPE_USER ||
				!filter_var($shareWith, FILTER_VALIDATE_EMAIL)
		) {
			return; // only email guests need to receive password reset and
			// share notification mails. other guest types can configure
			// notification behavior themselves. email guests cannot
			// yet be part of a group, so we only need to take action
			// when an email guest is receiving a share
		}

		if ($itemType === 'folder' || $itemType === 'file') {

			$user = $this->userSession->getUser();
			if ($user) {
				$uid = $user->getUID();
			} else {
				throw new \Exception(
						'post_share hook triggered without user in session'
				);
			}

			if ($this->jail->isGuest($shareWith)) {
				$this->logger->debug("sending mail(s) to '$shareWith'",
						['app'=>'guests']);

				try {
					$guest = $this->mapper->findByUid($uid);
					if ($guest->getHash() === null) {
						$this->mail->sendPasswordResetMail($shareWith);
					}
				} catch (DoesNotExistException $ex) {
					$this->logger->error("'$uid' does not exist", ['app'=>'guests']);
				}

				$this->mail->sendShareNotification(
						$uid, $shareWith, $itemType, $itemSource
				);
			} else {
				$this->logger->debug("ignoring user '$shareWith', not a guest",
						['app'=>'guests']);
			}
		} else {
			$this->logger->debug("ignoring share for itemType '$itemType'",
					['app'=>'guests']);
		}
	}

}