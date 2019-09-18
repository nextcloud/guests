<?php

namespace OCA\Guests\Controller;


use OC\AppFramework\Http;
use OC\Hooks\PublicEmitter;
use OCA\Guests\GuestManager;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IConfig;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Mail\IMailer;

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
	/** @var IUserSession */
	private $userSession;

	public function __construct(
		$appName,
		IRequest $request,
		IUserManager $userManager,
		IL10N $l10n,
		IConfig $config,
		IMailer $mailer,
		GuestManager $guestManager,
		IUserSession $userSession
	) {
		parent::__construct($appName, $request);

		$this->request = $request;
		$this->userManager = $userManager;
		$this->l10n = $l10n;
		$this->mailer = $mailer;
		$this->guestManager = $guestManager;
		$this->userSession = $userSession;
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param $email
	 * @param $displayName
	 * @param $language
	 * @return DataResponse
	 */
	public function create($email, $displayName, $language) {
		$errorMessages = [];

		if ($this->guestManager->isGuest($this->userSession->getUser())) {
			return new DataResponse(
				[
					'errorMessages' => ['Guests are not allowed to create guests']
				],
				Http::STATUS_FORBIDDEN
			);
		}

		if (empty($email) || !$this->mailer->validateMailAddress($email)) {
			$errorMessages['email'] = (string)$this->l10n->t(
				'Invalid mail address'
			);
		}

		$username = $email;

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
			$this->guestManager->createGuest($this->userSession->getUser(), $username, $email, $displayName, $language);
			if($this->userManager instanceof PublicEmitter) {
				$this->userManager->emit('\OC\User', 'assignedUserId', [$username]);
			}
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

	public function list() {
		$guests = $this->guestManager->getGuestsInfo();

		return new DataResponse($guests);
	}

	public function get(string $userId) {
		$guests = $this->guestManager->getGuestInfo($userId);

		return new DataResponse($guests);
	}
}
