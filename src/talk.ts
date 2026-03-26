/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { validate } from 'email-validator'
import { guestForm } from './init.ts'

// await page loading and init ShareSearch
window.addEventListener('DOMContentLoaded', () => {
	if (!window.OCA?.Talk?.registerParticipantSearchAction) {
		return
	}

	window.OCA.Talk.registerParticipantSearchAction({
		icon: 'icon-guests',
		label: t('guests', 'Invite guest'),
		show: validate,
		async callback(query) {
			return guestForm.populate({ app: 'talk' }, query)
		},
	})
})
