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
			'name' => 'settings#getWhitelist',
			'url' => '/whitelist',
			'verb' => 'GET',
		],
		[
			'name' => 'settings#resetWhitelist',
			'url' => '/whitelist/reset',
			'verb' => 'POST',
		],
	],
];