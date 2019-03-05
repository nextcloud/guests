import Vue from 'vue';
import GuestSettings from './GuestSettings.vue';
import Nextcloud from './mixins/Nextcloud';
import vSelect from 'vue-select';
import GuestList from './GuestList.vue';
import GuestDetails from './GuestDetails.vue';

Vue.component('v-select', vSelect);
Vue.component('guest-list', GuestList);
Vue.component('guest-details', GuestDetails);

Vue.mixin(Nextcloud);

(new Vue(GuestSettings)).$mount('#guest-settings');
