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
	$('body').append('<div id="app-guests"><div class="modal" v-if="modalIsOpen"><h2 class="modal-title">Add <span class="placeholder-name">{{fullname}}</span> to guests</h2><div class="modal-body"><div class="form-group"><label class="form-label" for="username">Username:</label><input class="form-input" id="username" type="text" v-model="username" disabled></div><div class="form-group"><label class="form-label" for="username">Name:</label><input class="form-input" id="username" type="text" v-model="fullname"></div><div class="form-group"><label class="form-label" for="email">E-Mail:</label><input class="form-input" id="email" type="email" v-model="email"></div></div><div class="modal-footer"><button class="button-close" @click="closeModal">Cancel</button><button class="button-save" @click="addGuest">Save and Share</button></div></div><div class="modal-backdrop" v-if="modalIsOpen"></div></div>');

	OCA.Guests.App = new Vue({
		el        : '#app-guests',
		data      : {

			// modal state
			modalIsOpen : false,

			// guest data
			fullname : null,
			username : null,
			password : null,
			email    : null
		},
		watch : {
			fullname : function() {
				if (this.fullname) {
					username      = this.fullname.toLowerCase();
					username      = username.match(/\w+/g);
					this.username = username.join('_');
				}
				else {
					this.username = null;
				}
			}
		},
		methods : {

			// Backbone model
			setModel: function (model) {
				this.model = model;
			},

			openModal: function(name) {
				this.modalIsOpen = true;
				this.fullname = (name) ? name : '';
			},

			closeModal: function() {
				this.modalIsOpen = false;
				this._resetForm();
			},

			addGuest : function() {
				var self = this;
				xhrObject = {
					type: 'PUT',
					url: '/index.php' + OC.linkTo('guests', 'users'),
					dataType: 'text',
					data: {
						username : this.username,
						// @TODO: Set password in API
						password : '123qwe',
						email    : this.email
					}
				}

				$.ajax(xhrObject).done(function (xhr) {

					self._addGuestShare();

				}).fail(function (xhr) {
					var msg = t('core', 'Error');
					var result = xhr.responseJSON;
					if (result && result.ocs && result.ocs.meta) {
						msg = result.ocs.meta.message;
					}

					OC.dialogs.alert(msg, t('core', 'Error while sharing'));
				});
			},

			_addGuestShare: function () {
				var self = this;
				var attributes = {
					shareType: 0,
					shareWith: this.username,
					permissions: 19,
					path: "/welcome.txt"
				}

				return $.ajax({
					type: 'POST',
					url: OC.linkToOCS('apps/files_sharing/api/v1', 2) + 'shares?format=json',
					data: attributes,
					dataType: 'json'
				}).done(function() {

					self.closeModal();

					if (self.model)
						self.model.fetch();

				}).fail(function(xhr) {
					var msg = t('core', 'Error');
					var result = xhr.responseJSON;
					if (result && result.ocs && result.ocs.meta) {
						msg = result.ocs.meta.message;
					}
					OC.dialogs.alert(msg, t('core', 'Error while sharing'));
				});
			},

			_resetForm: function () {
				this.fullname = this.username = this.password = this.email = null;
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

						// Potential guests
						var unknown = [{
							label: t('core', 'Add {unknown} (guest)', {unknown: searchTerm}),
							value: {
								shareType: 4,
								shareWith: searchTerm
							}
						}];

						var usersLength;
						var groupsLength;
						var remotesLength;

						var i, j;

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

		// Override _onSelectRecipient
		obj._onSelectRecipient = function (e, s) {
			e.preventDefault();
			$(e.target).attr('disabled', true)
				.val(s.item.label);
			var $loading = obj.$el.find('.shareWithLoading');
			$loading.removeClass('hidden')
				.addClass('inlineblock');

			if (s.item.value.shareType === OC.Share.SHARE_TYPE_GUEST) {

				// Hijack regular sharing dialog
				OCA.Guests.App.setModel( obj.model );
				OCA.Guests.App.openModal( s.item.value.shareWith );
			}
			else {
				obj.model.addShare(s.item.value, {
					success: function () {
						$(e.target).val('')
							.attr('disabled', false);
						$loading.addClass('hidden')
							.removeClass('inlineblock');
					}, error: function (obj, msg) {
						OC.Notification.showTemporary(msg);
						$(e.target).attr('disabled', false)
							.autocomplete('search', $(e.target).val());
						$loading.addClass('hidden')
							.removeClass('inlineblock');
					}
				});
			}
		}
	}
});
