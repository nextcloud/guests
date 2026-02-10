<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Settings;

use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\Settings\IIconSection;
use Override;

class Section implements IIconSection {
	public function __construct(
		private readonly IURLGenerator $url,
		private readonly IL10N $l,
	) {
	}

	#[Override]
	public function getID(): string {
		return 'guests';
	}

	#[Override]
	public function getName(): string {
		return $this->l->t('Guests');
	}

	#[Override]
	public function getPriority(): int {
		return 30;
	}

	#[Override]
	public function getIcon(): string {
		return $this->url->imagePath('guests', 'app-dark.svg');
	}
}
