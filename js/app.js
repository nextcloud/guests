/*
 * Copyright (c) 2017 Felix Heidecke <felix.heidecke@owncloud.com>
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

if (!OCA.Guests) {
	/**
	 * @namespace OCA.Guests
	 */
	OCA.Guests = {};
}
/**
 * @namespace
 */

$(document).ready(function () {
	$('body').append('<div id="app-guests">\n\t<div class="modal" v-if="state.modalIsOpen" @keyup.esc="closeModal">\n\t\t<h2 class="modal-title oc-dialog-title">Create guest account for\n\t\t\t<span class="placeholder-name">{{guest.fullname}}</span>\n\t\t</h2>\n\t\t<a class="button-close oc-dialog-close" @click="closeModal"></a>\n\t\t<form @submit.prevent="addGuest">\n\t\t\t<div class="modal-body">\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label class="form-label" for="app-guests-input-name">\n\t\t\t\t\t\tName:\n\t\t\t\t\t</label>\n\t\t\t\t\t<input\n\t\t\t\t\t\t\tclass="form-input" id="app-guests-input-name"\n\t\t\t\t\t\t\ttype="text"\n\t\t\t\t\t\t\tv-model="guest.fullname">\n\t\t\t\t</div>\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label class="form-label" for="app-guests-input-email">\n\t\t\t\t\t\tE-Mail:\n\t\t\t\t\t</label>\n\t\t\t\t\t<input\n\t\t\t\t\t\t\tclass="form-input" id="app-guests-input-email"\n\t\t\t\t\t\t\ttype="email"\n\t\t\t\t\t\t\tv-model="guest.email"\n\t\t\t\t\t\t\t:class="{ _error : error.email }">\n\t\t\t\t\t<span v-if="error.email">{{error.email}}</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="modal-footer">\n\t\t\t\t<button type="submit" class="button-save">\n\t\t\t\t\tSave and Share\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</form>\n\t</div>\n\t<div class="modal-backdrop" v-if="state.modalIsOpen"></div>\n</div>');

	OCA.Guests.App = new Vue({
		el: '#app-guests',
		data: {

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
				fullname: null,
				username: null,
				email: null
			},

			error: {
				username: false,
				email: false
			}
		},
		watch: {
			'guest.email': function () {
				if (this.guest.email) {
					this.guest.username = this.guest.email;
				}
				else {
					this.guest.username = '';
				}

				var self = this;

				_.delay(function() {
					self._resetErrors();
				}, 250);
			}
		},
		methods: {

			populate: function (model, shareWith) {
				if (shareWith.indexOf('@') !== -1 && shareWith.lastIndexOf('.') > shareWith.indexOf('@')) {
					this.guest.email = (shareWith) ? shareWith : '';
				} else {
					this.guest.fullname = (shareWith) ? shareWith : '';
				}

				this.model = (model) ? model : false;
			},

			openModal: function () {
				this.state.modalIsOpen = true;
				setTimeout(function() {
					if (this.guest.fullname) {
						$('#app-guests-input-email').focus();
					} else {
						$('#app-guests-input-name').focus();
					}
				}.bind(this), 100);
			},

			closeModal: function () {
				this.state.modalIsOpen = false;
				this._resetForm();

				$('#shareTabView .shareWithField').val('').removeAttr('disabled');
				$('#shareTabView .shareWithLoading').toggleClass('hidden inlineblock');
			},

			addGuest: function () {
				var self = this;
				xhrObject = {
					type: 'PUT',
					url: OC.generateUrl('/apps/guests/users'),
					dataType: 'text',
					data: {
						displayName: this.guest.fullname,
						email: this.guest.email
					}
				};

				$.ajax(xhrObject).done(function () {
					self._addGuestShare();

				}).fail(function (xhr) {
					response = JSON.parse(xhr.responseText);
					error = response.errorMessages;

					self.error.email = (error.email) ? error.email : false;
					self.error.username = (error.username) ? error.username : false;
				});
			},

			_addGuestShare: function () {
				var self = this;
				var attributes = {
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
				}).done(function () {

					self.closeModal();

					if (self.model)
						self.model.fetch();

				}).fail(function (response) {
					var message = '';
					if (response.responseJSON && response.responseJSON&& response.responseJSON.ocs && response.responseJSON.ocs.meta && response.responseJSON.ocs.meta.message) {
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
				this.guest.fullname = this.guest.username = this.guest.email = null;
			},

			_resetErrors: function () {
				this.error.username = this.error.email = false;
			}
		}
	});
});

OC.Plugins.register('OC.Share.ShareDialogView', {
	attach: function (obj) {

		var originalAutocompleteHandler = obj.autocompleteHandler;
		var lastSearch = '';

		obj.autocompleteHandler = function (search, response) {
			originalAutocompleteHandler(search, function(suggestions) {

				var searchTerm = search.term.trim();
				if (lastSearch !== searchTerm) {
					lastSearch = searchTerm;
					suggestions.push({
						label: t('core', 'Create guest account for {searchterm}', {searchterm: searchTerm}),
						value: {
							shareType: OC.Share.SHARE_TYPE_GUEST,
							shareWith: searchTerm
						}
					});
				}

				response(suggestions);
			});

		};

		var original_onSelectRecipient = obj._onSelectRecipient;

		obj._onSelectRecipient = function(e, s) {

			if (s.item.value.shareType === OC.Share.SHARE_TYPE_GUEST) {
				e.preventDefault();
				e.stopImmediatePropagation();
				OCA.Guests.App.populate(obj.model, s.item.value.shareWith);
				OCA.Guests.App.openModal();
			} else {
				original_onSelectRecipient(e, s);
			}

		};
	}
});
