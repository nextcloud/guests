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
	$('body').append('<div id="app-guests"><div class="modal" v-if="state.modalIsOpen"><h2 class="modal-title">Add <span class="placeholder-name">{{guest.fullname}}</span> to guests</h2><div class="modal-body"><div class="form-group"><label class="form-label" >Username:</label><input class="form-input" disabled type="text" v-model="guest.username"></div><div class="form-group"><label class="form-label" for="app-guests-input-name">Name:</label><input class="form-input" id="app-guests-input-name" type="text" v-model="guest.fullname"></div><div class="form-group"><label class="form-label" for="app-guests-input-email">E-Mail:</label><input class="form-input" id="app-guests-input-email" type="email" v-model="guest.email" :class="{ _error : error.email }"> <span v-if="error.email">{{error.email}}</span></div></div><div class="modal-footer"><button class="button-close" @click="closeModal">Cancel</button><button class="button-save" @click="addGuest">Save and Share</button></div></div><div class="modal-backdrop" v-if="state.modalIsOpen"></div></div>');

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
					username = this.guest.email.toLowerCase();
					username = username.match(/[\w]+/g);
					this.guest.username = username.join('_');
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

			populate: function (model, name) {
				this.guest.fullname = (name) ? name : '';
				this.model = (model) ? model : false;
			},

			openModal: function () {
				this.state.modalIsOpen = true;
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
						username: this.guest.username,
						email: this.guest.email
					}
				}

				$.ajax(xhrObject).done(function (xhr) {
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
				}

				return $.ajax({
					type: 'POST',
					url: OC.linkToOCS('apps/files_sharing/api/v1', 2) + 'shares?format=json',
					data: attributes,
					dataType: 'json'
				}).done(function () {

					self.closeModal();

					if (self.model)
						self.model.fetch();

				}).fail(function () {

					// @NOTE: will be expendable in the near future
					OCdialogs.alert(
						t('core', 'Error while sharing'), // text
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

		// Override ShareDigalogView

		obj.autocompleteHandler = function (search, response) {
			var view = obj;
			var $loading = obj.$el.find('.shareWithLoading');
			$loading.removeClass('hidden');
			$loading.addClass('inlineblock');
			$.get(
				OC.linkToOCS('apps/files_sharing/api/v1') + 'sharees',
				{
					format: 'json',
					search: search.term.trim(),
					perPage: 200,
					itemType: view.model.get('itemType')
				},
				function (result) {
					$loading.addClass('hidden');
					$loading.removeClass('inlineblock');
					if (result.ocs.meta.statuscode == 100) {
						var searchTerm = search.term.trim();
						var users = result.ocs.data.exact.users.concat(result.ocs.data.users);
						var groups = result.ocs.data.exact.groups.concat(result.ocs.data.groups);
						var remotes = result.ocs.data.exact.remotes.concat(result.ocs.data.remotes);
						var unknown = [];

						var usersLength;
						var groupsLength;
						var remotesLength;

						var i, j;

						// Add potential guests to the suggestions
						if (searchTerm.search("@") === -1) {

							unknown = [{
								label: t('core', 'Add {unknown} (guest)', {unknown: searchTerm}),
								value: {
									shareType: 4,
									shareWith: searchTerm
								}
							}];
						}

						//Filter out the current user
						usersLength = users.length;
						for (i = 0; i < usersLength; i++) {
							if (users[i].value.shareWith === OC.currentUser) {
								users.splice(i, 1);
								break;
							}
						}

						// Filter out the owner of the share
						if (view.model.hasReshare()) {
							usersLength = users.length;
							for (i = 0; i < usersLength; i++) {
								if (users[i].value.shareWith === view.model.getReshareOwner()) {
									users.splice(i, 1);
									break;
								}
							}
						}

						var shares = view.model.get('shares');
						var sharesLength = shares.length;

						// Now filter out all sharees that are already shared with
						for (i = 0; i < sharesLength; i++) {
							var share = shares[i];

							if (share.share_type === OC.Share.SHARE_TYPE_USER) {
								usersLength = users.length;
								for (j = 0; j < usersLength; j++) {
									if (users[j].value.shareWith === share.share_with) {
										users.splice(j, 1);
										break;
									}
								}
							} else if (share.share_type === OC.Share.SHARE_TYPE_GROUP) {
								groupsLength = groups.length;
								for (j = 0; j < groupsLength; j++) {
									if (groups[j].value.shareWith === share.share_with) {
										groups.splice(j, 1);
										break;
									}
								}
							} else if (share.share_type === OC.Share.SHARE_TYPE_REMOTE) {
								remotesLength = remotes.length;
								for (j = 0; j < remotesLength; j++) {
									if (remotes[j].value.shareWith === share.share_with) {
										remotes.splice(j, 1);
										break;
									}
								}
							}
						}

						var suggestions = users.concat(groups).concat(remotes).concat(unknown);

						if (suggestions.length > 0) {
							$('.shareWithField').removeClass('error')
								.tooltip('hide')
								.autocomplete("option", "autoFocus", true);
							response(suggestions);
						} else {
							var title = t('core', 'No users or groups found for {search}', {search: $('.shareWithField').val()});
							if (!view.configModel.get('allowGroupSharing')) {
								title = t('core', 'No users found for {search}', {search: $('.shareWithField').val()});
							}
							$('.shareWithField').addClass('error')
								.attr('data-original-title', title)
								.tooltip('hide')
								.tooltip({
									placement: 'bottom',
									trigger: 'manual'
								})
								.tooltip('fixTitle')
								.tooltip('show');
							response();
						}
					} else {
						response();
					}
				}
			).fail(function () {
				$loading.addClass('hidden');
				$loading.removeClass('inlineblock');
				OC.Notification.show(t('core', 'An error occurred. Please try again'));
				window.setTimeout(OC.Notification.hide, 5000);
			});
		};

		obj._onSelectRecipient = function (e, s) {
			e.preventDefault();

			// vars starting with $ are jQuery DOM objects
			// ---
			var $this = $(e.target),
				$loading = obj.$el.find('.shareWithLoading');

			$this.attr('disabled', true).val(s.item.label);
			$loading.removeClass('hidden').addClass('inlineblock');

			// Init OCA.Guests.App if share is of type guest
			// ---
			if (s.item.value.shareType === OC.Share.SHARE_TYPE_GUEST) {
				OCA.Guests.App.populate(obj.model, s.item.value.shareWith);
				OCA.Guests.App.openModal();
			}
			else {
				obj.model.addShare(s.item.value, {
					success: function () {
						$this.val('').attr('disabled', false);
						$loading.addClass('hidden').removeClass('inlineblock');
					}, error: function (obj, msg) {
						OC.Notification.showTemporary(msg);
						$this.attr('disabled', false).autocomplete('search', $this.val());
						$loading.addClass('hidden').removeClass('inlineblock');
					}
				});
			}
		}
	}
});
