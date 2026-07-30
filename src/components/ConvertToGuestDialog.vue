<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcDialog
		:name="t('guests', 'Convert to guest account')"
		:outTransition="true"
		size="small"
		@closing="cancel">
		<NcNoteCard type="warning">
			{{ t('guests', 'The account "{userId}" will be converted into a guest account. It keeps its login name and password but becomes a limited guest account, restricted to the apps allowed for guests.', { userId: String(user.id) }) }}
		</NcNoteCard>
		<p class="convert-dialog__hint">
			{{ t('guests', 'This is only possible for accounts that have never logged in. It cannot be undone automatically.') }}
		</p>

		<template #actions>
			<NcButton
				variant="tertiary"
				:disabled="loading"
				@click="cancel">
				{{ t('guests', 'Cancel') }}
			</NcButton>

			<NcButton
				variant="error"
				:disabled="loading"
				@click="submit">
				<template v-if="loading" #icon>
					<NcLoadingIcon :name="t('guests', 'Converting account…')" />
				</template>
				{{ t('guests', 'Convert to guest') }}
			</NcButton>
		</template>
	</NcDialog>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { User } from '../types.ts'

import axios from '@nextcloud/axios'
import { showError } from '@nextcloud/dialogs'
import { translate as t } from '@nextcloud/l10n'
import { generateOcsUrl } from '@nextcloud/router'
import { defineComponent } from 'vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcDialog from '@nextcloud/vue/components/NcDialog'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import NcNoteCard from '@nextcloud/vue/components/NcNoteCard'
import { logger } from '../services/logger.ts'

export default defineComponent({
	name: 'ConvertToGuestDialog',

	components: {
		NcButton,
		NcDialog,
		NcLoadingIcon,
		NcNoteCard,
	},

	props: {
		user: {
			type: Object as PropType<User>,
			default: () => ({}),
		},
	},

	emits: ['close'],

	data() {
		return {
			loading: false,
		}
	},

	methods: {
		t,

		async submit(): Promise<void> {
			this.loading = true
			const userId = String(this.user.id)
			try {
				await axios.post(generateOcsUrl('/apps/guests/api/v1/convert'), { userId })
				this.$emit('close', userId)
			} catch (error: unknown) {
				const message = (error as { response?: { data?: { ocs?: { data?: { message?: string } } } } })
					?.response?.data?.ocs?.data?.message
				logger.error(message ?? 'Failed to convert account to guest', { error })
				showError(message ?? t('guests', 'An error occurred while converting the account'))
				this.$emit('close', null)
			}
			this.loading = false
		},

		cancel(): void {
			this.$emit('close', null)
		},
	},
})
</script>

<style lang="scss" scoped>
.convert-dialog__hint {
	margin-top: 8px;
}
</style>
