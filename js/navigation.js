/**
 * ownCloud
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING-AGPL file.
 *
 * @author Jörn Friedrich Dreyer <jfd@butonic.de>
 * @copyright Jörn Friedrich Dreyer 2015
 */
(function() {

	$(document).ready(function () {

		// functions

		var updateNavigation = function () {
			$.get(
				OC.generateUrl('apps/guests/apps'),
				'',
				function (data) {
					apps = data.apps;
					$('#navigation li').each(function (i, e){
						$e = $(e);
						if ( $.inArray($e.data('id'), data.apps) < 0 ) {
							$e.remove();
						}
					});
				},
				'json'
			);
		};

		updateNavigation();
	});

})();