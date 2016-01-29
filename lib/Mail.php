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


use OCP\AppFramework\Db\DoesNotExistException;
use OCP\Defaults;
use OCP\IConfig;
use OCP\ILogger;
use OCP\Mail\IMailer;
use OCP\Security\ISecureRandom;

class Mail {

	/** @var IConfig */
	private $config;

	/** @var ILogger */
	private $logger;

	/** @var IMailer */
	private $mailer;

	/** @var Defaults */
	private $defaults;

	public function __construct(
		IConfig $config,
		ILogger $logger,
		IMailer $mailer,
		Defaults $defaults
	) {
		$this->config = $config;
		$this->logger = $logger;
		$this->mailer = $mailer;
		$this->defaults = $defaults;
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
				\OC::$server->getMailer(),
				new Defaults()
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
	public function sendPasswordResetMail ($uid) {

		if (!filter_var($uid, FILTER_VALIDATE_EMAIL)) {
			// ignore non email guest accounts. They are handled by an admin
			return;
		}

		try {
			$this->logger->debug("checking if '$uid' has a password",
				['app'=>'guests']);
			$guest = $this->mapper->findByUid($uid);
			if ($guest->getHash() === null) {

				$coreL10n = \OC::$server->getL10N('core');

				$token = \OC::$server->getSecureRandom()->getMediumStrengthGenerator()->generate(21,
					ISecureRandom::CHAR_DIGITS .
					ISecureRandom::CHAR_LOWER .
					ISecureRandom::CHAR_UPPER);
				$this->config->setUserValue($uid, 'owncloud', 'lostpassword', time() . ':' . $token);

				$link = \OC::$server->getURLGenerator()->linkToRouteAbsolute('core.lost.resetform', array('userId' => $uid, 'token' => $token));
				$this->logger->debug("sending password reset link '$link' to $uid'",
					['app'=>'guests']);

				$tmpl = new \OC_Template('core/lostpassword', 'email');
				$tmpl->assign('link', $link);
				$msg = $tmpl->fetchPage();

				$from = \OCP\Util::getDefaultEmailAddress('lostpassword-noreply');
				$fromName = $this->defaults->getName();
				try {
					$message = $this->mailer->createMessage();
					$message->setTo([$uid => $uid]);
					$message->setSubject($coreL10n->t('%s password reset', [$fromName]));
					$message->setPlainBody($msg);
					$message->setFrom([$from => $fromName]);
					$this->mailer->send($message);
				} catch (\Exception $e) {
					throw new \Exception($coreL10n->t(
						'Couldn\'t send reset email. Please contact your administrator.'
					));
				}
			} else {
				$this->logger->debug("guest '$uid' already has a password",
					['app'=>'guests']);
			}
		} catch (DoesNotExistException $ex) {
			$this->logger->debug("'$uid' does not exist", ['app'=>'guests']);
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
		$recipient,
		$itemType,
		$itemSource
	) {
		$recipientList[] = $recipient;
		// don't send a mail to the user who shared the file
		$recipientList = array_diff($recipientList, array($sender));

		$mailNotification = new \OC\Share\MailNotifications(
			$sender,
			$this->config,
			\OC::$server->getL10N('lib'),
			$this->mailer,
			$this->logger,
			$this->defaults
		);
		$result = $mailNotification->sendInternalShareMail(
			$recipientList, $itemSource, $itemType
		);

		\OCP\Share::setSendMailStatus(
			$itemType, $itemSource, \OCP\Share::SHARE_TYPE_USER, $recipient, true
		);

	}
}