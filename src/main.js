/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { validate } from 'email-validator'
import { showError } from '@nextcloud/dialogs'
import { Type } from '@nextcloud/sharing'
import { guestForm } from './init.ts'
// entry in the sharing input search results
const result = {
	icon: 'icon-guests',
	displayName: t('guests', 'Invite guest'),
	shareType: Type.SHARE_TYPE_GUEST,
	handler: async self => {
		const user = self.suggestions.find(s => s.isNoUser === false && s.shareType === 0)
		return new Promise((resolve, reject) => {
			if (user) {
				showError(t('guests', 'A user with this ID or email address already exists'))
				reject(new Error('Impossible to create guest, a user with this ID or email address already exists'))
			} else {
				resolve(guestForm.populate(self.fileInfo, self.query))
			}
		})
	},
	condition: self => {
		return validate(self.query)
	},
}

// await page loading and init ShareSearch
window.addEventListener('DOMContentLoaded', () => {
	if (OCA.Sharing && OCA.Sharing.ShareSearch) {
		OCA.Sharing.ShareSearch.addNewResult(result)
	} else {
		console.error('OCA.Sharing.ShareSearch not ready')
	}
})
