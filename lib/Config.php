<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests;

use OCA\Guests\AppInfo\Application;
use OCP\AppFramework\Services\IAppConfig;
use OCP\Group\ISubAdmin;
use OCP\IAppConfig as IGlobalAppConfig;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IUserSession;

class Config {
	public function __construct(
		private readonly IConfig $config,
		private readonly IGlobalAppConfig $globalAppConfig,
		private readonly IAppConfig $appConfig,
		private readonly ISubAdmin $subAdmin,
		private readonly IUserSession $userSession,
		private readonly IGroupManager $groupManager,
	) {
	}

	public function allowExternalStorage(): bool {
		return $this->appConfig->getAppValueBool(ConfigLexicon::EXTERNAL_STORAGE_ENABLED);
	}

	public function setAllowExternalStorage(bool $allow): void {
		$this->appConfig->setAppValueBool(ConfigLexicon::EXTERNAL_STORAGE_ENABLED, $allow);
	}

	public function useHashedEmailAsUserID(): bool {
		return $this->appConfig->getAppValueBool('hash_user_ids', true);
	}

	public function setUseHashedEmailAsUserID(bool $useHash): void {
		$this->appConfig->setAppValueBool('hash_user_ids', $useHash) ;
	}

	public function hideOtherUsers(): bool {
		return $this->appConfig->getAppValueBool(ConfigLexicon::HIDE_OTHER_ACCOUNTS);
	}

	public function setHideOtherUsers(bool $hide): void {
		$this->appConfig->setAppValueBool(ConfigLexicon::HIDE_OTHER_ACCOUNTS, $hide);
	}

	/**
	 * Currently configured default quota for new guest accounts. Returns the
	 * explicit override if one is set, otherwise the preset-derived default.
	 */
	public function getGuestQuota(): string {
		return $this->appConfig->getAppValueString(ConfigLexicon::GUEST_DISK_QUOTA);
	}

	/**
	 * Whether an explicit default quota is stored, as opposed to falling back
	 * to the preset-derived default from the config lexicon.
	 */
	public function hasGuestQuotaOverride(): bool {
		return $this->globalAppConfig->hasKey(Application::APP_ID, ConfigLexicon::GUEST_DISK_QUOTA);
	}

	/**
	 * The preset-derived default quota, regardless of any override. This is the
	 * value the instance's configuration preset assigns to guests.
	 */
	public function getGuestQuotaDefault(): string {
		return (string)($this->globalAppConfig->getKeyDetails(Application::APP_ID, ConfigLexicon::GUEST_DISK_QUOTA)['default'] ?? '0 B');
	}

	/**
	 * Store the default guest quota. An empty value or 'default' removes the
	 * override so the preset-derived default applies again.
	 */
	public function setGuestQuota(?string $quota): void {
		if ($quota === null || $quota === '' || $quota === 'default') {
			$this->appConfig->deleteAppValue(ConfigLexicon::GUEST_DISK_QUOTA);
			return;
		}
		$this->appConfig->setAppValueString(ConfigLexicon::GUEST_DISK_QUOTA, $quota);
	}

	public function getHome(string $uid): string {
		return $this->config->getSystemValue('datadirectory', \OC::$SERVERROOT . '/data') . '/' . $uid;
	}

	public function useWhitelist(): bool {
		return $this->appConfig->getAppValueBool(ConfigLexicon::WHITE_LIST_ENABLED);
	}

	public function setUseWhitelist(bool $use): void {
		$this->appConfig->setAppValueBool(ConfigLexicon::WHITE_LIST_ENABLED, $use);
	}

	/**
	 * @return list<string>
	 */
	public function getAppWhitelist(): array {
		return array_values(array_filter(explode(',', $this->appConfig->getAppValueString(ConfigLexicon::WHITE_LIST)), static fn (string $app): bool => $app !== ''));
	}

	public function setAppWhitelist(array $whitelist): void {
		$this->appConfig->setAppValueString(ConfigLexicon::WHITE_LIST, implode(',', $whitelist));
	}

	public function isSharingRestrictedToGroup(): bool {
		return $this->globalAppConfig->getValueBool('core', 'shareapi_only_share_with_group_members');
	}

