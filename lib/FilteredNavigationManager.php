<?php
/**
 * @copyright Copyright (c) 2017 Robin Appelman <robin@icewind.nl>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Guests;

use OC\NavigationManager;
use OCP\IUser;

class FilteredNavigationManager extends NavigationManager {
	private $whitelist;

	private $user;

	private $navigationManager;

	public function __construct(IUser $user, NavigationManager $navigationManager, AppWhitelist $whitelist) {
		$this->whitelist = $whitelist;
		$this->user = $user;
		$this->navigationManager = $navigationManager;
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

	public function setActiveEntry($id) {
		$this->navigationManager->setActiveEntry($id);
	}
}
