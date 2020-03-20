import { validate } from 'email-validator'
import Vue from 'vue'

import GuestForm from './views/GuestForm.vue'
import Nextcloud from './mixins/Nextcloud'

Vue.mixin(Nextcloud)

if (!OCA.Guests) {
	/**
	 * @namespace OCA.Guests
	 */
	OCA.Guests = {}
}

// Init guests modal
const guestForm = new Vue(GuestForm)
const guestRoot = document.createElement('div')
guestRoot.setAttribute('id', 'guest-root')
document.body.appendChild(guestRoot)
guestForm.$mount('#guest-root')

// entry in the sharing input search results
const result = {
	icon: 'icon-guests',
	displayName: t('guests', 'Invite guest'),
	handler: async self => {
		return guestForm.populate(self.fileInfo, self.query)
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
