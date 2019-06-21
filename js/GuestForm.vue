<template>
	<Modal id="app-guests" v-if="state.modalIsOpen" @close="closeModal">
		<div class="guest_model_content">
			<h2 class="modal-title oc-dialog-title">
				{{ t('guests', 'Create guest account for {fullName}', guest) }}
			</h2>
			<form @submit.prevent="addGuest">
				<div class="modal-body">
					<div class="form-group">
						<label class="form-label" for="app-guests-input-name">
							Name:
						</label>
						<input
								ref="name"
								class="form-input" id="app-guests-input-name"
								type="text"
								v-model="guest.fullName">
					</div>
					<div class="form-group">
						<label class="form-label" for="app-guests-input-email">
							E-Mail:
						</label>
						<input
								ref="email"
								class="form-input" id="app-guests-input-email"
								type="email"
								v-model="guest.email"
								:class="{ _error : error.email }">
						<span v-if="error.email">{{error.email}}</span>
					</div>
					<div class="form-lang">
						<label class="form-label" for="app-guests-input-lang">
							Language:
						</label>
						<LanguageSelect v-model="guest.language"/>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="button-save">
						{{ t('guests', 'Save and Share') }}
					</button>
				</div>
			</form>
		</div>
	</Modal>
</template>

<script>
	export default {
		name: 'app-guests',
		data () {
			return {

				// OC.Backbone model
				// -----------------
				model: null,

				// current state of the view
				// -------------------------
				state: {
					modalIsOpen: false
				},

				// guest data
				// ----------
				guest: {
					fullName: "",
					username: null,
					email: null,
					language: "",
				},

				error: {
					username: false,
					email: false
				}
			}
		},
		watch: {
			'guest.email': function () {
				if (this.guest.email) {
					this.guest.username = this.guest.email;
				} else {
					this.guest.username = '';
				}

				this.$nextTick(() => {
					this._resetErrors();
				});
			}
		},
		methods: {
			populate: function (model, shareWith) {
				if (shareWith.indexOf('@') !== -1 && shareWith.lastIndexOf('.') > shareWith.indexOf('@')) {
					this.guest.email = (shareWith) ? shareWith : '';
				} else {
					this.guest.fullName = (shareWith) ? shareWith : '';
				}

				this.model = (model) ? model : false;
			},

			openModal: function () {
				this.state.modalIsOpen = true;
				this.$nextTick(() => {
					if (this.guest.fullName) {
						this.$refs.email.focus();
					} else {
						this.$refs.name.focus();
					}
				});
			},

			closeModal: function () {
				this.state.modalIsOpen = false;
				this._resetForm();

				$('#shareTabView .shareWithField').val('').removeAttr('disabled');
			},

			addGuest: function () {
				const xhrObject = {
					type: 'PUT',
					url: OC.generateUrl('/apps/guests/users'),
					dataType: 'text',
					data: {
						displayName: this.guest.fullName,
						email: this.guest.email,
						language: this.guest.language
					}
				};

				$.ajax(xhrObject).done(() => {
					this._addGuestShare();

				}).fail((xhr) => {
					const response = JSON.parse(xhr.responseText);
					const error = response.errorMessages;

					this.error.email = (error.email) ? error.email : false;
					this.error.username = (error.username) ? error.username : false;
				});
			},

			_addGuestShare: function () {
				const attributes = {
					shareType: 0,
					shareWith: this.guest.username,
					permissions: OC.PERMISSION_CREATE | OC.PERMISSION_UPDATE | OC.PERMISSION_READ | OC.PERMISSION_DELETE,
					path: this.model.fileInfoModel.getFullPath()
				};

				return $.ajax({
					type: 'POST',
					url: OC.linkToOCS('apps/files_sharing/api/v1', 2) + 'shares?format=json',
					data: attributes,
					dataType: 'json'
				}).done(() => {

					this.closeModal();

					if (this.model) {
						this.model.fetch();
					}

				}).fail((response) => {
					let message = '';
					if (response.responseJSON && response.responseJSON && response.responseJSON.ocs && response.responseJSON.ocs.meta && response.responseJSON.ocs.meta.message) {
						message = response.responseJSON.ocs.meta.message;
					}

					// @NOTE: will be expendable in the near future
					OCdialogs.alert(
						t('core', 'Error while sharing\n' + message), // text
						t('core', 'Error'), // title
						false, // callback
						true // modal
					);
				});
			},

			_resetForm: function () {
				this.guest.fullName = this.guest.username = this.guest.email = null;
			},

			_resetErrors: function () {
				this.error.username = this.error.email = false;
			}
		}
	};
</script>

<style>
	#app-guests .modal-container {
		overflow: visible;
	}

	.guest_model_content {

		--modal-width: 500px;
		--modal-height: 360px;
		--modal-gutter: 15px;

		width: var(--modal-width);

		border-radius: 3px;
		font-size: 100%;
		min-width: 200px;
		margin: var(--modal-gutter);

		.model-title,
		.model-body {
			margin-bottom: var(--modal-gutter) *2;
		}

		.form-group {
			margin: var(--modal-gutter) / 2 0;
		}

		.form-label,
		.form-input {
			box-sizing: border-box;
			display: block;
			width: 100%;
			transition: background .333s ease-out,
			border .333s ease-out;

			&._error {
				border: 1px solid var(--color-error);
				color: var(--color-error);
			}
		}

		.vs__dropdown-menu {
			z-index: 99999;
		}
	}

</style>
