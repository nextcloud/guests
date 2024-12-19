<?php
/**
 * SPDX-FileCopyrightText: 2017-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2017 ownCloud GmbH
 * SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
 */

namespace OCA\Guests;

use OCP\Defaults;
use OCP\IConfig;
use OCP\IURLGenerator;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\L10N\IFactory;
use OCP\Mail\IMailer;
use OCP\Share;
use OCP\Util;
use Psr\Log\LoggerInterface;

class Mail {

	public function __construct(
		private IConfig $config,
		private LoggerInterface $logger,
		private IUserSession $userSession,
		private IMailer $mailer,
		private Defaults $defaults,
		private IFactory $l10nFactory,
		private IUserManager $userManager,
		private IURLGenerator $urlGenerator,
	) {
	}

	/**
	 * Sends out a reset password mail if the user is a guest and does not have
	 * a password set, yet.
	 *
	 * @param $uid
	 * @throws \Exception
	 */
	public function sendGuestInviteMail(string $uid, string $shareWith, Share\IShare $share, string $token, string $language = ''): void {
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
		if (!$shareWithEmail) {
			throw new \Exception("Guest user created without email");
		}
		$replyTo = $this->userManager->get($uid)->getEMailAddress();
		$senderDisplayName = $this->userSession->getUser()->getDisplayName();

		$filename = trim($share->getTarget(), '/');
		$subject = $l10n->t('%s shared »%s« with you', [$senderDisplayName, $filename]);
		$expiration = $share->getExpirationDate();

		$link = $this->urlGenerator->linkToRouteAbsolute(
			'files.viewcontroller.showFile', ['fileid' => $share->getNodeId(), 'direct' => 1]
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
					$l10n->t('%s via %s', [
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
