<?php

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use OC\NavigationManager;
use OCP\INavigationManager;
use OCP\IUser;

class FilteredNavigationManager extends NavigationManager {

	public function __construct(
		private IUser $user,
		private INavigationManager $navigationManager,
		private AppWhitelist $whitelist,
	) {
	}

	public function getAll(string $type = 'link'): array {
		$items = $this->navigationManager->getAll($type);

		return array_filter($items, [$this, 'isEntryWhitelisted']);
	}

	private function isEntryWhitelisted(array $item): bool {
		return $this->whitelist->isUrlAllowed($this->user, $item['href']);
	}

	public function add($entry): void {
		$this->navigationManager->add($entry);
	}

	public function clear($loadDefaultLinks = true): void {
		$this->navigationManager->clear($loadDefaultLinks);
	}

	public function getActiveEntry(): string {
		return $this->navigationManager->getActiveEntry();
	}

	public function setActiveEntry($appId): void {
		$this->navigationManager->setActiveEntry($appId);
	}

	public function setUnreadCounter(string $id, int $unreadCounter): void {
		$this->navigationManager->setUnreadCounter($id, $unreadCounter);
	}

	/**
	 * @psalm-suppress MethodSignatureMismatch
	 */
	public function get(string $id): ?array {
		return $this->navigationManager->get($id);
	}

	/**
	 * @psalm-suppress MethodSignatureMismatch
	 */
	public function getDefaultEntryIdForUser(?IUser $user = null, bool $withFallbacks = true): string {
		return $this->navigationManager->getDefaultEntryIdForUser($user, $withFallbacks);
	}

	/**
	 * @psalm-suppress MethodSignatureMismatch
	 */
	public function getDefaultEntryIds(bool $withFallbacks = true): array {
		return $this->navigationManager->getDefaultEntryIds($withFallbacks);
	}

	/**
	 * @psalm-suppress MethodSignatureMismatch
	 */
	public function setDefaultEntryIds(array $ids): void {
		$this->navigationManager->setDefaultEntryIds($ids);
	}
}
