<template>
	<div id="guests" class="section">
		<h2>
			{{ t('guests', 'Guests') }}
			<span v-if="error || saving || saved"
				:class="{error, saving, saved}"
				class="msg">{{ statusText }}</span>
		</h2>
		<div v-if="config.sharingRestrictedToGroup" class="warning">
			<p>
				{{ t('guests', 'Creating guests users is restricted while "Restrict users to only share with users in their groups" is enabled.') }}
			</p>
			<p>
				{{ t('guests', 'Only group admins are allowed to create guests and guests must be added to at least one group the share creator is a group admin for.') }}
			</p>
		</div>
		<div v-if="loaded">
			<p>
				<span class="user-info-label">
					{{ t('guests', 'Guest users are grouped under a virtual group in the user manager') }}
				</span>
			</p>
			<p class="external-storage-toggle">
				<input id="allowExternalStorage"
					v-model="config.allowExternalStorage"
					type="checkbox"
					class="checkbox"
					@change="saveConfig">
				<label for="allowExternalStorage">
					{{ t('guests', 'Guest users can access mounted external storages') }}
				</label>
			</p>
			<p class="hide-users-toggle">
				<input id="hideUsers"
					v-model="config.hideUsers"
					type="checkbox"
					class="checkbox"
					@change="saveConfig">
				<label for="hideUsers">
					{{ t('guests', 'Hide other users from guests') }}
				</label>
			</p>
			<p v-if="config.hideUsers" class="note">
				{{ t('guests', 'Guests will still be able to see users from any group they are added to') }}
			</p>
			<p class="whitelist-toggle">
				<input id="guestUseWhitelist"
					v-model="config.useWhitelist"
					type="checkbox"
					class="checkbox"
					@change="saveConfig">
				<label for="guestUseWhitelist">
					{{ t('guests', 'Limit guest access to an app whitelist') }}
				</label>
			</p>
			<p v-if="config.useWhitelist" class="whitelist">
				<Multiselect v-model="config.whitelist"
					:options="config.whiteListableApps"
					:multiple="true"
					:close-on-select="false"
					:clear-on-select="false"
					:tag-width="75"
					@input="saveConfig" />
				<button :title="t('guests', 'Reset')"
					type="button"
					class="icon-history icon"
					@click="reset" />
			</p>
		</div>

		<div v-if="!loaded">
			<div class="loading" />
		</div>

		<GuestList />
	</div>
</template>

<script>
import { clearTimeout, setTimeout } from 'timers'
import { generateUrl } from '@nextcloud/router'
import Multiselect from '@nextcloud/vue/dist/Components/Multiselect'
import axios from '@nextcloud/axios'
import GuestList from '../components/GuestList'

export default {
	name: 'GuestSettings',
	components: {
		GuestList,
		Multiselect,
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
#guests {
	.note {
		margin: 5px;
		padding: 10px;
		background: var(--color-background-dark);
		border-radius: var(--border-radius);
		border: 1px solid var(--color-border);
	}

	.whitelist {
		display: flex;

		.multiselect {
			width: calc(100% - 48px);
			margin-right: 0;
		}

		button {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			margin: 0;
		}

		.whitelist-toggle {
			margin: 1em 0;
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
}
</style>
