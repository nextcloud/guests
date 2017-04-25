<?php
/**
 * @author Jörn Friedrich Dreyer <jfd@butonic.de>
 * @author Ilja Neumann <ineumann@owncloud.com>
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

\OC::$server->getEventDispatcher()->addListener(
	'OCA\Files::loadAdditionalScripts',
	function() {
		\OCP\Util::addScript('guests', 'vue');
		\OCP\Util::addScript('guests', 'app');
		\OCP\Util::addStyle('guests', 'app');
	}
);

$config = \OC::$server->getConfig();
$groupName = $config->getAppValue('guests', 'group', 'guest_app');

\OC::$server->getGroupManager()->addBackend(new \OCA\Guests\GroupBackend($groupName));
\OCP\Util::connectHook('OCP\Share', 'post_shared', '\OCA\Guests\Hooks', 'postShareHook');


$user = \OC::$server->getUserSession()->getUser();

if ($user) {
    // if the whitelist is used
	if ($config->getAppValue('guests', 'usewhitelist', 'true') === 'true') {
		\OCP\Util::connectHook('OC_Filesystem', 'preSetup', '\OCA\Guests\AppWhitelist', 'preSetup');
	}

	// hide email change field via css for learned guests
	if ($user->getBackendClassName() === 'Guests') {
		\OCP\Util::addStyle('guests', 'personal');
	}
}