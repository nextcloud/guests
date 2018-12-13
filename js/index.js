import Vue from 'vue';
import GuestForm from './GuestForm.vue';
import ShareDialogPlugin from './ShareDialogPlugin';
import Nextcloud from './mixins/Nextcloud'

Vue.mixin(Nextcloud);

if (!OCA.Guests) {
	/**
	 * @namespace OCA.Guests
	 */
	OCA.Guests = {};
}

const guestForm = new Vue(GuestForm);

const root = document.createElement('div');
root.setAttribute('id', 'guest-root');
document.body.appendChild(root);
guestForm.$mount('#guest-root');

OC.Plugins.register('OC.Share.ShareDialogView', new ShareDialogPlugin(guestForm));
