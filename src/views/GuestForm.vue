<template>
	<Modal v-if="isOpened"
		id="app-guests"
		:clear-view-delay="0"
		:title="formatTitle"
		@close="closeModal">
		<div class="guest_model_content">
			<form @submit.prevent="addGuest">
				<div class="modal-body">
					<div class="form-group">
						<label class="form-label" for="app-guests-input-name">
							Name:
						</label>
						<input
							id="app-guests-input-name"
							ref="name"
							v-model="guest.fullName"
							class="form-input"
							type="text"
							:disabled="loading">
					</div>
					<div class="form-group">
						<label class="form-label" for="app-guests-input-email">
							E-Mail:
						</label>
						<input
							id="app-guests-input-email"
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
							Language:
						</label>
						<LanguageSelect v-model="guest.language" :disabled="loading" />
					</div>
				</div>
				<div class="modal-footer">
					<span v-if="error.button">{{ t('guests', 'An error occured, try again') }}</span>
					<button type="submit"
						:class="{ 'icon-loading-small': loading }"
						class="primary button-save"
						:disabled="loading">
						{{ t('guests', 'Save and create share') }}
					</button>
				</div>
			</form>
		</div>
	</Modal>
</template>

<script>
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import { Modal } from 'nextcloud-vue/dist/Components/Modal'
import LanguageSelect from '../components/LanguageSelect'

export default {
	name: 'GuestForm',
	components: {
		LanguageSelect,
		Modal
	},
	data() {
		return {
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
				language: ''
			},

			error: {
				button: false,
				email: false,
				username: false
			}
		}
	},

	computed: {
		formatTitle() {
			return t('guests', 'Create guest account for {name}', {
				name: this.guest.fullName
					? this.guest.fullName
					: this.guest.email
			})
		}
	},

	watch: {
		'guest.email': function() {
			if (this.guest.email) {
				this.guest.username = this.guest.email
			} else {
				this.guest.username = ''
			}

			this.$nextTick(() => {
				this.resetErrors()
			})
		}
	},

	methods: {
		populate: function(fileInfo, shareWith) {
			if (
				shareWith.indexOf('@') !== -1
				&& shareWith.lastIndexOf('.') > shareWith.indexOf('@')
			) {
				this.guest.email = shareWith || ''
			} else {
				this.guest.fullName = shareWith || ''
			}

			this.fileInfo = fileInfo
			this.openModal()

			return new Promise((resolve, reject) => {
				this.resolve = resolve
				this.reject = reject
			})
		},

		openModal: function() {
			this.isOpened = true
			this.$nextTick(() => {
				if (this.guest.fullName) {
					this.$refs.email.focus()
				} else {
					this.$refs.name.focus()
				}
			})
		},

		closeModal: function() {
			this.isOpened = false
			this.resetForm()
		},

		async addGuest() {
			this.loading = true
			try {
				await axios.put(generateUrl('/apps/guests/users'), {
					displayName: this.guest.fullName,
					email: this.guest.email,
					language: this.guest.language
				})
				await this.addGuestShare()
			} catch ({ response }) {
				const error = response && response.data
					? response.data.errorMessages
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
				const url = OC.linkToOCS('apps/files_sharing/api/v1', 2)
				const path = (this.fileInfo.path + '/' + this.fileInfo.name).replace('//', '/')

				const result = await axios.post(`${url}shares?format=json`, {
					shareType: OC.Share.SHARE_TYPE_USER,
					shareWith: this.guest.username,
					path
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

		resetForm: function() {
			this.guest.fullName = this.guest.username = this.guest.email = null
		},

		resetErrors: function() {
			this.error.username = false
			this.error.email = false
			this.error.button = false
		}
	}
}
</script>

<style lang="scss" scoped>
.guest_model_content {
	$modal-gutter: 22px;
	$modal-button-loading: 16px;
	border-radius: 3px;
	font-size: 100%;
	min-width: 200px;
	margin: $modal-gutter;

	.form-group {
		margin: $modal-gutter / 2 0;
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

	.vs__dropdown-menu {
		z-index: 99999;
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
