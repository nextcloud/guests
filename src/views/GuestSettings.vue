<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div>
		<NcSettingsSection :name="t('guests', 'Guests')"
			:description="t('guests', 'Guest accounts are grouped under a virtual group in the account manager')">
			<!-- Guests usage description -->
			<NcNoteCard type="info">
				{{ t('guests', 'Guests are simple, limited accounts you can give to people outside your Nextcloud instance.') }}
				{{ t('guests', 'They do not get their own storage, but can log in and work together on files, folders and chats you share with them.') }}
				{{ t('guests', 'Guests are always identified as such, to make it clear who is part of your team and who is an external collaborator.') }}
				{{ t('guests', 'Use them when you want to collaborate with friends, clients or partners without having to create full user accounts.') }}
			</NcNoteCard>

			<!-- Status messages -->
			<div>
				<span v-if="error || saving || saved"
					:class="{error, saving, saved}"
					class="msg">{{ statusText }}</span>
			</div>

			<!-- Sharing restricted to groups warning -->
			<div v-if="config.sharingRestrictedToGroup" class="warning">
				<p>
					{{ t('guests', 'Creating guests accounts is restricted while "Restrict accounts to only share with accounts in their groups" is enabled.') }}
				</p>
				<p>
					{{ t('guests', 'Only group admins are allowed to create guests and guests must be added to at least one group the share creator is a group admin for.') }}
				</p>
			</div>

			<!-- Settings -->
			<div v-if="loaded">
				<NcCheckboxRadioSwitch :checked.sync="config.allowExternalStorage"
					type="switch"
					@update:checked="saveConfig">
					{{ t('guests', 'Guest accounts can access mounted external storages') }}
				</NcCheckboxRadioSwitch>

				<NcCheckboxRadioSwitch :checked.sync="config.hideUsers"
					type="switch"
					@update:checked="saveConfig">
					{{ t('guests', 'Hide other accounts from guests') }}
				</NcCheckboxRadioSwitch>

				<NcNoteCard v-if="config.hideUsers" type="warning">
					{{ t('guests', 'Guests will still be able to see accounts from any group they are added to') }}
				</NcNoteCard>

				<!-- Restrict guest creation to groups -->
				<NcCheckboxRadioSwitch :checked="config.createRestrictedToGroup.length > 0"
					type="switch"
					@update:checked="onGroupRestrictToggle">
					{{ t('guests', 'Limit guest account creation to the following groups only') }}
				</NcCheckboxRadioSwitch>

				<p v-if="config.createRestrictedToGroup.length > 0">
					<NcSettingsSelectGroup :label="t('guests', 'Limit guest account creation to the following groups only')"
						:model-value="config.createRestrictedToGroup"
						:placeholder="t('guests', 'Select groups to allow')"
						@update:model-value="onSelectGroups" />
				</p>

				<!-- Allowlist -->
				<NcCheckboxRadioSwitch :checked.sync="config.useWhitelist"
					type="switch"
					@update:checked="saveConfig">
					{{ t('guests', 'Limit guest access to an app\'s allowlist') }}
				</NcCheckboxRadioSwitch>

				<p v-if="config.useWhitelist" class="allowlist">
					<NcSelect v-model="config.whitelist"
						:options="config.whiteListableApps"
						:multiple="true"
						:close-on-select="false"
						:clear-search-on-select="false"
						@input="saveConfig" />
					<NcButton type="secondary" class="reset-button" @click="reset">
						<template #icon>
							<History :size="16" />
						</template>
						{{ t('guests', 'Reset allowlist') }}
					</NcButton>
				</p>
			</div>
			<div v-if="!loaded">
				<div class="loading" />
			</div>
		</NcSettingsSection>

		<!-- Guest list -->
		<GuestList />
	</div>
</template>

