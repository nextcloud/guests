<?php

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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
