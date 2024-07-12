<?php

namespace OCA\Guests\Controller;

use OC\Hooks\PublicEmitter;
use OCA\Guests\Config;
use OCA\Guests\GuestManager;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCS\OCSException;
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\AppFramework\OCSController;
use OCP\Group\ISubAdmin;
use OCP\IGroupManager;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Mail\IMailer;
use Psr\Log\LoggerInterface;

class UsersController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private IUserManager $userManager,
		private IL10N $l10n,
		private Config $config,
		private IMailer $mailer,
		private GuestManager $guestManager,
		private IUserSession $userSession,
		private ISubAdmin $subAdmin,
		private IGroupManager $groupManager,
		private LoggerInterface $logger,
	) {
		parent::__construct($appName, $request);
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
			$errorMessages['email'] = $this->l10n->t(
				'Invalid mail address'
			);
		}

		$username = $email;

		$existingUsers = $this->userManager->getByEmail($email);
		if (count($existingUsers) > 0) {
			$errorMessages['email'] = $this->l10n->t(
				'A user with that email already exists.'
			);
		} elseif ($this->userManager->userExists($username)) {
			$errorMessages['username'] = $this->l10n->t(
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
				'message' => $this->l10n->t(
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

	public function transfer(string $guestUserId, string $targetUserId, string $password): DataResponse {
		$user = $this->userManager->get($guestUserId);
		if (!($user instanceof IUser)) {
			throw new OCSNotFoundException();
		}

		if (!$this->guestManager->isGuest($user)) {
			return new DataResponse([], Http::STATUS_CONFLICT);
		}

		if ($this->userManager->userExists($targetUserId)) {
			throw new OCSException($this->l10n->t('User already exists'), 102);
		}

		$newUser = $this->userManager->createUser(
			$targetUserId,
			$password,
		);

		if (!($newUser instanceof IUser)) {
			throw new OCSException($this->l10n->t('Failed to create new user'));
		}

		$newUser->setSystemEMailAddress($guestUserId);

		try {
			$this->guestManager->transfer($user, $newUser);
			$result = $user->delete();
			if (!$result) {
				$this->logger->error('Failed to delete user', [ 'userId' => $user->getUID() ]);
			}
		} catch (\Throwable $th) {
			$this->logger->error('Failed to transfer guest', [ 'error' => $th ]);
			$result = $newUser->delete(); // Rollback created user
			if (!$result) {
				$this->logger->error('Failed to delete user', [ 'userId' => $newUser->getUID() ]);
			}
			throw new OCSException($this->l10n->t('Failed to transfer guest'));
		}
		return new DataResponse([], Http::STATUS_CREATED);
	}
}
