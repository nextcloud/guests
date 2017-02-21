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
		var $guestsByQuota = $section.find('#guestsByQuota');
		var $guestsByGroup = $section.find('#guestsByGroup');
		var $guestGroup = $section.find('#guestGroup');
		var $guestsByContact = $section.find('#guestsByContact');
		var $guestUseWhitelist = $section.find('#guestUseWhitelist');
		var $guestWhitelist = $section.find('#guestWhitelist');
		var $resetWhitelist = $section.find('#guestResetWhitelist');
		var $msg = $section.find('.msg');

		var config = { conditions: ['quota'], group: 'guests',
			useWhitelist: true, whitelist:[
				'','core','settings','avatar','files','files_trashbin','files_sharing'
			]};

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
					if($.inArray('quota', config.conditions) > -1) {
						$guestsByQuota.prop('checked', true);
					} else {
						$guestsByQuota.prop('checked', false);
					}
					if($.inArray('group', config.conditions) > -1) {
						$guestsByGroup.prop('checked', true);
					} else {
						$guestsByGroup.prop('checked', false);
					}
					if($.inArray('contact', config.conditions) > -1) {
						$guestsByContact.prop('checked', true);
					} else {
						$guestsByContact.prop('checked', false);
					}
					if(config.useWhitelist) {
						$guestUseWhitelist.prop('checked', true);
						$guestWhitelist.show();
					} else {
						$guestUseWhitelist.prop('checked', false);
						$guestWhitelist.hide();
					}
					if (config.group) {
						$guestGroup.val(config.group);
					} else {
						$guestGroup.val('');
					}
					if ($.isArray(config.whitelist)) {
						$guestWhitelist.val(config.whitelist.join());
					} else {
						$guestWhitelist.val('');
					}
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
			if ($guestsByQuota.prop('checked')) {
				conditions.push('quota');
			}
			if ($guestsByGroup.prop('checked')) {
				conditions.push('group');
			}
			if ($guestsByContact.prop('checked')) {
				conditions.push('contact');
			}
			config.conditions = conditions;
		};

		// listen to ui changes
		$guestsByQuota.on('change', function () {
			updateConditions();
			saveConfig();
		});
		$guestsByGroup.on('change', function () {
			updateConditions();
			saveConfig();
		});
		$guestsByContact.on('change', function () {
			updateConditions();
			saveConfig();
		});
		$guestGroup.on('change', function () {
			config.group = $guestGroup.val();
			saveConfig();
		});
		$guestUseWhitelist.on('change', function () {
			config.useWhitelist = $guestUseWhitelist.prop('checked');
			if(config.useWhitelist) {
				$guestWhitelist.show();
			} else {
				$guestWhitelist.hide();
			}
			saveConfig();
		});
		$guestWhitelist.on('change', function () {
			var apps = $guestWhitelist.val().split(',');
			config.whitelist = [];
			$.each(apps, function( index, value ) {
				config.whitelist.push(value.trim());
			});
			saveConfig();
		});
		$resetWhitelist.on('click', function () {
			OC.msg.startSaving($msg);
			$.ajax({
				type: 'POST',
				url: OC.generateUrl('apps/guests/whitelist/reset')
			}).success(function(response) {
				config.whitelist = response.whitelist;
				//update ui
				if ($.isArray(config.whitelist)) {
					$guestWhitelist.val(config.whitelist.join());
				} else {
					$guestWhitelist.val('');
				}
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