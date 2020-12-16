<?php
/**
 * @copyright Copyright (c) 2017 Lukas Reschke <lukas@nextcloud.com>
 *
 * @author Lukas Reschke <lukas@nextcloud.com>
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

namespace OCA\Guests\Settings;

use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\Settings\IIconSection;

class Section implements IIconSection {
	/** @var IL10N */
	private $l;
	/** @var IURLGenerator */
	private $url;

	/**
	 * @param IURLGenerator $url
	 * @param IL10N $l
	 */
	public function __construct(IURLGenerator $url, IL10N $l) {
		$this->url = $url;
		$this->l = $l;
	}

	/**
	 * {@inheritdoc}
	 */
	public function getID(): string {
		return 'guests';
	}

	/**
	 * {@inheritdoc}
	 */
	public function getName(): string {
		return $this->l->t('Guests');
	}

	/**
	 * {@inheritdoc}
	 */
	public function getPriority(): int {
		return 30;
	}

	/**
	 * {@inheritdoc}
	 */
	public function getIcon(): string {
		return $this->url->imagePath('guests', 'app-dark.svg');
	}
}
