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

return [
	'routes' => [
		[
			'name' => 'settings#getConfig',
			'url' => '/config',
			'verb' => 'GET',
		],
		[
			'name' => 'settings#setConfig',
			'url' => '/config',
			'verb' => 'PUT',
		],
		[
			'name' => 'settings#getApps',
			'url' => '/apps',
			'verb' => 'GET',
		],
	],
];