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
use OCP\IUserManager;
use OCP\Security\ICrypto;
use OCP\Share\IShare;
use Psr\Log\LoggerInterface;

class InviteService {
	public function __construct(
		private readonly LoggerInterface $logger,
		private readonly IConfig $config,
		private readonly ICrypto $crypto,
		private readonly IUserManager $userManager,
		private readonly Mail $mail,
	) {
	}

	public function sendInvite(string $userId, string $guest, ?IShare $share = null): bool {
		$passwordToken = $this->config->getUserValue($guest, 'core', 'lostpassword', null);

		if (!$passwordToken) {
			$this->logger->warning('No password token found for guest "' . $guest . '", skipping invitation email');
			return false;
		}

		try {
			$targetUser = $this->userManager->get($guest);
			if ($targetUser === null) {
				$this->logger->error('Guest user "' . $guest . '" not found');
				return false;
			}

			$decryptedToken = $this->crypto->decrypt(
				$passwordToken,
				strtolower($targetUser->getEMailAddress()) . $this->config->getSystemValue('secret')
			);
			[, $token] = explode(':', $decryptedToken);
			$lang = $this->config->getUserValue($guest, 'core', 'lang', '');
			$this->mail->sendGuestInviteMail(
				$userId,
				$guest,
				$token,
				$lang,
				$share
			);

			if ($share instanceof IShare) {
				$share->setMailSend(false);
			}
		} catch (DoesNotExistException) {
			$this->logger->error('"' . $guest . '" does not exist');
		} catch (\Exception $e) {
			$this->logger->error('Failed to send guest activation mail', ['exception' => $e]);
		}

		return true;
	}
}
