<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcDialog :name="t('guests', 'Transfer guest to new account')"
		:out-transition="true"
		size="small"
		@closing="cancel">
		<form id="transfer-guest-form"
			@submit.prevent="submit">
			<NcTextField ref="username"
				:value.sync="userId"
				:label="t('guests', 'Account name')"
				autocapitalize="none"
				autocomplete="off"
				spellcheck="false"
				pattern="[a-zA-Z0-9 _\.@\-']+"
				required />

			<NcPasswordField :value.sync="password"
				:minlength="minPasswordLength"
				:maxlength="469"
				:label="t('guests', 'Password')"
				autocapitalize="none"
				autocomplete="new-password"
				spellcheck="false"
				required />
		</form>

		<template #actions>
			<NcButton type="tertiary"
				:disabled="loading"
				@click="cancel">
				{{ t('guests', 'Cancel') }}
			</NcButton>

			<NcButton type="primary"
				form="transfer-guest-form"
				:disabled="loading"
				native-type="submit">
				<template v-if="loading" #icon>
					<NcLoadingIcon :name="t('guests', 'Transferring guest…')" />
				</template>
				{{ t('guests', 'Transfer') }}
			</NcButton>
		</template>
	</NcDialog>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { User } from '../types.ts'

import { defineComponent } from 'vue'
import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import { getCapabilities } from '@nextcloud/capabilities'
import { translate as t } from '@nextcloud/l10n'

import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcDialog from '@nextcloud/vue/dist/Components/NcDialog.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcPasswordField from '@nextcloud/vue/dist/Components/NcPasswordField.js'
import NcTextField from '@nextcloud/vue/dist/Components/NcTextField.js'

const minPasswordLength = getCapabilities()?.password_policy?.minLength

export default defineComponent({
	name: 'TransferGuestDialog',

	components: {
		NcButton,
		NcDialog,
		NcLoadingIcon,
		NcPasswordField,
		NcTextField,
	},

	props: {
		user: {
			type: Object as PropType<User>,
			default: () => ({}),
		},
	},

	data() {
		return {
			loading: false,
			userId: '',
			password: '',
			minPasswordLength,
		}
	},

	mounted() {
		this.$refs.username?.focus()
	},

	methods: {
		t,

		async submit() {
			this.loading = true
			const userId = this.userId
			try {
				await axios.put(generateOcsUrl('/apps/guests/api/v1/transfer'), {
					email: this.user.id, // Guest user id is an email
					userId,
					password: this.password,
				})
				this.$emit('close', this.userId)
			} catch (error) {
				this.$emit('close', false)
			}
			this.loading = false
		},

		cancel() {
			this.$emit('close', null)
		},
	},
})
</script>

<style lang="scss">

</style>
