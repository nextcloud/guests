<?php

/**
 * SPDX-FileCopyrightText: 2017-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2017 ownCloud GmbH
 * SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
 */

namespace OCA\Guests;

use OCP\Defaults;
use OCP\IConfig;
use OCP\IL10N;
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
	public function sendGuestInviteMail(string $uid, string $guest, string $token, string $language = '', ?Share\IShare $share = null): void {
		if ($language === '') {
			$language = null;
		}
		$l10n = $this->l10nFactory->get('guests', $language);

		$passwordLink = $this->urlGenerator->linkToRouteAbsolute(
			'core.lost.resetform',
			['userId' => $guest, 'token' => $token]
		);

		$targetUser = $this->userManager->get($guest);
		$guestEmail = $targetUser->getEMailAddress();
		if (!$guestEmail) {
			throw new \Exception('Guest user created without email');
		}
		$replyTo = $this->userManager->get($uid)->getEMailAddress();
		$senderDisplayName = $this->userSession->getUser()->getDisplayName();

		if (empty($share)) {
			[ $subject, $emailTemplate ] = $this->composeInviteMessage($senderDisplayName, $guestEmail, $passwordLink, $l10n);
		} else {
			[ $subject, $emailTemplate ] = $this->composeShareMessage($share, $senderDisplayName, $guestEmail, $passwordLink, $l10n);
		}

		try {
			$message = $this->mailer->createMessage();
			$message->setTo([$guestEmail => $targetUser->getDisplayName()]);
			$message->setSubject($subject);
			$message->setHtmlBody($emailTemplate->renderHtml());
			$message->setPlainBody($emailTemplate->renderText());
			$message->setFrom([
				Util::getDefaultEmailAddress('sharing-noreply')
					=> $l10n->t('%s via %s', [
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

	private function composeShareMessage(Share\IShare $share, string $senderDisplayName, string $guestEmail, string $passwordLink, IL10N $l10n): array {
		$filename = trim($share->getTarget(), '/');
		$subject = $l10n->t('%s shared a file with you', [$senderDisplayName]);
		$expiration = $share->getExpirationDate();

		$link = $this->urlGenerator->linkToRouteAbsolute(
			'files.viewcontroller.showFile', ['fileid' => $share->getNodeId(), 'direct' => 1]
		);
		$emailTemplate = $this->mailer->createEMailTemplate('guest.share');

		$emailTemplate->addHeader();
		$emailTemplate->addHeading($l10n->t('%s shared a file with you', [$senderDisplayName]));

		$emailTemplate->addBodyText(
			$l10n->t('Hey there,')
		);

		$emailTemplate->addBodyText(
			$l10n->t('%1$s just invited you and shared »%2$s« with you.', [$senderDisplayName, $filename])
		);

		$emailTemplate->addBodyText(
			$l10n->t('You can access the shared file by activating your guest account.')
		);
		$emailTemplate->addBodyText(
			$l10n->t('After your account is activated you can view the share by logging in with %s.', [$guestEmail])
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

		return [ $subject, $emailTemplate ];
	}

	private function composeInviteMessage(string $senderDisplayName, string $guestEmail, string $passwordLink, IL10N $l10n): array {
		$subject = $l10n->t('%s invited you as a guest', [$senderDisplayName]);

		$emailTemplate = $this->mailer->createEMailTemplate('guest.invite');

		$emailTemplate->addHeader();
		$emailTemplate->addHeading($l10n->t('You have been invited'));

		$emailTemplate->addBodyText(
			$l10n->t('Hey there,')
		);

		$emailTemplate->addBodyText(
			$l10n->t('%s just invited you.', [$senderDisplayName])
		);

		$emailTemplate->addBodyText(
			$l10n->t('You can activate your guest account with the button below.')
		);
		$emailTemplate->addBodyText(
			$l10n->t('After your account is activated you can log in with %s.', [$guestEmail])
		);

		$emailTemplate->addBodyButton(
			$l10n->t('Activate account'),
			$passwordLink
		);
		$emailTemplate->addFooter();

		return [ $subject, $emailTemplate ];
	}
}
