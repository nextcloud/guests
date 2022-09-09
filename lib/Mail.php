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

use OCP\L10N\IFactory;
use OCP\Defaults;
use OCP\IConfig;
use OCP\ILogger;
use OCP\IURLGenerator;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Mail\IMailer;
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

	/** @var IFactory */
	private $l10nFactory;

	private $userManager;

	/** @var  IURLGenerator */
	private $urlGenerator;

	public function __construct(
		IConfig $config,
		ILogger $logger,
		IUserSession $userSession,
		IMailer $mailer,
		Defaults $defaults,
		IFactory $l10nFactory,
		IUserManager $userManager,
		IURLGenerator $urlGenerator
	) {
		$this->config = $config;
		$this->logger = $logger;
		$this->userSession = $userSession;
		$this->mailer = $mailer;
		$this->defaults = $defaults;
		$this->l10nFactory = $l10nFactory;
		$this->userManager = $userManager;
		$this->urlGenerator = $urlGenerator;
	}

	/**
	 * Sends out a reset password mail if the user is a guest and does not have
	 * a password set, yet.
	 *
	 * @param $uid
	 * @throws \Exception
	 */
	public function sendGuestInviteMail(string $uid, string $shareWith, string $itemType, string $itemSource, string $token, string $language = ''): void {
		if ($language === '') {
			$language = null;
		}
		$l10n = $this->l10nFactory->get('guests', $language);

		$passwordLink = $this->urlGenerator->linkToRouteAbsolute(
			'core.lost.resetform',
			['userId' => $shareWith, 'token' => $token]
		);

		$this->logger->debug("sending invite to $shareWith: $passwordLink", ['app' => 'guests']);

		$targetUser = $this->userManager->get($shareWith);
		$shareWithEmail = $targetUser->getEMailAddress();
		$replyTo = $this->userManager->get($uid)->getEMailAddress();
		$senderDisplayName = $this->userSession->getUser()->getDisplayName();

		$items = Share::getItemSharedWithUser($itemType, $itemSource, $shareWith);
		$filename = trim($items[0]['file_target'], '/');
		$subject = (string)$l10n->t('%s shared »%s« with you', [$senderDisplayName, $filename]);
		$expiration = null;
		if (isset($items[0]['expiration'])) {
			try {
				$date = new \DateTime($items[0]['expiration']);
				$expiration = $date->getTimestamp();
			} catch (\Exception $e) {
				$this->logger->error("Couldn't read date: " . $e->getMessage(), ['app' => 'sharing']);
			}
		}


		$link = $this->urlGenerator->linkToRouteAbsolute(
			'files.viewcontroller.showFile', ['fileid' => $itemSource]
		);

		$emailTemplate = $this->mailer->createEMailTemplate('guest.invite');

		$emailTemplate->addHeader();
		$emailTemplate->addHeading($l10n->t('Incoming share'));

		$emailTemplate->addBodyText(
			$l10n->t('Hey there,')
		);

		$emailTemplate->addBodyText(
			$l10n->t('%s just shared »%s« with you.', [$senderDisplayName, $filename])
		);

		$emailTemplate->addBodyText(
			$l10n->t('You can access the shared file by activating your guest account.')
		);
		$emailTemplate->addBodyText(
			$l10n->t('After your account is activated you can view the share by logging in with %s.', [$shareWithEmail])
		);

		if ($expiration) {
			$formattedDate = $l10n->l('date', $expiration);
			$emailTemplate->addBodyText(
				$l10n->t('The share will expire at %s.', [$formattedDate])
			);
		}

		$emailTemplate->addBodyButtonGroup(
			$l10n->t('Activate account'),
			$passwordLink,
			$l10n->t('View share'),
			$link
		);
		$emailTemplate->addFooter();

		try {
			$message = $this->mailer->createMessage();
			$message->setTo([$shareWithEmail => $targetUser->getDisplayName()]);
			$message->setSubject($subject);
			$message->setHtmlBody($emailTemplate->renderHtml());
			$message->setPlainBody($emailTemplate->renderText());
			$message->setFrom([
				Util::getDefaultEmailAddress('sharing-noreply') =>
					(string)$l10n->t('%s via %s', [
						$senderDisplayName,
						$this->defaults->getName()
					]),
			]);

			if (!is_null($replyTo)) {
				$message->setReplyTo([$replyTo]);
			}

			$this->mailer->send($message);
		} catch (\Exception $e) {
			throw new \Exception($l10n->t(
				'Couldn\'t send reset email. Please contact your administrator.'
			));
		}
	}
}
