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

		// variables
		var $section = $('#guests');
		var $guestsByQuota = $section.find('#guestsByQuota');
		var $guestsByGroup = $section.find('#guestsByGroup');
		var $guestGroup = $section.find('#guestGroup');
		var $guestsByContact = $section.find('#guestsByContact');
		var $guestApps = $section.find('#guestApps');
		var $msg = $section.find('.msg');

		var config = { conditions: ['quota'], group: 'guests',
			apps:[
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
					if (config.group) {
						$guestGroup.val(config.group);
					} else {
						$guestGroup.val('');
					}
					if ($.isArray(config.apps)) {
						$guestApps.val(config.apps.join());
					} else {
						$guestApps.val('');
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
		$guestApps.on('change', function () {
			var apps = $guestApps.val().split(',');
			config.apps = [];
			$.each(apps, function( index, value ) {
				config.apps.push(value.trim());
			});
			saveConfig();
		});

	});

})();