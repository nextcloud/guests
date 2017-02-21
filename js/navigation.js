/**
 * ownCloud
 *
 * @author Jörn Friedrich Dreyer <jfd@owncloud.com>
 * @copyright (C) 2015-2017 ownCloud, Inc.
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
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