	public function canCreateGuests(): bool {
		$user = $this->userSession->getUser();
		if (!$user) {
			return false;
		}

		// Admins and sub-admins can always create guests
		if ($this->groupManager->isAdmin($user->getUID())
			|| $this->subAdmin->isSubAdmin($user)) {
			return true;
		}

		// Check if we have a group restriction
		// and if the user belong to that group
		$groupRestriction = $this->getCreateRestrictedToGroup();
		if ($groupRestriction !== []) {
			$userGroups = $this->groupManager->getUserGroupIds($user);
			$groupRestriction = array_intersect($userGroups, $groupRestriction);
			if ($groupRestriction === []) {
				return false;
			}
		}

		return !$this->isSharingRestrictedToGroup();
	}

	/**
	 * @return list<string>
	 */
	public function getCreateRestrictedToGroup(): array {
		$groups = $this->appConfig->getAppValueArray(ConfigLexicon::GROUP_LIMITATION);
		// If empty, it means there is no restriction
		if (empty($groups)) {
			return [];
		}

		// It does not matter at this point if the admin
		// group is in the list or not. We are checking it
		// anyway in the canCreateGuests method.
		return array_values(array_unique($this->appConfig->getAppValueArray(ConfigLexicon::GROUP_LIMITATION)));
	}

	/**
	 * @param list<string> $groups
	 */
	public function setCreateRestrictedToGroup(array $groups): void {
		$this->appConfig->setAppValueArray('create_restricted_to_group', $groups);
	}

	/**
	 * Email domains that must not be invited as guests.
	 *
	 * @return list<string>
	 */
	public function getBlockedDomains(): array {
		return self::normalizeDomains($this->appConfig->getAppValueArray(ConfigLexicon::BLOCKED_DOMAINS));
	}

	/**
	 * @param list<string> $domains
	 */
	public function setBlockedDomains(array $domains): void {
		$this->appConfig->setAppValueArray(ConfigLexicon::BLOCKED_DOMAINS, self::normalizeDomains($domains));
	}

	/**
	 * Whether the domain of the given email address is blocked for guest
	 * invitations. A blocked entry like "example.com" matches the domain
	 * itself and all of its subdomains (e.g. "mail.example.com"), but not
	 * unrelated domains sharing the same suffix (e.g. "otherexample.com").
	 */
	public function isEmailDomainBlocked(string $email): bool {
		$atPosition = strrpos($email, '@');
		if ($atPosition === false) {
			return false;
		}
		$rawDomain = rtrim(mb_strtolower(trim(substr($email, $atPosition + 1))), '.');
		if ($rawDomain === '') {
			return false;
		}
		$emailDomain = self::toAsciiDomain($rawDomain) ?? $rawDomain;

		foreach ($this->getBlockedDomains() as $blockedDomain) {
			$blockedDomain = self::toAsciiDomain($blockedDomain);
			if ($blockedDomain === null) {
				continue;
			}
			if ($emailDomain === $blockedDomain || str_ends_with($emailDomain, '.' . $blockedDomain)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Lower-case, trim and de-duplicate domain entries. Leading "@", "*." and
	 * "." as well as trailing dots are stripped, so "@Example.com" and
	 * "*.example.com" are both stored as "example.com". Entries that are not
	 * a valid domain name are dropped. Internationalized domains are kept in
	 * the form they were entered; "bücher.de" and "xn--bcher-kva.de" count as
	 * duplicates.
	 *
	 * @param array<array-key, mixed> $domains
	 * @return list<string>
	 */
	public static function normalizeDomains(array $domains): array {
		$normalized = [];
		foreach ($domains as $domain) {
			if (!is_string($domain)) {
				continue;
			}
			$domain = mb_strtolower(trim($domain));
			$domain = preg_replace('/^(@|\*\.|\.)+/u', '', $domain) ?? '';
			$domain = rtrim($domain, '.');
			$asciiDomain = self::toAsciiDomain($domain);
			if ($asciiDomain === null || isset($normalized[$asciiDomain])) {
				continue;
			}
			$normalized[$asciiDomain] = $domain;
		}
		return array_values($normalized);
	}

	/**
	 * Convert a lower-case domain to its ASCII (punycode) form and validate it
	 * as a hostname: at most 253 characters, labels of 1-63 letters, digits or
	 * inner hyphens.
	 */
	private static function toAsciiDomain(string $domain): ?string {
		if ($domain === '') {
			return null;
		}
		$ascii = idn_to_ascii($domain, IDNA_NONTRANSITIONAL_TO_ASCII, INTL_IDNA_VARIANT_UTS46);
		if ($ascii === false) {
			return null;
		}
		$ascii = strtolower($ascii);
		if (strlen($ascii) > 253
			|| preg_match('/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/', $ascii) !== 1) {
			return null;
		}
		return $ascii;
	}
}
