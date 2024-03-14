<?php
/**
 * @author Ilja Neumann <ineumann@owncloud.com>
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

use OC\Files\Filesystem;
use OCA\Files\Exception\TransferOwnershipException;
use OCA\Files\Service\OwnershipTransferService;
use OCA\Guests\AppInfo\Application;
use OCA\Guests\Storage\ReadOnlyJail;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\IAppContainer;
use OCP\AppFramework\QueryException;
use OCP\Constants;
use OCP\Files\Storage\IStorage;
use OCP\IConfig;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Notification\IManager as INotificationManager;
use OCP\Security\ICrypto;
use OCP\Share\Events\ShareCreatedEvent;
use OCP\Share\IManager as IShareManager;
use OCP\Share\IShare;
use OCP\User\Events\UserFirstTimeLoggedInEvent;
use Psr\Log\LoggerInterface;

class Hooks {

	/** @var LoggerInterface */
	private $logger;

	/** @var IUserSession */
	private $userSession;

	/** @var Mail */
	private $mail;

	/** @var IUserManager */
	private $userManager;

	/** @var ICrypto */
	private $crypto;

	/** @var GuestManager */
	private $guestManager;

	/** @var UserBackend */
	private $userBackend;

	/** @var IAppContainer */
	private $container;

	/** @var INotificationManager */
	private $notificationManager;
	/** @var IShareManager */
	private $shareManager;

	/** @var IConfig */
	private $config;

	public function __construct(
		LoggerInterface $logger,
		IUserSession $userSession,
		Mail $mail,
		IUserManager $userManager,
		IConfig $config,
		ICrypto $crypto,
		GuestManager $guestManager,
		UserBackend $userBackend,
		IAppContainer $container,
		INotificationManager $notificationManager,
		IShareManager $shareManager
	) {
		$this->logger = $logger;
		$this->userSession = $userSession;
		$this->mail = $mail;
		$this->userManager = $userManager;
		$this->config = $config;
		$this->crypto = $crypto;
		$this->guestManager = $guestManager;
		$this->userBackend = $userBackend;
		$this->container = $container;
		$this->notificationManager = $notificationManager;
		$this->shareManager = $shareManager;
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
				"ignoring share for itemType " . $share->getNodeType(),
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
			$this->logger->error("Failed to send guest activation mail", ['app' => Application::APP_ID, 'exception' => $e]);
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
		if ($this->config->getSystemValue('migrate_guest_user_data', false) === false) {
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

		try {
			/** @var OwnershipTransferService $ownershipTransferService */
			$ownershipTransferService = $this->container->get(OwnershipTransferService::class);
		} catch (QueryException $e) {
			$this->logger->error('Could not resolve ownership transfer service to import guest user data', [
				'exception' => $e,
			]);
			return;
		}

		$guestUser = $this->userManager->get($email);
		if ($guestUser === null) {
			$this->logger->warning("Guest user $email does not exist (anymore)");
			return;
		}
		try {
			$ownershipTransferService->transfer(
				$guestUser,
				$user,
				'/',
				null,
				true,
				true
			);
		} catch (TransferOwnershipException $e) {
			$this->logger->error('Could not import guest user data', [
				'exception' => $e,
			]);
		}

		// Update incomming shares
		$shares = $this->shareManager->getSharedWith($guestUser->getUID(), IShare::TYPE_USER);
		foreach ($shares as $share) {
			$share->setSharedWith($user->getUID());
			$this->shareManager->updateShare($share);
		}

		if ($this->config->getSystemValue('remove_guest_account_on_conversion', false) === false) {
			// Disable previous account
			$guestUser->setEnabled(false);
		} else {
			// Remove previous account
			$guestUser->delete();
		}

		$notification = $this->notificationManager->createNotification();
		$notification
			->setApp(Application::APP_ID)
			->setSubject('data_migrated_to_system_user')
			->setObject('user', $email)
			->setDateTime(new \DateTime())
			->setUser($user->getUID());
		$this->notificationManager->notify($notification);
	}
}
