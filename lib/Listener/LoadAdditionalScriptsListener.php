<?php

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);


namespace OCA\Guests\Listener;

use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCA\Guests\Config;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Util;

/**
 * @template-implements IEventListener<LoadAdditionalScriptsEvent>
 */
class LoadAdditionalScriptsListener implements IEventListener {

	public function __construct(
		private Config $config,
	) {
	}

	/**
	 * @param Event $event
	 */
	public function handle(Event $event): void {
		// If the user cannot create guests, we don't need to load the script
		if (!$this->config->canCreateGuests()) {
			return;
		}

		Util::addScript('guests', 'guests-main');
	}
}
