<?php
/**
 * @author Jörn Friedrich Dreyer <jfd@butonic.de>
 *
 * @copyright Copyright (c) 2017, ownCloud GmbH
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 */

namespace OCA\Guests\Controller;

use OC\L10N\Factory;
use OCA\Guests\AppWhitelist;
use OCA\Guests\Config;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use OCP\L10N\IFactory;

/**
 * Class SettingsController is used to handle configuration changes on the
 * settings page
 *
 * @package OCA\Guests\Controller
 */
class SettingsController extends Controller {

	/**
	 * @var string
	 */
	private $userId;

	/**
	 * @var Config
	 */
	private $config;

	private $appWhitelist;

	private $l10nFactory;

	public function __construct(
		$AppName,
		IRequest $request,
		$UserId,
		Config $config,
		AppWhitelist $appWhitelist,
		IFactory $l10nFactory
	) {
		parent::__construct($AppName, $request);
		$this->userId = $UserId;
		$this->config = $config;
		$this->appWhitelist = $appWhitelist;
		$this->l10nFactory = $l10nFactory;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @return array
	 */
	public function languages() {
		$languageCodes = $this->l10nFactory->findAvailableLanguages('guests');

		$commonLanguages = [];
		$languages = [];

		foreach($languageCodes as $lang) {
			$l = $this->l10nFactory->get('lib', $lang);
			// TRANSLATORS this is the language name for the language switcher in the personal settings and should be the localized version
			$potentialName = (string) $l->t('__language_name__');
			if ($l->getLanguageCode() === $lang && $potentialName[0] !== '_') {//first check if the language name is in the translation file
				$ln = array(
					'code' => $lang,
					'name' => $potentialName
				);
			} else if ($lang === 'en') {
				$ln = array(
					'code' => $lang,
					'name' => 'English (US)'
				);
			} else {//fallback to language code
				$ln = array(
					'code' => $lang,
					'name' => $lang
				);
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
		usort( $languages, function ($a, $b) {
			if ($a['code'] === $a['name'] && $b['code'] !== $b['name']) {
				// If a doesn't have a name, but b does, list b before a
				return 1;
			}
			if ($a['code'] !== $a['name'] && $b['code'] === $b['name']) {
				// If a does have a name, but b doesn't, list a before b
				return -1;
			}
			// Otherwise compare the names
			return strcmp($a['name'], $b['name']);
		});

		return [
			// reset indexes
			'commonLanguages' => array_values($commonLanguages),
			'languages' => $languages
		];
	}

	/**
	 * AJAX handler for getting the config
	 *
	 * @return DataResponse with the current config
	 */
	public function getConfig() {
		$useWhitelist = $this->config->useWhitelist();
		$allowExternalStorage = $this->config->allowExternalStorage();
		$hideUsers = $this->config->hideOtherUsers();
		$whitelist = $this->config->getAppWhitelist();
		return new DataResponse([
			'useWhitelist' => $useWhitelist,
			'whitelist' => $whitelist,
			'allowExternalStorage' => $allowExternalStorage,
			'hideUsers' => $hideUsers,
			'whiteListableApps' => $this->appWhitelist->getWhitelistAbleApps(),
			'sharingRestrictedToGroup' => $this->config->isSharingRestrictedToGroup(),
		]);
	}
	/**
	 * @param $useWhitelist bool
	 * @param $whitelist string[]
	 * @param $allowExternalStorage bool
	 * @param $hideUsers bool
	 * @return DataResponse
	 */
	public function setConfig($useWhitelist, $whitelist, $allowExternalStorage, $hideUsers) {
		$newWhitelist = [];
		foreach ($whitelist as $app) {
			$newWhitelist[] = trim($app);
		}
		$this->config->setUseWhitelist($useWhitelist);
		$this->config->setAppWhitelist($newWhitelist);
		$this->config->setAllowExternalStorage($allowExternalStorage);
		$this->config->setHideOtherUsers($hideUsers);
		return new DataResponse();
	}

	/**
	 * AJAX handler for getting the whitelisted apps
	 * We do not set the whitelist to null when it is unused. This is by design.
	 * It allows remembering the whitelist throughout changes.
	 *
	 * @NoAdminRequired
	 * @return DataResponse with the current whitelist config
	 */
	public function getWhitelist() {
		$useWhitelist = $this->config->useWhitelist();
		$whitelist = $this->config->getAppWhitelist();
		$whitelist = explode(',', $whitelist);
		return new DataResponse([
			'useWhitelist' => $useWhitelist,
			'whitelist' => $whitelist,
		]);
	}

	/**
	 * AJAX handler for resetting the whitelisted apps
	 *
	 * @NoAdminRequired
	 * @return DataResponse with the reset whitelist
	 */
	public function resetWhitelist() {
		$this->config->setAppWhitelist(AppWhitelist::DEFAULT_WHITELIST);
		return new DataResponse([
			'whitelist' => explode(',', AppWhitelist::DEFAULT_WHITELIST),
		]);
	}
}
