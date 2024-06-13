/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { User } from './types.ts'

import { translate as t } from '@nextcloud/l10n'
import { subscribe } from '@nextcloud/event-bus'
import { showError, showSuccess, spawnDialog } from '@nextcloud/dialogs'

import SvgAccountArrowRight from '@mdi/svg/svg/account-arrow-right.svg?raw'

import TransferGuestDialog from './components/TransferGuestDialog.vue'

const transferGuest = async (event: MouseEvent, user: User): Promise<void> => {
	const handleResult = (result: boolean) => {
		if (!result) {
			showError(t('guests', 'Failed to transfer guest'))
			return
		}
		showSuccess(t('guests', 'Guest transferred to new account'))
	}

	spawnDialog(TransferGuestDialog, {
		user,
		// @ts-expect-error callback parameters are known
	}, handleResult)
}

const enabled = (user: User) => user?.backend === 'Guests'

const registerAction = () => {
	window.OCA.Settings.UserList.registerAction(
		SvgAccountArrowRight,
		t('guests', 'Transfer guest to full account'),
		transferGuest,
		enabled,
	)
}

subscribe('settings:user-management:loaded', registerAction)
