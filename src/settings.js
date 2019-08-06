import Vue from 'vue';
import GuestSettings from './GuestSettings.vue';
import Nextcloud from './mixins/Nextcloud';
import GuestList from './GuestList.vue';
import GuestDetails from './GuestDetails.vue';
import {Multiselect} from "nextcloud-vue";
import 'vue-select/dist/vue-select.css';

Vue.component('guest-list', GuestList);
Vue.component('guest-details', GuestDetails);
Vue.component('Multiselect', Multiselect);

Vue.mixin(Nextcloud);

(new Vue(GuestSettings)).$mount('#guest-settings');
