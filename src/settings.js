import Vue from 'vue'

import GuestSettings from './views/GuestSettings'
import Nextcloud from './mixins/Nextcloud'

Vue.mixin(Nextcloud)

const settings = new Vue(GuestSettings)
settings.$mount('#guest-settings')
