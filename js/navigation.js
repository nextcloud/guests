/**
 * ownCloud
 *
 * @author Jörn Friedrich Dreyer <jfd@owncloud.com>
 * @copyright (C) 2015-2016 ownCloud, Inc.
 *
 * This code is covered by the ownCloud Commercial License.
 *
 * You should have received a copy of the ownCloud Commercial License
 * along with this program. If not, see <https://owncloud.com/licenses/owncloud-commercial/>.
 *
 */
(function() {

	$(document).ready(function () {

		// functions

		var updateNavigation = function () {
			$.get(
				OC.generateUrl('apps/guests/apps'),
				'',
				function (data) {
					$('#navigation li').each(function (i, e){
						var $e = $(e);
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