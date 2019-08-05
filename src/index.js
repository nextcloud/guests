import Vue from 'vue';
import GuestForm from './GuestForm.vue';
import ShareDialogPlugin from './ShareDialogPlugin';
import LanguageSelect from './LanguageSelect.vue';
import Nextcloud from './mixins/Nextcloud'
import vSelect from "vue-select";
import {Modal} from 'nextcloud-vue'

import 'vue-select/dist/vue-select.css';


Vue.mixin(Nextcloud);
Vue.component('LanguageSelect', LanguageSelect);
Vue.component('Modal', Modal);
Vue.component('v-select', vSelect);

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
