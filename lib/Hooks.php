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
use OCA\Guests\Storage\ReadOnlyJail;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\Constants;
use OCP\Files\IHomeStorage;
use OCP\Files\Storage\IStorage;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\ILogger;
use OCP\IRequest;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Security\ICrypto;


class Hooks {

	/**
	 * @var ILogger
	 */
	private $logger;

	/**
	 * @var IUserSession
	 */
	private $userSession;
	/**
	 * @var IRequest
	 */
	private $request;

	/**
	 * @var Mail
	 */
	private $mail;

	/**
	 * @var IUserManager
	 */
	private $userManager;

	/**
	 * @var ICrypto
	 */
	private $crypto;

	/** @var GuestManager */
	private $guestManager;

	public function __construct(
		ILogger $logger,
		IUserSession $userSession,
		IRequest $request,
		Mail $mail,
		IUserManager $userManager,
		IConfig $config,
		ICrypto $crypto,
		GuestManager $guestManager
	) {
		$this->logger = $logger;
		$this->userSession = $userSession;
		$this->request = $request;
		$this->mail = $mail;
		$this->userManager = $userManager;
		$this->config = $config;
		$this->crypto = $crypto;
		$this->guestManager = $guestManager;
	}

	/**
	 * generate guest password if new
	 *
	 * @param array $params
	 * @throws \Exception
	 */
	public function postShareHook($params) {
		$this->handlePostShare(
			$params['shareType'],
			$params['shareWith'],
			$params['itemType'],
			$params['itemSource']
		);
	}

	public function handlePostShare(
		$shareType,
		$shareWith,
		$itemType,
		$itemSource
	) {


		$isGuest = $this->config->getUserValue(
			$shareWith,
			'nextcloud',
			'isGuest',
			false
		);

		if (!$isGuest) {
			$this->logger->debug(
				"ignoring user '$shareWith', not a guest",
				['app' => 'guests']
			);

			return;
		}

		if (!($itemType === 'folder' || $itemType === 'file')) {
			$this->logger->debug(
				"ignoring share for itemType '$itemType'",
				['app' => 'guests']
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
			['app' => 'guests']);


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

				$decryptedToken = $this->crypto->decrypt($passwordToken, $targetUser->getEMailAddress() . $this->config->getSystemValue('secret'));
				list(, $token) = explode(':', $decryptedToken);
				// send invitation
				$this->mail->sendGuestInviteMail(
					$uid,
					$shareWith,
					$itemType,
					$itemSource,
					$token
				);
			} else {
				// always notify guests of new files
				$guest = $this->userManager->get($shareWith);

				if (!$guest) {
					throw new DoesNotExistException("$shareWith does not exist");
				}

				$this->mail->sendShareNotification(
					$this->userSession->getUser(),
					$guest,
					$itemType,
					$itemSource
				);
			}
		} catch (DoesNotExistException $ex) {
			$this->logger->error("'$shareWith' does not exist", ['app' => 'guests']);
		}
	}

	public function setupReadonlyFilesystem(array $params) {
		$user = $params['user'];

		if ($this->guestManager->isReadOnlyUser($user)) {
			Filesystem::addStorageWrapper('readonly', function ($mountPoint, IStorage $storage) use ($user) {
				if ($mountPoint === "/$user/") {
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
}
