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
use OCP\Security\ISecureRandom;

class Hooks {

	/**
	 * jail into readonly storage
	 * @param array $params
	 */
	static public function preSetup($params) {
		if (!empty($params['user'])) {
			$uid = $params['user'];

			$jail = \OCA\Guests\Jail::createForStaticLegacyCode();

			if ($jail->isGuest($uid)) {
				$app = $jail->getRequestedApp(\OC::$server->getRequest()->getRawPathInfo());
				if ( ! in_array($app, $jail->getGuestApps()) ) {
					// send forbidden and exit
					header('HTTP/1.0 403 Forbidden');

					$l = \OC::$server->getL10NFactory()->get('guests');
					\OCP\Template::printErrorPage($l->t('Access to this resource is forbidden for guests.'));
					exit;
				}
				$jail->createJail($uid);
				return;
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

		$config = \OC::$server->getConfig();
		$logger = \OC::$server->getLogger();
		$coreL10n = \OC::$server->getL10N('core');

		$mapper = new GuestMapper(
			\OC::$server->getDatabaseConnection(),
			\OC::$server->getLogger()
		);

		$email = $config->getUserValue($uid, 'settings', 'email');

		try {
			$logger->debug("checking if '$uid' has a password",
				['app'=>'guests']);
			$guest = $mapper->findByUid($uid);
			if ($guest->getHash() === null) {

				if (empty($email)) {
					throw new \Exception(
							$coreL10n->t('Couldn\'t send reset email because there is no ' .
									'email address for this username. Please ' .
									'contact your administrator.')
					);
				}

				$token = \OC::$server->getSecureRandom()->getMediumStrengthGenerator()->generate(21,
						ISecureRandom::CHAR_DIGITS .
						ISecureRandom::CHAR_LOWER .
						ISecureRandom::CHAR_UPPER);
				$config->setUserValue($uid, 'owncloud', 'lostpassword', time() . ':' . $token);

				$link = \OC::$server->getURLGenerator()->linkToRouteAbsolute('core.lost.resetform', array('userId' => $uid, 'token' => $token));
				$logger->debug("password reset link: $link",
						['app'=>'guests']);

				$tmpl = new \OC_Template('core/lostpassword', 'email');
				$tmpl->assign('link', $link);
				$msg = $tmpl->fetchPage();

				$from = \OCP\Util::getDefaultEmailAddress('lostpassword-noreply');
				$defaults = new \OCP\Defaults();
				$fromName = $defaults->getName();
				try {
					$mailer = \OC::$server->getMailer();
					$message = $mailer->createMessage();
					$message->setTo([$email => $uid]);
					$message->setSubject($coreL10n->t('%s password reset', [$fromName]));
					$message->setPlainBody($msg);
					$message->setFrom([$from => $fromName]);
					$mailer->send($message);
				} catch (\Exception $e) {
					throw new \Exception($coreL10n->t(
							'Couldn\'t send reset email. Please contact your administrator.'
					));
				}

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