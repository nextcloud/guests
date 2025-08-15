<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Service;

use OCA\Guests\Mail;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IConfig;
use OCP\Security\ICrypto;
use OCP\Share\IShare;
use Psr\Log\LoggerInterface;

class InviteService {
	public function __construct(
		private LoggerInterface $logger,
		private IConfig $config,
		private ICrypto $crypto,
		private Mail $mail,
	) {
	}

	public function sendInvite(string $userId, string $guest, ?IShare $share = null): bool {
		$passwordToken = $this->config->getUserValue($guest, 'core', 'lostpassword', null);

		if (!$passwordToken) {
			return false;
		}

		try {
			// user has not yet activated his account
			$decryptedToken = $this->crypto->decrypt($passwordToken, strtolower($guest) . $this->config->getSystemValue('secret'));
			[, $token] = explode(':', $decryptedToken);
			$lang = $this->config->getUserValue($guest, 'core', 'lang', '');
			// send invitation
			$this->mail->sendGuestInviteMail(
				$userId,
				$guest,
				$token,
				$lang,
				$share
			);

			if ($share) {
				$share->setMailSend(false);
			}
		} catch (DoesNotExistException $ex) {
			$this->logger->error("'$guest' does not exist");
		} catch (\Exception $e) {
			$this->logger->error('Failed to send guest activation mail', ['exception' => $e]);
		}

		return true;
	}
}
