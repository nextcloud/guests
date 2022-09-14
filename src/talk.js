import { validate } from 'email-validator'
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

// Init guests modal
const guestForm = new Vue(GuestForm)
const guestRoot = document.createElement('div')
guestRoot.setAttribute('id', 'guest-root')
document.body.appendChild(guestRoot)
guestForm.$mount('#guest-root')

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
