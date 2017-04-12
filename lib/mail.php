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
namespace OCA\Guests;


use OC\Share\MailNotifications;
use OCP\Defaults;
use OCP\IConfig;
use OCP\IL10N;
use OCP\ILogger;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Mail\IMailer;
use OCP\Security\ISecureRandom;
use OCP\Share;
use OCP\Util;

class Mail {

	/** @var IConfig */
	private $config;

	/** @var ILogger */
	private $logger;

	/** @var IUserSession */
	private $userSession;

	/** @var IMailer */
	private $mailer;

	/** @var Defaults */
	private $defaults;

	/** @var IL10N */
	private $l10n;

	public function __construct(
		IConfig $config,
		ILogger $logger,
		IUserSession $userSession,
		IMailer $mailer,
		Defaults $defaults,
		IL10N $l10n,
		IUserManager $userManager
	) {
		$this->config = $config;
		$this->logger = $logger;
		$this->userSession = $userSession;
		$this->mailer = $mailer;
		$this->defaults = $defaults;
		$this->l10n = $l10n;
		$this->userManager = $userManager;
	}

	/**
	 * @var Mail
	 */
	private static $instance;

	/**
	 * @deprecated use DI
	 * @return Mail
	 */
	public static function createForStaticLegacyCode() {
		if (!self::$instance) {
			self::$instance = new Mail (
				\OC::$server->getConfig(),
				\OC::$server->getLogger(),
				\OC::$server->getUserSession(),
				\OC::$server->getMailer(),
				new Defaults(),
				\OC::$server->getL10N('guests'),
				\OC::$server->getUserManager()
			);

		}
		return self::$instance;
	}

	/**
	 * Sends out a reset password mail if the user is a guest and does not have
	 * a password set, yet.
	 * @param $uid
	 * @throws \Exception
	 */
	public function sendGuestInviteMail ($uid, $shareWith, $itemType, $itemSource, $token) {
		$passwordLink = \OC::$server->getURLGenerator()->linkToRouteAbsolute('core.lost.resetform', array('userId' => $shareWith, 'token' => $token));

		$this->logger->debug("sending invite to $shareWith: $passwordLink", ['app' => 'guests']);

		$shareWithEmail = $this->userManager->get($shareWith)->getEMailAddress();
		$replyTo = $this->userManager->get($uid)->getEMailAddress();

		$senderDisplayName = $this->userSession->getUser()->getDisplayName();

		$items = Share::getItemSharedWithUser($itemType, $itemSource, $shareWith);
		$filename = trim($items[0]['file_target'], '/');
		$subject = (string) $this->l10n->t('%s shared »%s« with you', array($senderDisplayName, $filename));
		$expiration = null;
		if (isset($items[0]['expiration'])) {
			try {
				$date = new \DateTime($items[0]['expiration']);
				$expiration = $date->getTimestamp();
			} catch (\Exception $e) {
				$this->logger->error("Couldn't read date: ".$e->getMessage(), ['app' => 'sharing']);
			}
		}

		// Link to folder, or root folder if a file

		if ($itemType === 'folder') {
			$args = array(
				'dir' => $filename,
			);
		} else if (strpos($filename, '/')) {
			$args = array(
				'dir' => '/' . dirname($filename),
				'scrollto' => basename($filename),
			);
		} else {
			$args = array(
				'dir' => '/',
				'scrollto' => $filename,
			);
		}

		$link = Util::linkToAbsolute('files', 'index.php', $args);

		list($htmlBody, $textBody) = $this->createMailBody(
			$filename, $link, $passwordLink, $this->defaults->getName(), $senderDisplayName, $expiration, $shareWithEmail
		);

		try {
			$message = $this->mailer->createMessage();
			$message->setTo([$shareWithEmail => $shareWith]);
			$message->setSubject($subject);
			$message->setHtmlBody($htmlBody);
			$message->setPlainBody($textBody);
			$message->setFrom([
				Util::getDefaultEmailAddress('sharing-noreply') =>
					(string)$this->l10n->t('%s via %s', [
						$senderDisplayName,
						$this->defaults->getName()
					]),
			]);
			if(!is_null($replyTo)) {
				$message->setReplyTo([$replyTo]);
			}

			$this->mailer->send($message);
		} catch (\Exception $e) {
			throw new \Exception($this->l10n->t(
				'Couldn\'t send reset email. Please contact your administrator.'
			));
		}
	}

	/**
	 * @param $sender
	 * @param $recipient
	 * @param $itemType
	 * @param $itemSource
	 */
	public function sendShareNotification (
		$sender,
		IUser $recipient,
		$itemType,
		$itemSource
	) {
		$recipientList[] = $recipient;


		$mailNotification = new MailNotifications(
			$sender,
			\OC::$server->getL10N('lib'),
			$this->mailer,
			$this->logger,
			$this->defaults,
			\OC::$server->getURLGenerator()
		);
		$this->logger->debug("sending share notification for '$itemType'"
			." '$itemSource' to {$recipient->getUID()}'",
			['app'=>'guests']);

		$result = $mailNotification->sendInternalShareMail(
			$recipientList, $itemSource, $itemType
		);

		// mark mail as sent
		// TODO do not set if $result contains the recipient
		Share::setSendMailStatus(
			$itemType, $itemSource, Share::SHARE_TYPE_USER, $recipient, true
		);

	}

	/**
	 * create mail body for plain text and html mail
	 *
	 * @param string $filename the shared file
	 * @param string $link link to the shared file
	 * @param int $expiration expiration date (timestamp)
	 * @param string $guestEmail
	 * @return array an array of the html mail body and the plain text mail body
	 */
	private function createMailBody($filename, $link, $passwordLink, $cloudName, $displayName, $expiration, $guestEmail) {

		$formattedDate = $expiration ? $this->l10n->l('date', $expiration) : null;

		$html = new \OC_Template('guests', 'mail/invite');
		$html->assign ('link', $link);
		$html->assign ('password_link', $passwordLink);
		$html->assign ('cloud_name', $cloudName);
		$html->assign ('user_displayname', $displayName);
		$html->assign ('filename', $filename);
		$html->assign('expiration',  $formattedDate);
		$html->assign('guestEmail', $guestEmail);
		$htmlMail = $html->fetchPage();

		$plainText = new \OC_Template('guests', 'mail/altinvite');
		$plainText->assign ('link', $link);
		$plainText->assign ('password_link', $passwordLink);
		$plainText->assign ('cloud_name', $cloudName);
		$plainText->assign ('user_displayname', $displayName);
		$plainText->assign ('filename', $filename);
		$plainText->assign('expiration', $formattedDate);
		$plainText->assign('guestEmail', $guestEmail);
		$plainTextMail = $plainText->fetchPage();

		return [$htmlMail, $plainTextMail];
	}

}