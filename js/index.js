import Vue from 'vue';
import GuestForm from './GuestForm.vue';
import Nextcloud from './mixins/Nextcloud'

Vue.mixin(Nextcloud);

if (!OCA.Guests) {
	/**
	 * @namespace OCA.Guests
	 */
	OCA.Guests = {};
}

let mounted = false;
const App = new Vue(GuestForm);

OC.Plugins.register('OC.Share.ShareDialogView', {
	attach: function (obj) {
		if (!mounted) {
			const root = document.createElement('div');
			root.setAttribute('id', 'guest-root');
			document.body.appendChild(root);
			App.$mount('#guest-root');
			mounted = true;
		}

		var originalAutocompleteHandler = obj.autocompleteHandler;
		var lastSearch = '';

		obj.autocompleteHandler = function (search, response) {
			originalAutocompleteHandler(search, function(suggestions) {

				var searchTerm = search.term.trim();
				if (lastSearch !== searchTerm) {
					lastSearch = searchTerm;
					suggestions.push({
						label: t('core', 'Create guest account for {searchTerm}', {searchTerm}),
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
				App.populate(obj.model, s.item.value.shareWith);
				App.openModal();
			} else {
				original_onSelectRecipient(e, s);
			}
		};
	}
});
