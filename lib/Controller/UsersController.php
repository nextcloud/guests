<?php

namespace OCA\Guests\Controller;

use OC\AppFramework\Http;
use OC\Hooks\PublicEmitter;
use OCA\Guests\Config;
use OCA\Guests\GuestManager;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\Group\ISubAdmin;
use OCP\IGroupManager;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Mail\IMailer;

class UsersController extends OCSController {
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
	/** @var Config */
	private $config;
	/** @var ISubAdmin */
	private $subAdmin;
	/** @var IGroupManager */
	private $groupManager;

	public function __construct(
		string $appName,
		IRequest $request,
		IUserManager $userManager,
		IL10N $l10n,
		Config $config,
		IMailer $mailer,
		GuestManager $guestManager,
		IUserSession $userSession,
		ISubAdmin $subAdmin,
		IGroupManager $groupManager
	) {
		parent::__construct($appName, $request);

		$this->request = $request;
		$this->userManager = $userManager;
		$this->l10n = $l10n;
		$this->mailer = $mailer;
		$this->guestManager = $guestManager;
		$this->userSession = $userSession;
		$this->config = $config;
		$this->subAdmin = $subAdmin;
		$this->groupManager = $groupManager;
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $email
	 * @param string $displayName
	 * @param string $language
	 * @param array $groups
	 * @return DataResponse
	 */
	public function create(string $email, string $displayName, string $language, array $groups): DataResponse {
		$errorMessages = [];
		$currentUser = $this->userSession->getUser();

		if ($this->guestManager->isGuest($currentUser)) {
			return new DataResponse(
				[
					'errorMessages' => ['Guests are not allowed to create guests'],
				],
				Http::STATUS_FORBIDDEN
			);
		}
		if (!$this->config->canCreateGuests()) {
			return new DataResponse(
				[
					'errorMessages' => ['This user is not allowed to create guests'],
				],
				Http::STATUS_FORBIDDEN
			);
		}

		if ($this->config->isSharingRestrictedToGroup() && count($groups) < 1) {
			return new DataResponse(
				[
					'errorMessages' => ['Guest user must be added to at least one group'],
				],
				Http::STATUS_FORBIDDEN
			);
		}

		$groupObjects = [];
		foreach ($groups as $groupId) {
			$group = $this->groupManager->get($groupId);
			if (!$group) {
				return new DataResponse(
					[
						'errorMessages' => ["Group $groupId not found"],
					],
					Http::STATUS_BAD_REQUEST
				);
			}
			if (!($this->subAdmin->isSubAdminOfGroup($currentUser, $group) || $this->groupManager->isAdmin($currentUser->getUID()))) {
				return new DataResponse(
					[
						'errorMessages' => ["This user is not allowed to add users to group $groupId"],
					],
					Http::STATUS_FORBIDDEN
				);
			}
			$groupObjects[] = $group;
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
		} elseif ($this->userManager->userExists($username)) {
			$errorMessages['username'] = (string)$this->l10n->t(
				'A user with that name already exists.'
			);
		}

		if (!empty($errorMessages)) {
			return new DataResponse(
				[
					'errorMessages' => $errorMessages,
				],
				Http::STATUS_UNPROCESSABLE_ENTITY
			);
		}

		try {
			$this->guestManager->createGuest($this->userSession->getUser(), $username, $email, $displayName, $language);
			$guestUser = $this->userManager->get($username);
			if ($this->userManager instanceof PublicEmitter) {
				$this->userManager->emit('\OC\User', 'assignedUserId', [$username]);
			}
			foreach ($groupObjects as $group) {
				$group->addUser($guestUser);
			}
		} catch (\Exception $e) {
			return new DataResponse(
				[
					'errorMessages' => ['email' => $e->getMessage()],
				],
				Http::STATUS_UNPROCESSABLE_ENTITY
			);
		}

		return new DataResponse(
			[
				'message' => (string)$this->l10n->t(
					'User successfully created'
				),
			],
			Http::STATUS_CREATED
		);
	}

	public function list(): DataResponse {
		$guests = $this->guestManager->getGuestsInfo();

		return new DataResponse($guests);
	}

	public function get(string $userId): DataResponse {
		$guests = $this->guestManager->getGuestInfo($userId);

		return new DataResponse($guests);
	}
}
