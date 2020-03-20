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

// routes are loaded after all apps are setup, thus we can abuse this file to do some delayed setup

use OCA\Guests\AppInfo\Application;

(\OC::$server->query(Application::class))->lateSetup();

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
	'ocs' => [
		[
			'name' => 'users#create',
			'url' => '/api/v1/users',
			'verb' => 'PUT'
		],
		[
			'name' => 'users#list',
			'url' => '/api/v1/users',
			'verb' => 'GET'
		],
		[
			'name' => 'users#get',
			'url' => '/api/v1/users/{userId}',
			'verb' => 'GET'
		],
		[
			'name' => 'API#languages',
			'url' => '/api/v1/languages',
			'verb' => 'GET'
		],
		[
			'name' => 'API#groups',
			'url' => '/api/v1/groups',
			'verb' => 'GET'
		]
	]
];
