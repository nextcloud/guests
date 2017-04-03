<?php
/**
 * @author Sergio Bertolin <sbertolin@owncloud.com>
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

use Behat\Behat\Context\Context;
use Behat\Behat\Context\SnippetAcceptingContext;
use GuzzleHttp\Client;

require __DIR__ . '/../../vendor/autoload.php';


/**
 * Guests context.
 */
class GuestsContext implements Context, SnippetAcceptingContext {
	use Webdav;

	/** @var array */
	private $createdGuests = [];

	/**
	 * @Given user :user creates guest user :guestDisplayName with email :guestEmail
	 * @param string $user
	 * @param string $guestDisplayName
	 * @param string $guestEmail
	 */
	public function userCreatedAGuestUser($user, $guestDisplayName, $guestEmail) {
		$fullUrl = substr($this->baseUrl, 0, -4) . '/index.php/apps/guests/users';
		//Replicating frontend behaviour
		$emailDomain = preg_split('/\./', preg_split('/@/', $guestEmail, null, null)[1], null, null);
		$userName = $guestDisplayName . '_' . $emailDomain[0] . '_' . $emailDomain[1];
		$fullUrl = $fullUrl . '?displayName=' . $guestDisplayName . '&email=' . $guestEmail . '&username=' . $userName;
		$client = new Client();
		$options = [];
		if ($user === 'admin') {
			$options['auth'] = $this->adminUser;
		} else {
			$options['auth'] = [$user, $this->regularUser];
		}
		$request = $client->createRequest("PUT", $fullUrl, $options);
		$request->addHeader('Content-Type', 'application/x-www-form-urlencoded');

		try {
			$this->response = $client->send($request);
		} catch (\GuzzleHttp\Exception\BadResponseException $e) {
			// 4xx and 5xx responses cause an exception
			$this->response = $e->getResponse();
		}
		$this->createdGuests[$guestDisplayName] = $guestEmail;
	}

	public function getGuests($user) {
		$fullUrl = substr($this->baseUrl, 0, -4) . '/index.php/apps/guests/users';

		$client = new Client();

		$options = [];
		if ($user === 'admin') {
			$options['auth'] = $this->adminUser;
		} else {
			$options['auth'] = [$user, $this->regularUser];
		}

		$request = $client->createRequest("GET", $fullUrl, $options);

		try {
			$this->response = $client->send($request);
		} catch (\GuzzleHttp\Exception\BadResponseException $e) {
			// 4xx and 5xx responses cause an exception
			$this->response = $e->getResponse();
		}

		return $this->response->xml()->data;
	}

	/**
	 * @Then user :user gets guests users they are
	 * @param string $user
	 * @param \Behat\Gherkin\Node\TableNode|null $tablenode
	 */
	public function getGuestUsers($user, $tablenode) {
		$guestsList = $this->getGuests($user);
		print_r($guestsList);


		// if ($memberList instanceof \Behat\Gherkin\Node\TableNode) {
		// 	$members = $memberList->getRows();
		// 	$membersSimplified = $this->simplifyArray($members);
		// 	$respondedArray = $this->getCustomGroupMembers($user, $customGroup);
		// 	foreach ($membersSimplified as $member) {
		// 		$memberPath = '/' . $this->davPath . $appPath . $customGroup . '/' . $member;
		// 		if (!array_key_exists($memberPath, $respondedArray)){
		// 			PHPUnit_Framework_Assert::fail("$member path" . " is not in report answer");
		// 		}
		// 	}
		// }
	}


}


