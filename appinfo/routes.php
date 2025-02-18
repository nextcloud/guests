<?php

/**
 * SPDX-FileCopyrightText: 2019-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2017 ownCloud GmbH
 * SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
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
			'name' => 'users#transfer',
			'url' => '/api/v1/transfer',
			'verb' => 'POST',
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
