<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use OCP\Config\Lexicon\Entry;
use OCP\Config\Lexicon\ILexicon;
use OCP\Config\Lexicon\Preset;
use OCP\Config\Lexicon\Strictness;
use OCP\Config\ValueType;

/**
 * Config Lexicon for guests app.
 *
 * Please Add & Manage your Config Keys in that file and keep the Lexicon up to date!
 *
 * {@see ILexicon}
 */
class ConfigLexicon implements ILexicon {
	public const HIDE_OTHER_ACCOUNTS = 'hide_users';
	public const EXTERNAL_STORAGE_ENABLED = 'allow_external_storage';
	public const WHITE_LIST_ENABLED = 'usewhitelist';
	public const WHITE_LIST = 'whitelist';
	public const GROUP_LIMITATION = 'create_restricted_to_group';
	public const GUEST_DISK_QUOTA = 'guest_quota';
	public const USER_CREATED_BY = 'created_by';

	public function getStrictness(): Strictness {
		return Strictness::NOTICE;
	}

	public function getAppConfigs(): array {
		return [
			new Entry(self::EXTERNAL_STORAGE_ENABLED, ValueType::BOOL, false, 'permit guests to access to external storage'),
			new Entry(self::HIDE_OTHER_ACCOUNTS, ValueType::BOOL, true, 'hide other accounts to guests'),
			new Entry(self::WHITE_LIST_ENABLED, ValueType::BOOL, true, 'enable a white listing of limited apps made available to guests'),
			new Entry(self::WHITE_LIST, ValueType::STRING, AppWhitelist::DEFAULT_WHITELIST, 'list of white listed apps available to guests'),
			new Entry(self::GUEST_DISK_QUOTA, ValueType::STRING, defaultRaw: fn (Preset $p): string => match ($p) {
				Preset::PRIVATE, Preset::FAMILY => '1 GB',
				Preset::SMALL, Preset::MEDIUM, Preset::LARGE => '10 GB',
				default => '0 B',
			}, definition: 'set default disk quota assigned to guest account at its creation'),
			new Entry(self::GROUP_LIMITATION, ValueType::ARRAY, []),
		];
	}

	public function getUserConfigs(): array {
		return [
			new Entry(self::USER_CREATED_BY, ValueType::STRING, null, 'user that generated this guest account'),
		];
	}
}
