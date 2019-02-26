import Vue from 'vue';
import GuestSettings from './GuestSettings.vue';
import Nextcloud from './mixins/Nextcloud';
import vSelect from 'vue-select';
import GuestList from './GuestList.vue';

Vue.component('v-select', vSelect);
Vue.component('guest-list', GuestList);

Vue.mixin(Nextcloud);

(new Vue(GuestSettings)).$mount('#guest-settings');
