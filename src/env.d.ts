/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

type User = import('./types.ts').User

type Action = (event: MouseEvent, user: User) => void

type Enabled = (user: User) => boolean

type RegisterAction = (icon: string, text: string, action: Action, enabled: Enabled) => void

declare global {
	interface Window {
		OCA: {
			Settings: {
				UserList: {
					registerAction: RegisterAction,
				},
			},
		},
	}
}

export {}
