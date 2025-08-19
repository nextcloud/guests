<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Guests\Listener;

use OCA\Guests\Config;
use OCP\AppFramework\Http\Events\BeforeTemplateRenderedEvent;
use OCP\AppFramework\Services\IInitialState;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Util;

/**
 * @template-implements IEventListener<Event>
 */
class BeforeTemplateRenderedListener implements IEventListener {
	public function __construct(
		private Config $config,
		private IInitialState $initialState,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof BeforeTemplateRenderedEvent) {
			return;
		}

		$this->initialState->provideInitialState('canCreateGuests', $this->config->canCreateGuests());
		Util::addScript('guests', 'guests-contactsmenu');

		if (!$event->isLoggedIn() || $event->getResponse()->getTemplateName() !== 'index') {
			return;
		}

		// FIXME use this once Nextcloud 25 is the supported minimum
		// if ($event->getResponse()->getApp() !== 'spreed') {
		$params = $event->getResponse()->getParams();
		if (!isset($params['app']) || $params['app'] !== 'spreed') {
			return;
		}

		Util::addScript('guests', 'guests-talk');
	}
}
