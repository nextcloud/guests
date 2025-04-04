/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createAppConfig } from '@nextcloud/vite-config'

export default createAppConfig(
	{
		main: 'src/main.ts',
		settings: 'src/settings.ts',
		talk: 'src/talk.ts',
		users: 'src/users.ts',
		init: 'src/init.ts',
		contactsmenu: 'src/contactsmenu.ts',
	},
	{
		inlineCSS: {
			relativeCSSInjection: true,
		},
	},
)
