<?php
/**
 * ownCloud
 *
 * @author Jörn Friedrich Dreyer <jfd@owncloud.com>
 * @copyright (C) 2015-2016 ownCloud, Inc.
 *
 * This code is covered by the ownCloud Commercial License.
 *
 * You should have received a copy of the ownCloud Commercial License
 * along with this program. If not, see <https://owncloud.com/licenses/owncloud-commercial/>.
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

// if the whitelist is used
if ($config->getAppValue('guests', 'usewhitelist', true)) {
	// hide navigation entries for guests
	$user = \OC::$server->getUserSession()->getUser();
	$jail = \OCA\Guests\Jail::createForStaticLegacyCode();
	if ($user && $jail->isGuest($user->getUID())) {
		\OCP\Util::addScript('guests', 'navigation');
	}
}

\OCP\App::registerAdmin('guests', 'settings/admin');

\OCP\Util::connectHook('OC_Filesystem', 'preSetup', '\OCA\Guests\Hooks', 'preSetup');

