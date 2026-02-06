<?php

/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2017 ownCloud GmbH
 * SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
 */
use Behat\Behat\Context\Context;
use Behat\Behat\Context\SnippetAcceptingContext;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Exception\ClientException;

require __DIR__ . '/../../vendor/autoload.php';


/**
 * Guests context.
 */
class GuestsContext implements Context, SnippetAcceptingContext {
	use Webdav;

	private array $createdGuests = [];

	public function prepareUserNameAsFrontend(string $guestDisplayName, $guestEmail) {
		$emailDomain = preg_split('/\./', (string)preg_split('/@/', (string)$guestEmail, 0, null)[1], 0, null);
		return $guestDisplayName . '_' . $emailDomain[0] . '_' . $emailDomain[1];
	}

	/**
	 * @Given user :user creates guest user :guestDisplayName with email :guestEmail
	 * @param string $user
	 */
	public function userCreatedAGuestUser($user, string $guestDisplayName, string $guestEmail): void {
		$fullUrl = substr($this->baseUrl, 0, -4) . '/index.php/apps/guests/users';
		//Replicating frontend behaviour
		$userName = $this->prepareUserNameAsFrontend($guestDisplayName, $guestEmail);
		$fullUrl = $fullUrl . '?displayName=' . $guestDisplayName . '&email=' . $guestEmail . '&username=' . $userName;
		$client = new Client();
		$options = [];
		if ($user === 'admin') {
			$options['auth'] = $this->adminUser;
		} else {
			$options['auth'] = [$user, $this->regularUser];
		}
		$request = $client->createRequest('PUT', $fullUrl, $options);
		$request->addHeader('Content-Type', 'application/x-www-form-urlencoded');

		try {
			$this->response = $client->send($request);
		} catch (BadResponseException $e) {
			// 4xx and 5xx responses cause an exception
			$this->response = $e->getResponse();
		}
		$this->createdGuests[$guestDisplayName] = $guestEmail;
	}

	/**
	 * @Then check that user :user is a guest
	 */
	public function checkGuestUser(string $guestDisplayName): void {
		$userName = $this->prepareUserNameAsFrontend($guestDisplayName, $this->createdGuests[$guestDisplayName]);
		$this->checkThatUserBelongsToGroup($userName, 'guest_app');
	}

	/**
	 * @Then guest user :user is deleted
	 */
	public function deleteGuestUser(string $guestDisplayName): void {
		$userName = $this->prepareUserNameAsFrontend($guestDisplayName, $this->createdGuests[$guestDisplayName]);
		$this->deleteUser($userName);
	}

	/*Processes the body of an email sent and gets the reset password url
	  It depends on the content of the email*/
	public function extractResetPasswordUrl($emailBody): string {
		$knownString = 'Activate your guest account at ownCloud by setting a password: ';
		$nextString = 'Then view it';
		$posKnownString = strpos((string)$emailBody, $knownString);
		$posNextString = strpos((string)$emailBody, $nextString, $posKnownString + strlen($knownString));
		$urlResetPasswd = substr((string)$emailBody,
			$posKnownString + strlen($knownString),
			$posNextString - ($posKnownString + strlen($knownString)));
		$urlResetPasswd = preg_replace('/[\s]+/mu', ' ', $urlResetPasswd);
		$urlResetPasswd = str_replace('=', '', $urlResetPasswd);
		return str_replace(' ', '', $urlResetPasswd);
	}

	/*Function to prepare the set password url from the reset password form one*/
	public function getSetPasswordUrl($urlResetPasswd): string {
		$resetUrlParts = explode('/', (string)$urlResetPasswd);
		array_splice($resetUrlParts, 5, 2, 'set');
		return implode('/', $resetUrlParts);
	}

	/**
	 * @Given guest user :user sets its password
	 */
	public function guestUserSetsItsPassword(string $guestDisplayName): void {
		$this->prepareUserNameAsFrontend($guestDisplayName, $this->createdGuests[$guestDisplayName]);
		$emails = $this->getEmails();
		$lastEmailBody = $emails->items[0]->Content->Body;
		$resetPwUrl = $this->extractResetPasswordUrl($lastEmailBody);
		$urlSetPasswd = $this->getSetPasswordUrl($resetPwUrl);

		$client = new Client();
		$options['body'] = [
			'password' => $this->regularUser,
			'proceed' => 'false'
		];
		try {
			$this->response = $client->send($client->createRequest('POST', $urlSetPasswd, $options));
		} catch (ClientException $ex) {
			$this->response = $ex->getResponse();
		}
	}

	/**
	 * @BeforeScenario
	 * @AfterScenario
	 */
	public function cleanupGuests(): void {
		foreach ($this->createdGuests as $displayName => $email) {
			$this->deleteGuestUser($displayName);
		}
	}
}
