/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createApp } from 'vue'
import GuestForm from './views/GuestForm.vue'

if (!OCA.Guests) {
	/**
	 */
	OCA.Guests = {}
}

// NC appends a `?v=...` cache-buster to the script-tag URL but the
// bundled `import` from main.ts doesn't, so this module loads twice.
// Reuse the first mount instead of creating a second Vue app. See #1555.
let guestForm: InstanceType<typeof GuestForm>
if (OCA.Guests._guestForm) {
	guestForm = OCA.Guests._guestForm
} else {
	const guestRoot = document.createElement('div')
	guestRoot.setAttribute('id', 'guest-root')
	document.body.appendChild(guestRoot)

	guestForm = createApp(GuestForm)
		.mount('#guest-root') as InstanceType<typeof GuestForm>

	OCA.Guests._guestForm = guestForm
}

OCA.Guests.openGuestDialog = (app: string, shareWith?: string) => {
	guestForm.populate({ app }, shareWith)
}

export { guestForm }
