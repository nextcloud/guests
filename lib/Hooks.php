<?php
/**
 * SPDX-FileCopyrightText: 2017-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2017 ownCloud GmbH
 * SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
 */

namespace OCA\Guests;

use OC\Files\Filesystem;
use OCA\Guests\AppInfo\Application;
use OCA\Guests\Storage\ReadOnlyJail;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\IAppContainer;
use OCP\Constants;
use OCP\Files\Storage\IStorage;
use OCP\IConfig;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Security\ICrypto;
use OCP\Share\Events\ShareCreatedEvent;
use OCP\User\Events\UserFirstTimeLoggedInEvent;
use Psr\Log\LoggerInterface;

class Hooks {
	public function __construct(
		private LoggerInterface $logger,
		private IUserSession $userSession,
		private Mail $mail,
		private IUserManager $userManager,
		private IConfig $config,
		private ICrypto $crypto,
		private GuestManager $guestManager,
		private UserBackend $userBackend,
		private IAppContainer $container,
		private TransferService $transferService,
	) {
	}

	public function handlePostShare(ShareCreatedEvent $event): void {
		$share = $event->getShare();

		$shareWith = $share->getSharedWith();
		$isGuest = $this->guestManager->isGuest($shareWith);

		if (!$isGuest) {
			$this->logger->debug(
				"ignoring user '$shareWith', not a guest",
				['app' => Application::APP_ID]
			);

			return;
		}

		if (!($share->getNodeType() === 'folder' || $share->getNodeType() === 'file')) {
			$this->logger->debug(
				'ignoring share for itemType ' . $share->getNodeType(),
				['app' => Application::APP_ID]
			);

			return;
		}


		$user = $this->userSession->getUser();
		$targetUser = $this->userManager->get($shareWith);

		if (!$user) {
			throw new \Exception(
				'post_share hook triggered without user in session'
			);
		}

		$this->logger->debug("checking if '$shareWith' has a password",
			['app' => Application::APP_ID]);


		$passwordToken = $this->config->getUserValue(
			$shareWith,
			'core',
			'lostpassword',
			null
		);

		$uid = $user->getUID();

		try {
			if ($passwordToken) {
				// user has not yet activated his account

				$decryptedToken = $this->crypto->decrypt($passwordToken, strtolower($targetUser->getEMailAddress()) . $this->config->getSystemValue('secret'));
				[, $token] = explode(':', $decryptedToken);
				$lang = $this->config->getUserValue($targetUser->getUID(), 'core', 'lang', '');
				// send invitation
				$this->mail->sendGuestInviteMail(
					$uid,
					$shareWith,
					$share,
					$token,
					$lang
				);
				$share->setMailSend(false);
			}
		} catch (DoesNotExistException $ex) {
			$this->logger->error("'$shareWith' does not exist", ['app' => Application::APP_ID]);
		} catch (\Exception $e) {
			$this->logger->error('Failed to send guest activation mail', ['app' => Application::APP_ID, 'exception' => $e]);
		}
	}

	public function setupReadonlyFilesystem(array $params): void {
		$uid = $params['user'];
		$user = $this->userManager->get($uid);

		if ($user && $this->guestManager->isGuest($user)) {
			Filesystem::addStorageWrapper('guests.readonly', function ($mountPoint, IStorage $storage) use ($uid) {
				if ($mountPoint === "/$uid/") {
					return new ReadOnlyJail([
						'storage' => $storage,
						'mask' => Constants::PERMISSION_READ,
						'path' => 'files'
					]);
				} else {
					return $storage;
				}
			});
		}
	}

	public function handleFirstLogin(UserFirstTimeLoggedInEvent $event): void {
		if (!$this->config->getSystemValueBool('migrate_guest_user_data', false)) {
			return;
		}

		/** @var IUser $user */
		$user = $event->getUser();
		$this->logger->debug('User ' . $user->getUID() . ' logged in for the very first time. Checking guests data import.');

		$email = $user->getEMailAddress();
		if ($email === null) {
			$this->logger->info('User ' . $user->getUID() . ' does not have an email address set. Skipping guests data import.');
			return;
		}

		if (!$this->userBackend->userExists($email)) {
			$this->logger->info('No guest user for ' . $email . ' found. Skipping guests data import.');
			return;
		}

		if (strtolower($email) === strtolower($user->getUID())) {
			// This is the guest user, logging in for the very first time
			return;
		}

		$guestUser = $this->userManager->get($email);
		if ($guestUser === null) {
			$this->logger->warning("Guest user $email does not exist (anymore)");
			return;
		}

		$this->transferService->transfer($guestUser, $user);

		if (!$this->config->getSystemValueBool('remove_guest_account_on_conversion', false)) {
			// Disable previous account
			$guestUser->setEnabled(false);
		} else {
			// Remove previous account
			$guestUser->delete();
		}
	}
}
