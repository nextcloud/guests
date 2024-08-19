/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { User } from './types.ts'

import { translate as t } from '@nextcloud/l10n'
import { subscribe } from '@nextcloud/event-bus'
import { showSuccess, spawnDialog } from '@nextcloud/dialogs'

import SvgAccountArrowRight from '@mdi/svg/svg/account-arrow-right.svg?raw'

import TransferGuestDialog from './components/TransferGuestDialog.vue'

const transferGuest = (_event: MouseEvent, user: User): void => {
	const onClose = (userId: null | string) => {
		if (userId === null) {
			return
		}
		showSuccess(t('guests', 'Guest will be converted to a regular account with the account name "{userId}" soon', { userId }))
	}

	spawnDialog(TransferGuestDialog, {
		user,
		// @ts-expect-error callback parameters are known
	}, onClose)
}

const enabled = (user: User) => user?.backend === 'Guests'

const registerAction = () => {
	window.OCA.Settings.UserList.registerAction(
		SvgAccountArrowRight,
		t('guests', 'Convert guest to regular account'),
		transferGuest,
		enabled,
	)
}

subscribe('settings:user-management:loaded', registerAction)
