<?php

/**
 * SPDX-FileCopyrightText: 2017-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2017 ownCloud GmbH
 * SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
 */

namespace OCA\Guests\Settings;

use OCA\Guests\AppWhitelist;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\Util;

class Admin implements \OCP\Settings\ISettings {
	/** @var AppWhitelist */
	private $appWhitelist;

	public function __construct(AppWhitelist $appWhitelist) {
		$this->appWhitelist = $appWhitelist;
	}

	/**
	 * {@inheritdoc}
	 */
	public function getForm(): TemplateResponse {
		Util::addScript('guests', 'guests-settings');
		return new TemplateResponse('guests', 'settings/admin');
	}

	/**
	 * {@inheritdoc}
	 */
	public function getSection(): string {
		return 'guests';
	}

	/**
	 * {@inheritdoc}
	 */
	public function getPriority(): int {
		return 0;
	}
}
