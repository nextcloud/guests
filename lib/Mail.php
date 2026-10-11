<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2017 ownCloud GmbH
 * SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
 */

namespace OCA\Guests;

use OCP\Defaults;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\L10N\IFactory;
use OCP\Mail\EMailDetails;
use OCP\Mail\IEMailTemplate;
use OCP\Mail\IMailer;
use OCP\Share\IShare;
use OCP\Util;

class Mail {

	public function __construct(
		private readonly IUserSession $userSession,
		private readonly IMailer $mailer,
		private readonly Defaults $defaults,
		private readonly IFactory $l10nFactory,
		private readonly IUserManager $userManager,
		private readonly IURLGenerator $urlGenerator,
	) {
	}

	/**
	 * Sends out a reset password mail if the user is a guest and does not have
	 * a password set, yet.
	 *
	 * @throws \Exception
	 */
	public function sendGuestInviteMail(string $uid, string $guest, string $token, string $language = '', ?IShare $share = null): void {
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

		if (!$share instanceof IShare) {
			$emailTemplate = $this->composeInviteMessage($senderDisplayName, $replyTo, $guestEmail, $passwordLink, $l10n);
		} else {
			$emailTemplate = $this->composeShareMessage($share, $senderDisplayName, $replyTo, $guestEmail, $passwordLink, $l10n);
		}

		try {
			$message = $this->mailer->createMessage();
			$message->setTo([$guestEmail => $targetUser->getDisplayName()]);
			$message->useTemplate($emailTemplate);
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
		} catch (\Exception) {
			throw new \Exception($l10n->t(
				"Couldn't send reset email. Please contact your administrator."
			));
		}
	}

	private function composeShareMessage(IShare $share, string $senderDisplayName, ?string $senderEmail, string $guestEmail, string $passwordLink, IL10N $l10n): IEMailTemplate {
		$filename = trim($share->getTarget(), '/');
		$expiration = $share->getExpirationDate();
		$note = $share->getNote();

		$link = $this->urlGenerator->linkToRouteAbsolute(
			'files.viewcontroller.showFile', ['fileid' => $share->getNodeId(), 'direct' => 1]
		);
		$emailTemplate = $this->mailer->createEMailTemplate('guest.share');
		$emailTemplate->setLanguage($l10n->getLanguageCode());
		$emailTemplate->setSubject($l10n->t('%1$s shared %2$s with you', [$senderDisplayName, $filename]));

		$emailTemplate->addHeader();
		$emailTemplate->addBodySender($senderDisplayName, $senderEmail ?? '');
		$emailTemplate->addHeading($l10n->t('%1$s shared %2$s with you', [$senderDisplayName, $filename]));

		if ($note !== '') {
			$emailTemplate->addBodyNote($note, $l10n->t('Note'));
		}

		$details = new EMailDetails($filename);
		if ($expiration !== null) {
			$details->addRow($l10n->t('Valid until'))->text((string)$l10n->l('date', $expiration, ['width' => 'medium']));
		}
		$details->addRow($l10n->t('Your login'))->text($guestEmail);
		$emailTemplate->addBodyDetails($details);

		$emailTemplate->addBodyText($l10n->t('Activate your guest account to open it.'));
		$emailTemplate->addBodyButtons([
			['text' => $l10n->t('Activate account'), 'url' => $passwordLink],
			['text' => $l10n->t('View share'), 'url' => $link],
		]);
		$emailTemplate->addFooter();

		return $emailTemplate;
	}

	private function composeInviteMessage(string $senderDisplayName, ?string $senderEmail, string $guestEmail, string $passwordLink, IL10N $l10n): IEMailTemplate {
		$emailTemplate = $this->mailer->createEMailTemplate('guest.invite');
		$emailTemplate->setLanguage($l10n->getLanguageCode());
		$emailTemplate->setSubject($l10n->t('%s invited you as a guest', [$senderDisplayName]));

		$emailTemplate->addHeader();
		$emailTemplate->addBodySender($senderDisplayName, $senderEmail ?? '');
		$emailTemplate->addHeading($l10n->t('%s invited you as a guest', [$senderDisplayName]));

		$details = new EMailDetails($this->defaults->getName());
		$details->addRow($l10n->t('Your login'))->text($guestEmail);
		$emailTemplate->addBodyDetails($details);

		$emailTemplate->addBodyText($l10n->t('Activate your guest account to get started.'));
		$emailTemplate->addBodyButton($l10n->t('Activate account'), $passwordLink);
		$emailTemplate->addFooter();

		return $emailTemplate;
	}
}
