import { validate } from 'email-validator'
import Vue from 'vue'

import GuestForm from './views/GuestForm.vue'
import Nextcloud from './mixins/Nextcloud.js'
import { showError } from '@nextcloud/dialogs'

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
