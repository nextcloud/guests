<template>
	<NcModal v-if="isOpened"
		id="app-guests"
		:clear-view-delay="0"
		:title="formatTitle"
		@close="closeModal">
		<!-- Main guest form -->
		<div class="guest_model_content">
			<form @submit.prevent="addGuest">
				<div class="modal-body">
					<div class="form-group">
						<label class="form-label" for="app-guests-input-name">
							{{ t('guests', 'Name:') }}
						</label>
						<input id="app-guests-input-name"
							ref="name"
							v-model="guest.fullName"
							class="form-input"
							type="text"
							:disabled="loading">
					</div>
					<div class="form-group">
						<label class="form-label" for="app-guests-input-email">
							{{ t('guests', 'Email:') }}
						</label>
						<input id="app-guests-input-email"
							ref="email"
							v-model="guest.email"
							class="form-input"
							type="email"
							:disabled="loading"
							:class="{ _error: error.email }">
						<span v-if="error.email">{{ error.email }}</span>
					</div>
					<div class="form-lang">
						<label class="form-label" for="app-guests-input-lang">
							{{ t('guests', 'Language:') }}
						</label>
						<LanguageSelect v-model="guest.language" :disabled="loading" />
					</div>
					<div v-if="groups.length > 0" class="form-group">
						<label class="form-label" for="app-guests-input-group">
							{{ t('guests', 'Add guest to groups:') }}
						</label>
						<GroupSelect v-model="guest.groups"
							:disabled="loading"
							:groups="groups"
							:required="groupRequired" />
						<span v-if="error.groups">{{ error.groups }}</span>
					</div>
				</div>

				<!-- Footer -->
				<div class="modal-footer">
					<span v-if="error.button">{{ t('guests', 'An error occurred, try again') }}</span>
					<NcButton type="primary"
						native-type="submit"
						:disabled="loading">
						<template #icon>
							<AccountPlus v-if="!loading" :size="20" />
							<div v-else class="icon-loading-small" />
						</template>
						{{ submitLabel }}
					</NcButton>
				</div>
			</form>
		</div>
	</NcModal>
</template>

<script>
import { generateOcsUrl } from '@nextcloud/router'
import AccountPlus from 'vue-material-design-icons/AccountPlus.vue'
import axios from '@nextcloud/axios'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcModal from '@nextcloud/vue/dist/Components/NcModal.js'

import GroupSelect from '../components/GroupSelect.vue'
import LanguageSelect from '../components/LanguageSelect.vue'

export default {
	name: 'GuestForm',
	components: {
		AccountPlus,
		NcButton,
		GroupSelect,
		LanguageSelect,
		NcModal,
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

			error: {
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
					: this.guest.email,
			})
		},

		submitLabel() {
			if (this.integrationApp === 'talk') {
				return t('guests', 'Invite user to conversation')
			}
			return t('guests', 'Invite user and create share')
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
				shareWith.indexOf('@') !== -1
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
				this.error.groups = t('guests', 'Guest user needs to be added to at least one group')
				return
			} else {
				this.error.groups = false
			}

			this.loading = true
			try {
				await axios.put(generateOcsUrl('/apps/guests/api/v1/users'), {
					displayName: this.guest.fullName,
					email: this.guest.email,
					language: this.guest.language,
					groups: this.guest.groups,
				})

				if (this.integrationApp === 'talk') {
					this.loading = false
					this.resolve({
						id: this.guest.email,
						source: 'users',
					})
					this.closeModal()
					return
				}
				await this.addGuestShare()
			} catch ({ response }) {
				const error = response && response.data && response.data.ocs && response.data.ocs.data
					? response.data.ocs.data.errorMessages
					: { button: true }

				this.error.email = error.email ? error.email : false
				this.error.username = error.username ? error.username : false
				this.error.button = error.button ? error.button : false
			} finally {
				this.loading = false
			}
		},

		async addGuestShare() {
			try {
				const url = generateOcsUrl('/apps/files_sharing/api/v1/shares')
				const path = (this.fileInfo.path + '/' + this.fileInfo.name).replace('//', '/')

				const result = await axios.post(url + '?format=json', {
					shareType: OC.Share.SHARE_TYPE_USER,
					shareWith: this.guest.username,
					path,
				})

				if (!result.data.ocs) {
					this.reject(result)
				}

				this.resolve(result.data.ocs.data)
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
				console.error('Failed to retrieve groups', error)
			}
		},

		resetForm() {
			this.guest.fullName = this.guest.username = this.guest.email = null
		},

		resetErrors() {
			this.error.username = false
			this.error.email = false
			this.error.button = false
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

	.modal-footer {
		margin-top: 50px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		span {
			margin: 10px;
		}
		button {
			height: 44px;
			&.icon-loading-small {
				padding-left: $modal-button-loading * 2;
				&::after {
					left: $modal-button-loading;
				}
			}
		}
	}
}
// to allow lang multiselect
#app-guests::v-deep {
	.modal-container {
		flex: 1 1 500px;
		max-width: 500px;
		overflow: visible;
	}
}
</style>
