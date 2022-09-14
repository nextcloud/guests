import Vue from 'vue'

import GuestSettings from './views/GuestSettings.vue'
import Nextcloud from './mixins/Nextcloud.js'

Vue.mixin(Nextcloud)

const settings = new Vue(GuestSettings)
settings.$mount('#guest-settings')