<script>
import { clearTimeout, setTimeout } from 'timers'
import { generateUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'

import History from 'vue-material-design-icons/History.vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcNoteCard from '@nextcloud/vue/components/NcNoteCard'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcSettingsSection from '@nextcloud/vue/components/NcSettingsSection'
import NcSettingsSelectGroup from '@nextcloud/vue/components/NcSettingsSelectGroup'

import GuestList from '../components/GuestList.vue'
import { showError } from '@nextcloud/dialogs'

export default {
	name: 'GuestSettings',
	components: {
		GuestList,
		History,
		NcButton,
		NcCheckboxRadioSwitch,
		NcNoteCard,
		NcSelect,
		NcSettingsSection,
		NcSettingsSelectGroup,
	},
	data() {
		return {
			error: false,
			loaded: false,
			saved: false,
			saving: false,
			savingTimeout: null,
			config: {
				useWhitelist: false,
				allowExternalStorage: false,
				hideUsers: false,
				whitelist: [],
				whiteListableApps: [],
				sharingRestrictedToGroup: false,
				createRestrictedToGroup: [],
			},
		}
	},
	computed: {
		statusText() {
			if (this.error) {
				return t('guests', 'Error')
			}
			if (this.saved) {
				return t('guests', 'Your settings have been updated')
			}
			if (this.saving) {
				return t('guests', 'Saving …')
			}
			return ''
		},
	},
	beforeMount() {
		this.loadConfig()
	},
	methods: {
		async loadConfig() {
			const { data } = await axios.get(generateUrl('apps/guests/config'))
			this.config = data
			this.loaded = true
		},

		async saveConfig() {
			this.resetSaving()

			try {
				await axios.put(generateUrl('apps/guests/config'), this.config)
			} catch ({ data }) {
				this.error = true
				console.error(data)
			} finally {
				this.saved = true
				this.savingTimeout = setTimeout(() => {
					this.resetSaving()
				}, 3500)
			}
		},

		async reset() {
			this.resetSaving()

			try {
				const { data } = await axios.post(generateUrl('apps/guests/whitelist/reset'))
				this.config.whitelist = data.whitelist
			} catch ({ data }) {
				this.error = true
				console.error(data)
			} finally {
				this.saved = true
				this.savingTimeout = setTimeout(() => {
					this.resetSaving()
				}, 3500)
			}
		},

		resetSaving() {
			this.saved = false
			this.saving = false
			clearTimeout(this.savingTimeout)
		},

		onGroupRestrictToggle(checked) {
			this.config.createRestrictedToGroup = checked
				? ['admin']
				: []
			this.saveConfig()
		},

		onSelectGroups(groups) {
			// Removing the last group will disable the feature
			if (groups.length === 0) {
				this.onGroupRestrictToggle(false)
				return
			}

			// Prevent removing the admin group
			// It doesn't really matter to see if the admin group is in the list
			// as we'll check it on the server side anyway. But we'll keep it here
			// as a clear statement that the admin group is always allowed to create guest accounts.
			if (!groups.includes('admin')) {
				showError(t('guests', 'The admin group is always allowed to create guest accounts'))
			}

			// Admin group is always added to the list of groups
			this.config.createRestrictedToGroup = [...new Set(['admin', ...groups])]
			this.saveConfig()
		},
	},
}
</script>

<style lang="scss" scoped>
.note {
	margin-top: 1rem;
	margin-bottom: 1rem;
	background: var(--color-background-dark);
	border-radius: var(--border-radius);
	border: 1px solid var(--color-border);
}

.allowlist {
	max-width: 500px;

	.multiselect {
		width: calc(100% - 48px);
		margin-right: 0;
		margin-top: 1rem;
	}

	.reset-button {
		margin-top: 1rem;
	}
}

.msg {
	color: white;
	padding: 5px;
	border-radius: var(--border-radius);
	&.error {
		background-color: var(--color-error)
	}
	&.saving, &.saved {
		background-color: var(--color-success)
	}
}
</style>
