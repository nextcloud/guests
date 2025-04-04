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

// Create mount point for the guest form dialog
const guestRoot = document.createElement('div')
guestRoot.setAttribute('id', 'guest-root')
document.body.appendChild(guestRoot)

// Initialize the guest form dialog and expose it
const guestForm = createApp(GuestForm)
	.mount('#guest-root') as InstanceType<typeof GuestForm>

OCA.Guests.openGuestDialog = (app: string, shareWith?: string) => {
	guestForm.populate({ app }, shareWith)
}

export { guestForm }
