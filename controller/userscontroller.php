<?php

namespace OCA\Guests\Controller;


use OC\AppFramework\Http;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUserManager;
use OCP\Mail\IMailer;
use OCP\Security\ISecureRandom;

class UsersController extends Controller {
	/**
	 * @var IRequest
	 */
	protected $request;
	/**
	 * @var IUserManager
	 */
	private $userManager;
	/**
	 * @var IL10N
	 */
	private $l10n;
	/**
	 * @var IConfig
	 */
	private $config;
	/**
	 * @var IMailer
	 */
	private $mailer;
	/**
	 * @var IGroupManager
	 */
	private $groupManager;
	/**
	 * @var ISecureRandom
	 */
	private $secureRandom;


	/**
	 * UsersController constructor.
	 *
	 * @param string $appName
	 * @param IRequest $request
	 * @param IUserManager $userManager
	 * @param IGroupManager $groupManager
	 * @param IL10N $l10n
	 * @param IConfig $config
	 * @param IMailer $mailer
	 * @param ISecureRandom $secureRandom
	 */
	public function __construct($appName,
								IRequest $request,
								IUserManager $userManager,
								IGroupManager $groupManager,
								IL10N $l10n,
								IConfig $config,
								IMailer $mailer,
								ISecureRandom $secureRandom
	) {
		parent::__construct($appName, $request);

		$this->request = $request;
		$this->userManager = $userManager;
		$this->l10n = $l10n;
		$this->config = $config;
		$this->mailer = $mailer;
		$this->groupManager = $groupManager;
		$this->secureRandom = $secureRandom;
	}

	/**
	 *
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 *
	 * @param $username
	 * @param $email
	 * @param $displayName
	 * @return DataResponse
	 */
	public function create($username, $email, $displayName) {
		$errorMessages = [];

		if (empty($email) || !$this->mailer->validateMailAddress($email)) {
			$errorMessages['email'] = (string)$this->l10n->t(
				'Invalid mail address'
			);
		}

		if (empty($username)) {
			$errorMessages['username'] = (string)$this->l10n->t(
				'Username required'
			);
		}


		if ($this->userManager->userExists($username)) {
			$errorMessages['username'] = (string)$this->l10n->t(
				'A user with that name already exists.'
			);
		}

		if (!empty($errorMessages)) {
			return new DataResponse(
				[
					'errorMessages' => $errorMessages
				],
				Http::STATUS_UNPROCESSABLE_ENTITY
			);
		}


		$user = $this->userManager->createUser(
			$username,
			$this->secureRandom->generate(20)
		);

		$user->setEMailAddress($email);

		if (!empty($displayName)) {
			$user->setDisplayName($displayName);
		}

		$token = $this->secureRandom->getMediumStrengthGenerator()->generate(
			21,
			ISecureRandom::CHAR_DIGITS .
			ISecureRandom::CHAR_LOWER .
			ISecureRandom::CHAR_UPPER);

		$token = sprintf('%s:%s', time(), $token);

		$userId = $user->getUID();

		$this->config->setUserValue(
			$user->getUID(),
			'owncloud',
			'lostpassword',
			$token
		);


		$this->config->setUserValue(
			$userId,
			'owncloud',
			'isGuest',
			'1'
		);


		return new DataResponse(
			[
				'message' => (string)$this->l10n->t(
					'User successfully created'
				)
			],
			Http::STATUS_CREATED
		);
	}

}