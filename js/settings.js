import Vue from 'vue';
import GuestSettings from './GuestSettings.vue';
import Nextcloud from './mixins/Nextcloud';
import vSelect from 'vue-select';

Vue.component('v-select', vSelect);

Vue.mixin(Nextcloud);

(new Vue(GuestSettings)).$mount('#guest-settings');
