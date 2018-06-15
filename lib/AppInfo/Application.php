<?php
/**
 * @copyright Copyright (c) 2017 Robin Appelman <robin@icewind.nl>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Guests\AppInfo;

use OC\Files\Filesystem;
use OC\NavigationManager;
use OC\Server;
use OCA\Guests\AppWhitelist;
use OCA\Guests\FilteredNavigationManager;
use OCA\Guests\GroupBackend;
use OCA\Guests\GuestManager;
use OCA\Guests\Hooks;
use OCA\Guests\Mail;
use OCA\Guests\UserBackend;
use OCP\AppFramework\App;
use OCP\AppFramework\IAppContainer;
use OCP\Defaults;

class Application extends App {
	public function __construct(array $urlParams = array()) {
		parent::__construct('guests', $urlParams);

		$container = $this->getContainer();

//		$container->registerService(GuestManager::class, function (IAppContainer $c) {
//			$server = $c->getServer();
//			return new GuestManager(
//				$server->getConfig(),
//				$server->getUserManager(),
//				$server->getSecureRandom(),
//				$server->getCrypto(),
//				$server->getGroupManager()
//			);
//		});

//		$container->registerService(AppWhitelist::class, function (IAppContainer $c) {
//			$server = $c->getServer();
//			return new AppWhitelist(
//				$server->getConfig(),
//				$c->query(GuestManager::class),
//				$server->getL10N('guests'),
//				$server->getAppManager()
//			);
//		});
//
//		$container->registerService(Mail::class, function (IAppContainer $c) {
//			$server = $c->getServer();
//			return new Mail(
//				$server->getConfig(),
//				$server->getLogger(),
//				$server->getUserSession(),
//				$server->getMailer(),
//				new Defaults(),
//				$server->getL10N('guests'),
//				$server->getUserManager(),
//				$server->getURLGenerator()
//			);
//		});
//
//		$container->registerService(Hooks::class, function (IAppContainer $c) {
//			$server = $c->getServer();
//			return new Hooks(
//				$server->getLogger(),
//				$server->getUserSession(),
//				$server->getRequest(),
//				$c->query(Mail::class),
//				$server->getUserManager(),
//				$server->getConfig(),
//				$server->getCrypto(),
//				$c->query(GuestManager::class)
//			);
//		});
	}

	public function setup() {
		$container = $this->getContainer();
		/** @var Server $server */
		$server = $container->getServer();

		$server->getUserManager()->registerBackend($container->query(UserBackend::class));

		$server->getEventDispatcher()->addListener(
			'OCA\Files::loadAdditionalScripts',
			function () {
				\OCP\Util::addScript('guests', 'vue');
				\OCP\Util::addScript('guests', 'app');
				\OCP\Util::addStyle('guests', 'app');
			}
		);

		$server->getGroupManager()->addBackend(new GroupBackend(
			$container->query(GuestManager::class),
			'guest_app'
		));
		/** @var Hooks $hooks */
		$hooks = $container->query(Hooks::class);
		\OCP\Util::connectHook('OCP\Share', 'post_shared', $hooks, 'postShareHook');
		\OCP\Util::connectHook('OC_Filesystem', 'preSetup', $hooks, 'setupReadonlyFilesystem');

		$userSession = $server->getUserSession();
		$user = $userSession->getUser();
		/** @var GuestManager $guestManager */
		$guestManager = $container->query(GuestManager::class);

		/** @var AppWhitelist $whiteList */
		$whiteList = $container->query(AppWhitelist::class);

		if ($user) {
			if ($guestManager->isGuest($user)) {
				// if the whitelist is used
				$whiteList->verifyAccess($user, $server->getRequest());

				\OCP\Util::addStyle('guests', 'personal');

				/** @var NavigationManager $navManager */
				$navManager = $server->getNavigationManager();

				$server->registerService('NavigationManager', function () use ($navManager, $user, $whiteList) {
					return new FilteredNavigationManager($user, $navManager, $whiteList);
				});
			}
		} else {
			$userSession->listen('\OC\User', 'postLogin', function () use ($userSession, $server, $whiteList) {
				$whiteList->verifyAccess($userSession->getUser(), $server->getRequest());
			});
		}
	}
}
