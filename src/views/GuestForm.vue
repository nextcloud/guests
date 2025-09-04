<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcModal v-if="isOpened"
		id="app-guests"
		:clear-view-delay="0"
		:name="formatTitle"
		@close="closeModal">
		<!-- Main guest form -->
		<div class="guest_model_content">
			<form @submit.prevent="addGuest">
				<div class="modal-body">
					<h2 class="form-title">
						{{ t('guests', 'Invite Guest') }}
					</h2>
					<p class="form-description">
						{{ t('guests', 'Guests are accounts with limited permissions who will be able to access resources shared with them and use apps.') }}
					</p>
					<!-- Name -->
					<div class="form-group">
						<label class="form-label" for="app-guests-input-name">
							{{ t('guests', 'Guest Name') }}
						</label>
						<input id="app-guests-input-name"
							ref="name"
							v-model="guest.fullName"
							class="form-input"
							type="text"
							:disabled="loading">
						<NcNoteCard v-if="errors.username" type="error">
							{{ errors.username }}
						</NcNoteCard>
					</div>

					<!-- Email -->
					<div class="form-group">
						<label class="form-label" for="app-guests-input-email">
							{{ t('guests', 'Email') }}
						</label>
						<input id="app-guests-input-email"
							ref="email"
							v-model="guest.email"
							class="form-input"
							type="email"
							:disabled="loading"
							:class="{ _error: errors.email }">
						<NcNoteCard v-if="errors.email" type="error">
							{{ errors.email }}
						</NcNoteCard>
					</div>

					<!-- Language -->
					<div class="form-lang">
						<label class="form-label" for="app-guests-input-lang">
							{{ t('guests', 'Language') }}
						</label>
						<LanguageSelect v-model="guest.language" :disabled="loading" />
					</div>

					<!-- Groups -->
					<div v-if="groups.length > 0" class="form-group">
						<label class="form-label" for="app-guests-input-group">
							{{ t('guests', 'Add guest to groups:') }}
						</label>
						<GroupSelect v-model="guest.groups"
							:disabled="loading"
							:groups="groups"
							:required="groupRequired" />
						<NcNoteCard v-if="errors.groups" type="error">
							{{ errors.groups }}
						</NcNoteCard>
					</div>
				</div>

				<!-- Footer -->
				<div class="modal-footer">
					<NcNoteCard v-if="errors.button" type="error">
						{{ t('guests', 'An error occurred, try again') }}
					</NcNoteCard>
					<NcButton type="primary"
						native-type="submit"
						:disabled="loading">
						<template #icon>
							<AccountPlus v-if="!loading" :size="20" />
							<div v-else class="icon-loading-small" />
						</template>
						{{ t('guests', 'Invite user') }}
					</NcButton>
				</div>
			</form>
		</div>
	</NcModal>
</template>

<script>
import { generateOcsUrl } from '@nextcloud/router'
import { ShareType } from '@nextcloud/sharing'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { emit } from '@nextcloud/event-bus'
import axios from '@nextcloud/axios'

import AccountPlus from 'vue-material-design-icons/AccountPlus.vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcNoteCard from '@nextcloud/vue/components/NcNoteCard'

import { logger } from '../services/logger.ts'
import GroupSelect from '../components/GroupSelect.vue'
import LanguageSelect from '../components/LanguageSelect.vue'

