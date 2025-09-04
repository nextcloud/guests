/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Vue from 'vue'

import GuestForm from './views/GuestForm.vue'
import Nextcloud from './mixins/Nextcloud.js'

Vue.mixin(Nextcloud)

if (!OCA.Guests) {
	/**
	 * @namespace OCA.Guests
	 */
	OCA.Guests = {}
}

const guestForm = new Vue(GuestForm)
const guestRoot = document.createElement('div')
guestRoot.setAttribute('id', 'guest-root')
document.body.appendChild(guestRoot)
guestForm.$mount('#guest-root')

OCA.Guests.openGuestDialog = (app: string, shareWith?: string) => {
	guestForm.populate({ app }, shareWith)
}

export { guestForm }
