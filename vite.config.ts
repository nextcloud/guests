/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createAppConfig } from '@nextcloud/vite-config'

export default createAppConfig({
	main: 'src/main.js',
	settings: 'src/settings.js',
	talk: 'src/talk.js',
	users: 'src/users.ts',
	init: 'src/init.ts',
	contactsmenu: 'src/contactsmenu.ts'
},
{
	inlineCSS: {
		relativeCSSInjection: true,
	},
})
