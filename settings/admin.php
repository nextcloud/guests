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

\OCP\Util::addScript('guests', 'guests');

$template = new \OCP\Template('guests', 'settings/admin');
return $template->fetchPage();
