<?php

namespace OCA\Guests\Controller;


use OC\AppFramework\Http;
use OCA\Guests\GuestManager;
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
	 * @var IMailer
	 */
	private $mailer;
	/**
	 * @var GuestManager
	 */
	private $guestManager;


	/**
	 * UsersController constructor.
	 *
	 * @param string $appName
	 * @param IRequest $request
	 * @param IUserManager $userManager
	 * @param IL10N $l10n
	 * @param IConfig $config
	 * @param IMailer $mailer
	 */
	public function __construct($appName,
								IRequest $request,
								IUserManager $userManager,
								IL10N $l10n,
								IConfig $config,
								IMailer $mailer,
								GuestManager $guestManager
	) {
		parent::__construct($appName, $request);

		$this->request = $request;
		$this->userManager = $userManager;
		$this->l10n = $l10n;
		$this->mailer = $mailer;
		$this->guestManager = $guestManager;
	}

	/**
	 *
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 *
	 * @param $email
	 * @param $displayName
	 * @return DataResponse
	 */
	public function create($email, $displayName) {
		$errorMessages = [];

		if (empty($email) || !$this->mailer->validateMailAddress($email)) {
			$errorMessages['email'] = (string)$this->l10n->t(
				'Invalid mail address'
			);
		}

		$username = 'guest ' . $email;

		$existingUsers = $this->userManager->getByEmail($email);
		if (count($existingUsers) > 0) {
			$errorMessages['email'] = (string)$this->l10n->t(
				'A user with that email already exists.'
			);
		} else if ($this->userManager->userExists($username)) {
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

		try {
			$this->guestManager->createGuest($username, $email, $displayName);
		} catch (\Exception $e) {
			return new DataResponse(
				[
					'errorMessages' => ['email' => $e->getMessage()]
				],
				Http::STATUS_UNPROCESSABLE_ENTITY
			);
		}

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
