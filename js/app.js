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
OCA.Guests.App = {

};


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
							label: searchTerm,
							value: {
								shareType: 4,
								shareWith: searchTerm.toLowerCase()
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
				var type = 'PUT';
				var url = '/index.php' + OC.linkTo('guests', 'users');
				var data = {
					username: s.item.value.shareWith,
					password: '12345',
					email: s.item.value.shareWith + '@foo.bar'
				};

				$.ajax({
					type: type,
					url: url,
					data: data,
					dataType: 'text'
				}).done(function (xhr) {

					response = JSON.parse(xhr);

					OC.dialogs.alert(response.message, t('core', 'Tadaa'));

					$(e.target).val('')
						.attr('disabled', false);
					$loading.addClass('hidden')
						.removeClass('inlineblock');

				}).fail(function (xhr) {
					var msg = t('core', 'Error');
					var result = xhr.responseJSON;
					if (result && result.ocs && result.ocs.meta) {
						msg = result.ocs.meta.message;
					}

					OC.dialogs.alert(msg, t('core', 'Error while sharing'));
				});
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
