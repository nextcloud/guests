/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Vue from 'vue'

import GuestSettings from './views/GuestSettings.vue'
import Nextcloud from './mixins/Nextcloud.js'

Vue.mixin(Nextcloud)

const settings = new Vue(GuestSettings)
settings.$mount('#guest-settings')
