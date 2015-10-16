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

$guestBackend = \OCA\Guests\Backend::createForStaticLegacyCode();
\OC::$server->getUserManager()->registerBackend($guestBackend);

// hide navigation entries for guests
$user = \OC::$server->getUserSession()->getUser();
if($user && $guestBackend->isGuest($user->getUID())) {
	\OCP\Util::addScript('guests', 'navigation');
}

\OCP\App::registerAdmin('guests', 'settings/admin');

\OCP\Util::connectHook('OC_Filesystem', 'preSetup', '\OCA\Guests\Hooks', 'preSetup');
\OCP\Util::connectHook('OCP\Share', 'pre_shared', '\OCA\Guests\Hooks', 'preShareHook');
\OCP\Util::connectHook('OCP\Share', 'post_shared', '\OCA\Guests\Hooks', 'postShareHook');

