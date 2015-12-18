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
	 *
	 * @param array $params
	 * @throws \Exception
	 */
	static public function postShareHook($params) {

		$logger = \OC::$server->getLogger();

		$itemType = $params['itemType'];

		if ($itemType === 'folder' || $itemType === 'file') {

			$shareWith = $params['shareWith'];
			$shareType = $params['shareType'];
			$itemSource = $params['itemSource'];

			$user = \OC::$server->getUserSession()->getUser();
			if ($user) {
				$uid = $user->getUID();
			} else {
				throw new \Exception(
						'post_share hook triggered without user in session'
				);
			}

			// First send out the share notification
			$mail = \OCA\Guests\Mail::createForStaticLegacyCode();
			$mail->sendShareNotification($uid, $shareType, $shareWith, $itemType, $itemSource);

			// Now send password reset mails if necessary
			if ($shareType === \OCP\Share::SHARE_TYPE_USER) {
				$recipients = [$shareWith];
			} elseif ($shareType === \OCP\Share::SHARE_TYPE_GROUP) {
				$recipients = \OC_Group::usersInGroup($shareWith);
			}
			foreach ($recipients as $recipient) {
				$mail->sendPasswordResetMail($recipient);
			}
		} else {
			$logger->debug("ignoring share for itemType '$itemType'",
				['app'=>'guests']);
		}
	}

}