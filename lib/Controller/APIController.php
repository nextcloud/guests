<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Controller;

use OC\L10N\Factory;
use OCA\Guests\AppInfo\Application;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\Group\ISubAdmin;
use OCP\IGroup;
use OCP\IGroupManager;
use OCP\IRequest;
use OCP\IUserSession;
use OCP\L10N\IFactory;

class APIController extends OCSController {
	public function __construct(
		IRequest $request,
		private readonly IUserSession $userSession,
		private readonly \OCA\Guests\Config $config,
		private readonly IFactory $l10nFactory,
		private readonly ISubAdmin $subAdmin,
		private readonly IGroupManager $groupManager,
	) {
		parent::__construct(Application::APP_ID, $request);
	}

	#[NoAdminRequired]
	public function languages(): DataResponse {
		$languageCodes = $this->l10nFactory->findAvailableLanguages('guests');

		$commonLanguages = [];
		$languages = [];

		foreach ($languageCodes as $lang) {
			$l = $this->l10nFactory->get('lib', $lang);
			// TRANSLATORS this is the language name for the language switcher in the personal settings and should be the localized version
			$potentialName = $l->t('__language_name__');
			if ($l->getLanguageCode() === $lang && $potentialName[0] !== '_') {//first check if the language name is in the translation file
				$ln = [
					'code' => $lang,
					'name' => $potentialName,
				];
			} elseif ($lang === 'en') {
				$ln = [
					'code' => $lang,
					'name' => 'English (US)',
				];
			} else {//fallback to language code
				$ln = [
					'code' => $lang,
					'name' => $lang,
				];
			}

			// put appropriate languages into appropriate arrays, to print them sorted
			// common languages -> divider -> other languages
			if (in_array($lang, Factory::COMMON_LANGUAGE_CODES)) {
				$commonLanguages[array_search($lang, Factory::COMMON_LANGUAGE_CODES)] = $ln;
			} else {
				$languages[] = $ln;
			}
		}

		ksort($commonLanguages);

		// sort now by displayed language not the iso-code
		usort($languages, function (array $a, array $b): int {
			if ($a['code'] === $a['name'] && $b['code'] !== $b['name']) {
				// If a doesn't have a name, but b does, list b before a
				return 1;
			}
			if ($a['code'] !== $a['name'] && $b['code'] === $b['name']) {
				// If a does have a name, but b doesn't, list a before b
				return -1;
			}
			// Otherwise compare the names
			return strcmp((string)$a['name'], (string)$b['name']);
		});

		return new DataResponse([
			// reset indexes
			'commonLanguages' => array_values($commonLanguages),
			'languages' => $languages,
		]);
	}

	#[NoAdminRequired]
	public function groups(): DataResponse {
		$user = $this->userSession->getUser();
		if ($this->groupManager->isAdmin($user->getUID())) {
			$groups = $this->groupManager->search('');
		} else {
			$groups = $this->subAdmin->getSubAdminsGroups($user);
		}
		$groups = array_values(array_map(fn (IGroup $group): array => [
			'gid' => $group->getGID(),
			'name' => $group->getDisplayName(),
		], $groups));

		return new DataResponse([
			'required' => $this->config->isSharingRestrictedToGroup(),
			'groups' => $groups,
		]);
	}
}
