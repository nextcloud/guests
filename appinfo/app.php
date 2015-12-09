<?php
/**
 * ownCloud
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING-AGPL file.
 *
 * @author Jörn Friedrich Dreyer <jfd@butonic.de>
 * @copyright Jörn Friedrich Dreyer 2015
 */

$config = \OC::$server->getConfig();
// Only register guest user backend if contacts should be treated as guests
$conditions = $config->getAppValue('guests', 'conditions', 'quota');
$conditions = explode(',',$conditions);
if (in_array('contact', $conditions)) {
	$guestBackend = \OCA\Guests\Backend::createForStaticLegacyCode();
	\OC::$server->getUserManager()->registerBackend($guestBackend);

	// HACK to add contact before sharing code checks if the user exists
	if (isset($_SERVER['PATH_INFO']) && $_SERVER['PATH_INFO'] === '/core/ajax/share.php'
		&& isset($_POST['action']) && $_POST['action'] === 'share'
		&& isset($_POST['shareType']) && $_POST['shareType'] == '0'
		&& isset($_POST['shareWith']) && filter_var($_POST['shareWith'], FILTER_VALIDATE_EMAIL)
			&& !$guestBackend->userExists($_POST['shareWith'])
	) {
		$mapper = new \OCA\Guests\Db\GuestMapper(
				\OC::$server->getDatabaseConnection(),
				\OC::$server->getLogger()
		);
		$guest = new \OCA\Guests\Db\Guest($_POST['shareWith'], null);
		$mapper->insert($guest);
	}
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
// TODO add a proper hook to core. pre_shared requires the user to exist, so we need to do the ugly hack above
//\OCP\Util::connectHook('OCP\Share', 'pre_shared', '\OCA\Guests\Hooks', 'preShareHook');
\OCP\Util::connectHook('OCP\Share', 'post_shared', '\OCA\Guests\Hooks', 'postShareHook');

