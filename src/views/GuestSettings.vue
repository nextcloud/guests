<template>
	<div>
		<NcSettingsSection :title="t('guests', 'Guests')"
			:description="t('guests', 'Guest accounts are grouped under a virtual group in the account manager')">
			<div>
				<span v-if="error || saving || saved"
					:class="{error, saving, saved}"
					class="msg">{{ statusText }}</span>
			</div>
			<div v-if="config.sharingRestrictedToGroup" class="warning">
				<p>
					{{ t('guests', 'Creating guests accounts is restricted while "Restrict accounts to only share with accounts in their groups" is enabled.') }}
				</p>
				<p>
					{{ t('guests', 'Only group admins are allowed to create guests and guests must be added to at least one group the share creator is a group admin for.') }}
				</p>
			</div>
			<div v-if="loaded">
				<NcCheckboxRadioSwitch :checked.sync="config.allowExternalStorage"
					type="switch"
					@updated:checked="saveConfig">
					{{ t('guests', 'Guest accounts can access mounted external storages') }}
				</NcCheckboxRadioSwitch>

				<NcCheckboxRadioSwitch :checked.sync="config.hideUsers"
					type="switch"
					@updated:checked="saveConfig">
					{{ t('guests', 'Hide other accounts from guests') }}
				</NcCheckboxRadioSwitch>

				<NcNoteCard v-if="config.hideUsers" type="warning">
					{{ t('guests', 'Guests will still be able to see accounts from any group they are added to') }}
				</NcNoteCard>

				<NcCheckboxRadioSwitch :checked.sync="config.useWhitelist"
					type="switch"
					@updated:checked="saveConfig">
					{{ t('guests', 'Limit guest access to an app\'s allowlist') }}
				</NcCheckboxRadioSwitch>

				<p v-if="config.useWhitelist" class="allowlist">
					<NcMultiselect v-model="config.whitelist"
						:options="config.whiteListableApps"
						:multiple="true"
						:close-on-select="false"
						:clear-on-select="false"
						:tag-width="75"
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
		<GuestList />
	</div>
</template>

<script>
import { clearTimeout, setTimeout } from 'timers'
import { generateUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'
import NcCheckboxRadioSwitch from '@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js'
import NcMultiselect from '@nextcloud/vue/dist/Components/NcMultiselect.js'
import NcSettingsSection from '@nextcloud/vue/dist/Components/NcSettingsSection.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcNoteCard from '@nextcloud/vue/dist/Components/NcNoteCard.js'
import GuestList from '../components/GuestList.vue'
import History from 'vue-material-design-icons/History.vue'

export default {
	name: 'GuestSettings',
	components: {
		GuestList,
		NcMultiselect,
		NcSettingsSection,
		NcCheckboxRadioSwitch,
		NcButton,
		NcNoteCard,
		History,
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
