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

$config = \OC::$server->getConfig();

// TODO fix load order or introduce hook in core
// force loading of ldap user backend if it is enabled
if (\OCP\App::isEnabled('user_ldap')) {
	\OC_App::loadApp('user_ldap');
}

// Only register guest user backend if contacts should be treated as guests
$conditions = $config->getAppValue('guests', 'conditions', 'quota');
$conditions = explode(',', $conditions);
if (in_array('contact', $conditions)) {
	$guestBackend = \OCA\Guests\Backend::createForStaticLegacyCode();
	\OC::$server->getUserManager()->registerBackend($guestBackend);

	// TODO add a proper hook to core. pre_shared requires the user to exist,
	//  so we need to do the ugly hack in $guestBackend->interceptShareRequest();
	//\OCP\Util::connectHook('OCP\Share', 'pre_shared', '\OCA\Guests\Hooks', 'preShareHook');
	$guestBackend->interceptShareRequest();
	\OCP\Util::connectHook('OCP\Share', 'post_shared', '\OCA\Guests\Hooks', 'postShareHook');
}


\OCP\Util::connectHook('OC_Filesystem', 'preSetup', '\OCA\Guests\Hooks', 'preSetup');

// --- register js for user management------------------------------------------
\OCP\Util::addScript('guests', 'app');

$user = \OC::$server->getUserSession()->getUser();
if ($user) {
    // if the whitelist is used
	if ($config->getAppValue('guests', 'usewhitelist', 'true') === 'true') {
		// hide navigation entries for guests
		$jail = \OCA\Guests\Jail::createForStaticLegacyCode();
		if ($jail->isGuest($user->getUID())) {
			\OCP\Util::addScript('guests', 'navigation');
		}
	}

	// hide email change field via css for learned guests
	if ($user->getBackendClassName() === 'Guests') {
		\OCP\Util::addStyle('guests', 'personal');
	}

	if (\OC::$server->getGroupManager()->isAdmin($user->getUID())) {
		\OCP\App::registerAdmin('guests', 'settings/admin');
	}
}