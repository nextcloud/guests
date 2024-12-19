<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcDialog :name="t('guests', 'Convert guest to regular account')"
		:out-transition="true"
		size="small"
		@closing="cancel">
		<form id="transfer-guest-form"
			class="transfer-dialog__form"
			@submit.prevent="submit">
			<NcTextField ref="username"
				:value.sync="targetUserId"
				:label="t('guests', 'New account name')"
				:disabled="message"
				autocapitalize="none"
				autocomplete="off"
				spellcheck="false"
				pattern="[a-zA-Z0-9 _\.@\-']+"
				required />
		</form>

		<NcNoteCard v-if="message"
			type="info"
			show-alert>
			<p v-html="message" />
		</NcNoteCard>

		<template #actions>
			<NcButton type="tertiary"
				:disabled="loading"
				@click="cancel">
				{{ t('guests', 'Cancel') }}
			</NcButton>

			<NcButton type="primary"
				form="transfer-guest-form"
				:disabled="loading || message"
				native-type="submit">
				<template v-if="loading" #icon>
					<NcLoadingIcon :name="t('guests', 'Converting guest…')" />
				</template>
				{{ t('guests', 'Convert') }}
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
import { translate as t } from '@nextcloud/l10n'
import { showError } from '@nextcloud/dialogs'

import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcDialog from '@nextcloud/vue/dist/Components/NcDialog.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcNoteCard from '@nextcloud/vue/dist/Components/NcNoteCard.js'
import NcTextField from '@nextcloud/vue/dist/Components/NcTextField.js'

import { logger } from '../services/logger.ts'

const generateMessage = ({ source, target, status }: { source: string, target: string, status: 'waiting' | 'started' }) => {
	const matchStatus = {
		waiting: t('guests', 'Conversion of guest {strongStart}{guest}{strongEnd} to {strongStart}{user}{strongEnd} is pending', {
			guest: source,
			user: target,
			strongStart: '<strong>',
			strongEnd: '</strong>',
		}, undefined, { escape: false, sanitize: false }),

		started: t('guests', 'Conversion of guest {strongStart}{guest}{strongEnd} to {strongStart}{user}{strongEnd} has started', {
			guest: source,
			user: target,
			strongStart: '<strong>',
			strongEnd: '</strong>',
		}, undefined, { escape: false, sanitize: false }),
	}

	return matchStatus[status]
}

export default defineComponent({
	name: 'TransferGuestDialog',

	components: {
		NcButton,
		NcDialog,
		NcLoadingIcon,
		NcNoteCard,
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
			targetUserId: '',
			message: null,
		}
	},

	mounted() {
		this.$refs.username?.focus()
	},

	methods: {
		t,

		async submit() {
			this.loading = true
			const targetUserId = this.targetUserId
			try {
				const { data } = await axios.post(generateOcsUrl('/apps/guests/api/v1/transfer'), {
					guestUserId: this.user.id,
					targetUserId,
				})
				if (data.ocs?.meta?.statuscode === 201) {
					this.$emit('close', targetUserId)
				}
				if (data.ocs?.meta?.statuscode === 202) {
					this.message = generateMessage({
						source: data.ocs?.data?.source,
						target: data.ocs?.data?.target,
						status: data.ocs?.data?.status,
					})
				}
			} catch (error) {
				logger.error(error.response.data.ocs?.data?.message, { error })
				showError(error.response.data.ocs?.data?.message)
				this.$emit('close', null)
			}
			this.loading = false
		},

		cancel() {
			this.$emit('close', null)
		},
	},
})
</script>

<style lang="scss" scoped>
.transfer-dialog {
	&__form {
		margin-bottom: 8px;
	}
}
</style>
