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
 */
(function() {

	$(document).ready(function () {

		// variables
		var $section = $('#guests');
		var $guestsByGroup = $section.find('#guestsByGroup');
		var $allowExternalStorage = $section.find('#allowExternalStorage');
		var $guestUseWhitelist = $section.find('#guestUseWhitelist');
		var $guestWhitelist = $section.find('#guestWhitelist');
		var $guestWhitelistContainer = $section.find('.whitelist');
		var $resetWhitelist = $section.find('#guestResetWhitelist');
		var $msg = $section.find('.msg');
		var loading = true;

		var config = { conditions: ['quota'], group: 'guests',
			useWhitelist: true, whitelist:[
				'','core','settings','avatar','files','files_trashbin','files_sharing'
			]};

		$guestWhitelist.select2();

		// functions

		var loadConfig = function () {
			OC.msg.startAction($msg, t('guests', 'Loading…'));
			$.get(
				OC.generateUrl('apps/guests/config'),
				'',
				function (data) {
					// update model
					config = data;
					// update ui
					if(config.useWhitelist) {
						$guestUseWhitelist.prop('checked', true);
						$guestWhitelistContainer.show();
					} else {
						$guestUseWhitelist.prop('checked', false);
						$guestWhitelistContainer.hide();
					}
					$allowExternalStorage.prop('checked', config.allowExternalStorage);
					if ($.isArray(config.whitelist)) {
						$guestWhitelist.val(config.whitelist).trigger("change");
					}
					loading = false;
				},
				'json'
			).then(function() {
				var data = { status: 'success',	data: {message: t('guests', 'Loaded')} };
				OC.msg.finishedAction($msg, data);
			}, function(result) {
				var data = { status: 'error', data:{message:result.responseJSON.message} };
				OC.msg.finishedAction($msg, data);
			});
		};

		var saveConfig = function () {
			if (loading) {
				return;
			}
			OC.msg.startSaving($msg);
			$.ajax({
				type: 'PUT',
				url: OC.generateUrl('apps/guests/config'),
				data: config,
				dataType: 'json'
			}).success(function() {
				var data = { status:'success', data:{message:t('guests', 'Saved')} };
				OC.msg.finishedSaving($msg, data);
			}).fail(function(result) {
				var data = { status: 'error', data:{message:result.responseJSON.message} };
				OC.msg.finishedSaving($msg, data);
			});
		};

		// load initial config
		loadConfig();

		var updateConditions = function () {
			var conditions = [];

			if ($guestsByGroup.prop('checked')) {
				conditions.push('group');
			}
			config.conditions = conditions;
		};

		// listen to ui changes
		$guestsByGroup.on('change', function () {
			updateConditions();
			saveConfig();
		});

		$guestUseWhitelist.on('change', function () {
			config.useWhitelist = $guestUseWhitelist.prop('checked');
			if(config.useWhitelist) {
				$guestWhitelistContainer.show();
			} else {
				$guestWhitelistContainer.hide();
			}
			saveConfig();
		});
		$guestWhitelist.on('change', function () {
			var apps = $guestWhitelist.val();
			config.whitelist = [];
			$.each(apps, function( index, value ) {
				config.whitelist.push(value.trim());
			});
			saveConfig();
		});
		$allowExternalStorage.on('change', function () {
			config.allowExternalStorage = $allowExternalStorage.prop('checked');
			saveConfig();
		});
		$resetWhitelist.on('click', function () {
			OC.msg.startSaving($msg);
			$.ajax({
				type: 'POST',
				url: OC.generateUrl('apps/guests/whitelist/reset')
			}).success(function(response) {
				config.whitelist = response.whitelist;

				// prevent it saving again
				loading = true;

				//update ui
				if ($.isArray(config.whitelist)) {
					$guestWhitelist.val(config.whitelist).trigger("change");
				} else {
					$guestWhitelist.val([]).trigger("change");
				}

				loading = false;

				OC.msg.finishedSaving($msg, {
					status:'success',
					data: { message:t('guests', 'Reset') }
				});
			}).fail(function(response) {
				OC.msg.finishedSaving($msg, {
					status: 'error',
					data: { message: response.responseJSON.message }
				});
			});
		});

	});

})();
