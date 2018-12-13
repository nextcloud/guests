<template>
	<div id="app-guests" v-if="state.modalIsOpen">
		<div class="modal" @keyup.esc="closeModal">
			<h2 class="modal-title oc-dialog-title">
				{{ t('guests', 'Create guest account for {fullName}', guest) }}
			</h2>
			<a class="button-close oc-dialog-close" @click="closeModal"></a>
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
				</div>
				<div class="modal-footer">
					<button type="submit" class="button-save">
						Save and Share
					</button>
				</div>
			</form>
		</div>
		<div class="modal-backdrop"></div>
	</div>
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
					fullName: null,
					username: null,
					email: null
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
						email: this.guest.email
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
