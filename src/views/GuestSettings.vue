<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div>
		<NcSettingsSection
			:name="t('guests', 'Guests')"
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
				<span
					v-if="error || saving || saved"
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
				<NcCheckboxRadioSwitch
					v-model="config.allowExternalStorage"
					type="switch"
					@update:modelValue="saveConfig">
					{{ t('guests', 'Guest accounts can access mounted external storages') }}
				</NcCheckboxRadioSwitch>

				<NcCheckboxRadioSwitch
					v-model="config.useHashedEmailAsUserID"
					type="switch"
					@update:modelValue="saveConfig">
					{{ t('guests', 'Use a hash of the email as user ID for improved privacy') }}
				</NcCheckboxRadioSwitch>

				<NcCheckboxRadioSwitch
					v-model="config.hideUsers"
					type="switch"
					@update:modelValue="saveConfig">
					{{ t('guests', 'Hide other accounts from guests') }}
				</NcCheckboxRadioSwitch>

				<NcNoteCard v-if="config.hideUsers" type="warning">
					{{ t('guests', 'Guests will still be able to see accounts from any group they are added to') }}
				</NcNoteCard>

				<!-- Restrict guest creation to groups -->
				<NcCheckboxRadioSwitch
					:modelValue="config.createRestrictedToGroup.length > 0"
					type="switch"
					@update:modelValue="onGroupRestrictToggle">
					{{ t('guests', 'Limit guest account creation to the following groups only') }}
				</NcCheckboxRadioSwitch>

				<p v-if="config.createRestrictedToGroup.length > 0">
					<NcSettingsSelectGroup
						:label="t('guests', 'Limit guest account creation to the following groups only')"
						:modelValue="config.createRestrictedToGroup"
						:placeholder="t('guests', 'Select groups to allow')"
						@update:modelValue="onSelectGroups" />
				</p>

				<!-- Allowlist -->
				<NcCheckboxRadioSwitch
					v-model="config.useWhitelist"
					type="switch"
					@update:modelValue="saveConfig">
					{{ t('guests', 'Limit guest access to an app\'s allowlist') }}
				</NcCheckboxRadioSwitch>

				<div v-if="config.useWhitelist" class="allowlist">
					<!-- Read-only display with an edit (pencil) button -->
					<div v-if="!editingAllowlist" class="allowlist__row allowlist__row--display">
						<ul v-if="allowlistApps.length" class="allowlist__apps">
							<li v-for="app in allowlistApps" :key="app" class="allowlist__app">
								{{ app }}
							</li>
						</ul>
						<span v-else class="allowlist__empty">{{ t('guests', 'No apps selected') }}</span>
						<NcButton
							variant="tertiary"
							:aria-label="t('guests', 'Edit allowlist')"
							:title="t('guests', 'Edit allowlist')"
							@click="startEditAllowlist">
							<template #icon>
								<Pencil :size="20" />
							</template>
						</NcButton>
					</div>
					<!-- Edit mode: changes are only persisted when confirmed -->
					<div v-else class="allowlist__row">
						<NcSelect
							v-model="whitelistDraft"
							class="allowlist__select"
							:options="config.whiteListableApps"
							:multiple="true"
							keepOpen />
						<NcButton
							variant="tertiary"
							:aria-label="t('guests', 'Confirm allowlist')"
							:title="t('guests', 'Confirm allowlist')"
							@click="confirmAllowlist">
							<template #icon>
								<Check :size="20" />
							</template>
						</NcButton>
					</div>
					<NcButton variant="secondary" class="reset-button" @click="reset">
						<template #icon>
							<History :size="16" />
						</template>
						{{ t('guests', 'Reset allowlist') }}
					</NcButton>
				</div>

				<!-- Default quota for new guest accounts -->
				<div class="guest-quota">
					<label :for="quotaInputId" class="guest-quota__label">
						{{ t('guests', 'Default quota for new guest accounts') }}
					</label>
					<NcSelect
						v-model="quotaModel"
						:inputId="quotaInputId"
						class="guest-quota__select"
						:options="quotaOptions"
						:clearable="false"
						:filterable="false"
						label="label"
						@search="onQuotaSearch" />
				</div>
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
import axios from '@nextcloud/axios'
import { showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcNoteCard from '@nextcloud/vue/components/NcNoteCard'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcSettingsSection from '@nextcloud/vue/components/NcSettingsSection'
import NcSettingsSelectGroup from '@nextcloud/vue/components/NcSettingsSelectGroup'
import Check from 'vue-material-design-icons/Check.vue'
import History from 'vue-material-design-icons/History.vue'
import Pencil from 'vue-material-design-icons/Pencil.vue'
import GuestList from '../components/GuestList.vue'
import { logger } from '../services/logger.ts'

export default {
	name: 'GuestSettings',
	components: {
		Check,
		GuestList,
		History,
		NcButton,
		NcCheckboxRadioSwitch,
		NcNoteCard,
		NcSelect,
		NcSettingsSection,
		NcSettingsSelectGroup,
		Pencil,
	},

	data() {
		return {
			error: false,
			loaded: false,
			saved: false,
			saving: false,
			savingTimeout: null,
			editingAllowlist: false,
			whitelistDraft: [],
			quotaInputId: 'guests-default-quota',
			quotaSearch: '',
			config: {
				useWhitelist: false,
				allowExternalStorage: false,
				useHashedEmailAsUserID: true,
				hideUsers: false,
				whitelist: [],
				whiteListableApps: [],
				sharingRestrictedToGroup: false,
				createRestrictedToGroup: [],
				guestQuota: 'default',
				guestQuotaDefault: '0 B',
			},
		}
	},

	computed: {
		allowlistApps() {
			// getAppWhitelist() returns [''] for an empty allowlist (explode of an
			// empty string), so drop empty entries to show the placeholder instead
			// of a blank chip.
			return (this.config.whitelist ?? [])
				.map((app) => (typeof app === 'string' ? app : (app.label ?? app.id ?? app.name ?? String(app))))
				.filter(Boolean)
		},

		baseQuotaOptions() {
			return [
				{ id: 'default', label: t('guests', 'Default quota ({size})', { size: this.config.guestQuotaDefault || '0 B' }) },
				{ id: 'none', label: t('guests', 'Unlimited') },
				{ id: '1 GB', label: '1 GB' },
				{ id: '5 GB', label: '5 GB' },
				{ id: '10 GB', label: '10 GB' },
			]
		},

		// When a bare number is typed, offer it with selectable units (KB/MB/GB)
		// instead of silently assuming bytes. A partially typed unit narrows the
		// suggestions (e.g. "500 m" → "500 MB").
		quotaOptions() {
			const search = (this.quotaSearch || '').trim()
			const parts = search.match(/^(\d+(?:\.\d+)?)\s*([a-z]*)$/i)
			if (parts) {
				const value = parts[1]
				const typedUnit = parts[2].toLowerCase()
				const units = ['KB', 'MB', 'GB']
				const matching = typedUnit
					? units.filter((unit) => unit.toLowerCase().startsWith(typedUnit))
					: units
				return (matching.length ? matching : units)
					.map((unit) => ({ id: `${value} ${unit}`, label: `${value} ${unit}` }))
			}
			return this.baseQuotaOptions
		},

		quotaModel: {
			get() {
				const current = this.config.guestQuota
				return this.baseQuotaOptions.find((option) => option.id === current)
					?? { id: current, label: current }
			},

			set(option) {
				const value = (option && typeof option === 'object') ? option.id : option
				if (!this.isValidQuota(value)) {
					showError(t('guests', 'Please enter a quota with a unit, for example "500 MB" or "2 GB"'))
					return
				}
				this.config.guestQuota = value
				this.quotaSearch = ''
				this.saveConfig()
			},
		},

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
		t,

		startEditAllowlist() {
			// Drop the empty entry from an empty allowlist so the selector does
			// not start with a blank, removable tag.
			this.whitelistDraft = (this.config.whitelist ?? []).filter(Boolean)
			this.editingAllowlist = true
		},

		confirmAllowlist() {
			this.config.whitelist = [...this.whitelistDraft]
			this.editingAllowlist = false
			this.saveConfig()
		},

		onQuotaSearch(query) {
			this.quotaSearch = query
		},

		isValidQuota(value) {
			// A unit is required so the stored value is unambiguous; a bare
			// number like "500" is rejected (it would mean 500 bytes).
			return value === 'default'
				|| value === 'none'
				|| /^\d+(\.\d+)?\s*(b|kb|mb|gb|tb|pb)$/i.test(String(value).trim())
		},

		async loadConfig() {
			const { data } = await axios.get(generateUrl('apps/guests/config'))
			this.config = data
			this.loaded = true
		},

		async saveConfig() {
			this.resetSaving()

			try {
				await axios.put(generateUrl('apps/guests/config'), this.config)
				this.saved = true
			} catch (error) {
				this.error = true
				logger.error('Error saving config', { error })
			} finally {
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
				if (this.editingAllowlist) {
					this.whitelistDraft = [...data.whitelist]
				}
				this.saved = true
			} catch (error) {
				this.error = true
				logger.error('Error resetting allowlist', { error })
			} finally {
				this.savingTimeout = setTimeout(() => {
					this.resetSaving()
				}, 3500)
			}
		},

		resetSaving() {
			this.error = false
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
	max-width: 690px;
	margin-inline-start: var(--default-clickable-area);

	&__row {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 1rem;

		&--display {
			align-items: flex-start;
		}
	}

	&__apps {
		flex: 1 1 auto;
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		min-width: 0;
		padding-top: 4px;
	}

	&__app {
		padding: 2px 10px;
		background-color: var(--color-background-dark);
		border-radius: var(--border-radius-pill, 1rem);
		color: var(--color-text-maxcontrast);
		font-size: 0.9em;
	}

	&__empty {
		flex: 1 1 auto;
		padding-top: 6px;
		color: var(--color-text-maxcontrast);
	}

	&__select {
		flex: 1 1 auto;
		min-width: 0;
	}

	.reset-button {
		margin-top: 1rem;
	}
}

.guest-quota {
	margin-top: 1.5rem;
	max-width: 400px;

	&__label {
		display: block;
		margin-bottom: 4px;
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
