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

$userBackend = \OCA\Guests\UserBackendFactory::createForStaticLegacyCode();
\OC_User::useBackend($userBackend);

\OCP\Util::connectHook('OC_Filesystem', 'preSetup', '\OCA\Guests\Hooks', 'preSetup');
\OCP\Util::connectHook('OCP\Share', 'pre_shared', '\OCA\Guests\Hooks', 'preShareHook');
\OCP\Util::connectHook('OCP\Share', 'post_shared', '\OCA\Guests\Hooks', 'postShareHook');