export default {
	name: 'GuestForm',
	components: {
		AccountPlus,
		GroupSelect,
		LanguageSelect,
		NcButton,
		NcModal,
		NcNoteCard,
	},
	data() {
		return {
			integrationApp: null,
			fileInfo: null,
			resolve: () => {},
			reject: () => {},

			isOpened: false,
			loading: false,

			// guest data
			guest: {
				fullName: '',
				username: null,
				email: null,
				language: '',
				groups: [],
			},

			errors: {
				button: false,
				email: false,
				username: false,
				groups: false,
			},

			groupRequired: false,
			groups: [],
		}
	},

	computed: {
		formatTitle() {
			return t('guests', 'Invite {name}', {
				name: this.guest.fullName
					? this.guest.fullName
					: this.guest.email
						? this.guest.email
						: 'Guest',
			})
		},
	},

	watch: {
		'guest.email'() {
			if (this.guest.email) {
				this.guest.username = this.guest.email
			} else {
				this.guest.username = ''
			}

			this.$nextTick(() => {
				this.resetErrors()
			})
		},
	},

	beforeMount() {
		this.loadGroups()
	},

	methods: {
		populate(metaData, shareWith) {
			if (
				shareWith
				&& shareWith.indexOf('@') !== -1
				&& shareWith.lastIndexOf('.') > shareWith.indexOf('@')
			) {
				this.guest.email = shareWith || ''
			} else {
				this.guest.fullName = shareWith || ''
			}

			this.integrationApp = metaData?.app || 'files'
			this.fileInfo = metaData
			this.openModal()

			return new Promise((resolve, reject) => {
				this.resolve = resolve
				this.reject = reject
			})
		},

		openModal() {
			this.isOpened = true
			this.$nextTick(() => {
				if (this.guest.fullName) {
					this.$refs.email.focus()
				} else {
					this.$refs.name.focus()
				}
			})
		},

		closeModal() {
			this.isOpened = false
			this.resetForm()
		},

		async addGuest() {
			if (this.groupRequired && this.guest.groups.length === 0) {
				this.errors.groups = t('guests', 'Guest user needs to be added to at least one group')
				return
			} else {
				this.errors.groups = false
			}

			this.loading = true
			try {

				await axios.put(generateOcsUrl('/apps/guests/api/v1/users'), {
					displayName: this.guest.fullName,
					email: this.guest.email,
					language: this.guest.language,
					groups: this.guest.groups,
					sendInvite: this.integrationApp !== 'files',
				})

				if (this.integrationApp === 'files') {
					await this.setupGuestShare()
					return
				}

				if (this.integrationApp === 'talk') {
					this.resolve({
						id: this.guest.email,
						source: 'users',
					})
				}

				emit('guests:user:created', {
					username: this.guest.username,
					name: this.guest.fullName,
				})

				this.closeModal()
				showSuccess(t('guests', 'Guest added'))
			} catch ({ response }) {
				const errors = response?.data?.ocs?.data?.errorMessages
				// Backend returns either an array of strings or an
				// object with error messages for each field.
				if (Array.isArray(errors)) {
					errors.map(showError)
				} else {
					this.errors.email = errors.email ? errors.email : false
					this.errors.username = errors.username ? errors.username : false
					this.errors.button = errors.button ? errors.button : false
				}
			} finally {
				this.loading = false
			}
		},

		async setupGuestShare() {
			try {
				const path = (this.fileInfo.path + '/' + this.fileInfo.name).replace('//', '/')
				const shareTemplate = {
					shareType: ShareType.User,
					shareWith: this.guest.username,
					path,
				}
				logger.info('Created share template with newly invited guest', { shareTemplate })
				this.resolve(shareTemplate)
				this.closeModal()
			} catch ({ response }) {
				this.reject(response)
			}
		},

		async loadGroups() {
			try {
				const result = await axios.get(generateOcsUrl('apps/guests/api/v1/groups'))
				this.groups = result.data.ocs.data.groups
				this.groupRequired = result.data.ocs.data.required
			} catch (error) {
				logger.error('Failed to retrieve groups', { error })
			}
		},

		resetForm() {
			this.guest.fullName = this.guest.username = this.guest.email = ''
		},

		resetErrors() {
			this.errors.username = false
			this.errors.email = false
			this.errors.button = false
		},
	},
}
</script>

<style lang="scss" scoped>
@use 'sass:math';

.guest_model_content {
	$modal-gutter: 22px;
	$modal-button-loading: 16px;
	border-radius: 3px;
	font-size: 100%;
	min-width: 200px;
	margin: $modal-gutter;
	margin-top: 8px;

	.form-group {
		margin: math.div($modal-gutter, 2) 0;
	}

	.form-label,
	.form-input {
		box-sizing: border-box;
		display: block;
		width: 100%;
		transition: background 0.333s ease-out, border 0.333s ease-out;

		&._error {
			border: 1px solid var(--color-error);
			color: var(--color-error);
		}
	}

	.form-title {
		margin-top: 0px;
		padding-top: 0px;
	}

	.form-description {
		color: color-mix(in srgb, var(--color-main-text) 80%, transparent);
		margin-top: 8px;
		margin-bottom: 20px;
	}

	.modal-footer {
		margin-top: 50px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		span {
			margin: 10px;
		}
	}
}
// to allow lang multiselect
#app-guests:deep(.modal-container) {
	flex: 1 1 500px;
	max-width: 500px;
	overflow: visible;
}
</style>
