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

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\ILogger;
use OCP\IRequest;
use OCP\IUserManager;
use OCP\IUserSession;



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
	 * @var IGroupManager
	 */
	private $groupManager;
	/**
	 * @var IUserManager
	 */
	private $userManager;

	/**
	 * Hooks constructor.
	 *
	 * @param ILogger $logger
	 * @param IUserSession $userSession
	 * @param IRequest $request
	 * @param Mail $mail
	 * @param IGroupManager $groupManager
	 * @param IConfig $config
	 * @internal param GuestMapper $mapper
	 */
	public function __construct(
		ILogger $logger,
		IUserSession $userSession,
		IRequest $request,
		Mail $mail,
		IGroupManager $groupManager,
		IUserManager $userManager,
		IConfig $config
	) {
		$this->logger = $logger;
		$this->userSession = $userSession;
		$this->request = $request;
		$this->mail = $mail;
		$this->groupManager = $groupManager;
		$this->userManager = $userManager;
		$this->config = $config;
	}

	/**
	 * @var Hooks
	 */
	private static $instance;

	/**
	 * @deprecated use DI
	 * @return Hooks
	 */
	public static function createForStaticLegacyCode() {
		if (!self::$instance) {
			$logger = \OC::$server->getLogger();

			self::$instance = new Hooks(
				$logger,
				\OC::$server->getUserSession(),
				\OC::$server->getRequest(),
				Mail::createForStaticLegacyCode(),
				\OC::$server->getGroupManager(),
				\OC::$server->getUserManager(),
				\OC::$server->getConfig()
			);
		}
		return self::$instance;
	}

	/**
	 * jail into readonly storage
	 * @param array $params
	 */
	static public function preSetup($params) {
		if (!empty($params['user'])) {
			$hook = self::createForStaticLegacyCode();
			$hook->handlePreSetup($params['user']);
		}
	}

	public function handlePreSetup($uid) {
	}

	/**
	 * generate guest password if new
	 *
	 * @param array $params
	 * @throws \Exception
	 */
	static public function postShareHook($params) {
		$hook = self::createForStaticLegacyCode();
		$hook->handlePostShare(
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

		/*
		if ($shareType !== Share::SHARE_TYPE_USER ||
				!filter_var($shareWith, FILTER_VALIDATE_EMAIL)
		) {
			return; // only email guests need to receive password reset and
			// share notification mails. other guest types can configure
			// notification behavior themselves. email guests cannot
			// yet be part of a group, so we only need to take action
			// when an email guest is receiving a share
		}
		*/


		if (!($itemType === 'folder' || $itemType === 'file')) {
			$this->logger->debug(
				"ignoring share for itemType '$itemType'",
				['app'=>'guests']
			);

			return;
		}


		$user = $this->userSession->getUser();

		if (!$user) {
			throw new \Exception(
				'post_share hook triggered without user in session'
			);
		}

		$uid = $user->getUID();
		$guestGroup = $this->config->getAppValue('guests', 'group');

		if (!$this->groupManager->isInGroup($shareWith, $guestGroup)) {
			$this->logger->debug(
				"ignoring user '$shareWith', not a guest",
				['app'=>'guests']
			);

			return;
		}


		$this->logger->debug("checking if '$shareWith' has a password",
			['app'=>'guests']);


		$passwordToken = $this->config->getUserValue(
			$shareWith,
			'owncloud',
			'lostpassword',
			null
		);

		\OCP\Share::setPermissions(
			$itemType,
			$itemSource,
			$shareType,
			$shareWith,
		    3
		);

		try {
			if ($passwordToken) {
				$exploded = explode(':', $passwordToken);
				// send invitation
				$this->mail->sendGuestInviteMail(
					$uid, $shareWith, $itemType, $itemSource, $exploded[1]
				);
			} else {
				// always notify guests of new files
				$guest = $this->userManager->get($shareWith);
				$this->mail->sendShareNotification(
					$this->userSession->getUser(), $guest, $itemType, $itemSource
				);
			}

			#165
		} catch (DoesNotExistException $ex) {
			$this->logger->error("'$shareWith' does not exist", ['app'=>'guests']);
		}
	}
}