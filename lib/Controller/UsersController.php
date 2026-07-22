<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Controller;

use OC\Hooks\PublicEmitter;
use OCA\Guests\Config;
use OCA\Guests\Db\Transfer;
use OCA\Guests\Db\TransferMapper;
use OCA\Guests\GuestManager;
use OCA\Guests\Service\ConversionService;
use OCA\Guests\Service\InviteService;
use OCA\Guests\TransferService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
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
		private readonly IUserManager $userManager,
		private readonly IL10N $l10n,
		private readonly Config $config,
		private readonly IMailer $mailer,
		private readonly GuestManager $guestManager,
		private readonly IUserSession $userSession,
		private readonly ISubAdmin $subAdmin,
		private readonly IGroupManager $groupManager,
		private readonly TransferService $transferService,
		private readonly TransferMapper $transferMapper,
		private readonly InviteService $inviteService,
		private readonly ConversionService $conversionService,
		private readonly LoggerInterface $logger,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	public function create(string $email, string $displayName, string $language, array $groups, bool $sendInvite = true): DataResponse {
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
					'errorMessages' => ['You are not allowed to create guests'],
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
						'errorMessages' => ['Group ' . $groupId . ' not found'],
					],
					Http::STATUS_BAD_REQUEST
				);
			}

			if (!$this->subAdmin->isSubAdminOfGroup($currentUser, $group) && !$this->groupManager->isAdmin($currentUser->getUID())) {
				return new DataResponse(
					[
						'errorMessages' => ['You are not allowed to add users to group ' . $groupId],
					],
					Http::STATUS_FORBIDDEN
				);
			}

			$groupObjects[] = $group;
		}

		if ($email === '' || !$this->mailer->validateMailAddress($email)) {
			$errorMessages['email'] = $this->l10n->t(
				'Invalid mail address'
			);
		}

		if ($this->config->useHashedEmailAsUserID()) {
			$email = strtolower($email);
			$username = hash('sha256', $email);
		} else {
			$username = $email;
		}

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

		if ($errorMessages !== []) {
			return new DataResponse(
				[
					'errorMessages' => $errorMessages,
				],
				Http::STATUS_UNPROCESSABLE_ENTITY
			);
		}

		try {
			$guestUser = $this->guestManager->createGuest($this->userSession->getUser(), $username, $email, $displayName, $language);
			if (!$guestUser instanceof IUser) {
				return new DataResponse(
					[
						'errorMessages' => ['email' => 'Unable to create guest user ' . $username],
					],
					Http::STATUS_UNPROCESSABLE_ENTITY
				);
			}
			if ($this->userManager instanceof PublicEmitter) {
				$this->userManager->emit('\OC\User', 'assignedUserId', [$username]);
			}

			foreach ($groupObjects as $group) {
				$group->addUser($guestUser);
			}
		} catch (\Exception $exception) {
			return new DataResponse(
				[
					'errorMessages' => ['email' => $exception->getMessage()],
				],
				Http::STATUS_UNPROCESSABLE_ENTITY
			);
		}

		if ($sendInvite) {
			$this->inviteService->sendInvite($currentUser->getUID(), $username);
		}

		return new DataResponse(
			[
				'message' => $this->l10n->t(
					'User successfully created'
				),
				'username' => $username,
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

	/**
	 * Transfer guest to a full account
	 */
	public function transfer(string $guestUserId, string $targetUserId): DataResponse {
		$author = $this->userSession->getUser();
		if (!($author instanceof IUser)) {
			return new DataResponse([
				'message' => $this->l10n->t('Failed to authorize')
			], Http::STATUS_UNAUTHORIZED);
		}

		$sourceUser = $this->userManager->get($guestUserId);
		if (!($sourceUser instanceof IUser)) {
			return new DataResponse([
				'message' => $this->l10n->t('Guest does not exist')
			], Http::STATUS_NOT_FOUND);
		}

		if ($this->userManager->userExists($targetUserId)) {
			return new DataResponse([
				'message' => $this->l10n->t('User already exists')
			], Http::STATUS_CONFLICT);
		}

		if (!$this->guestManager->isGuest($sourceUser)) {
			return new DataResponse([
				'message' => $this->l10n->t('User is not a guest'),
			], Http::STATUS_CONFLICT);
		}

		try {
			$transfer = $this->transferMapper->getBySource($sourceUser->getUID());
		} catch (DoesNotExistException) {
			// Allow as this just means there is no pending transfer
		}

		try {
			$transfer = $this->transferMapper->getByTarget($targetUserId);
		} catch (DoesNotExistException) {
			// Allow as this just means there is no pending transfer
		}

		if (!empty($transfer)) {
			return new DataResponse([
				'status' => $transfer->getStatus(),
				'source' => $transfer->getSource(),
				'target' => $transfer->getTarget(),
			], Http::STATUS_ACCEPTED);
		}

		$this->transferService->addTransferJob($author, $sourceUser, $targetUserId);

		return new DataResponse([], Http::STATUS_CREATED);
	}

	/**
	 * Convert a regular, never-logged-in account into a guest account
	 */
	public function convert(string $userId): DataResponse {
		$author = $this->userSession->getUser();
		if (!($author instanceof IUser)) {
			return new DataResponse([
				'message' => $this->l10n->t('Failed to authorize')
			], Http::STATUS_UNAUTHORIZED);
		}

		$user = $this->userManager->get($userId);
		if (!($user instanceof IUser)) {
			return new DataResponse([
				'message' => $this->l10n->t('Account not found')
			], Http::STATUS_NOT_FOUND);
		}

		if ($this->guestManager->isGuest($user)) {
			return new DataResponse([
				'message' => $this->l10n->t('Account is already a guest')
			], Http::STATUS_CONFLICT);
		}

		if ($user->getBackendClassName() !== 'Database') {
			return new DataResponse([
				'message' => $this->l10n->t('Only regular accounts can be converted to guests')
			], Http::STATUS_CONFLICT);
		}

		if ($user->getLastLogin() !== 0) {
			return new DataResponse([
				'message' => $this->l10n->t('Only accounts that have never logged in can be converted')
			], Http::STATUS_CONFLICT);
		}

		if ($this->groupManager->isAdmin($userId) || $this->subAdmin->isSubAdmin($user)) {
			return new DataResponse([
				'message' => $this->l10n->t('Accounts with administrative privileges cannot be converted to guests')
			], Http::STATUS_CONFLICT);
		}

		try {
			$this->conversionService->convertToGuest($user, $author);
			$this->guestManager->setGuestQuota($user);
		} catch (\Throwable $e) {
			$this->logger->error('Failed to convert account "' . $userId . '" to a guest', ['exception' => $e]);
			return new DataResponse([
				'message' => $this->l10n->t('An error occurred while converting the account')
			], Http::STATUS_INTERNAL_SERVER_ERROR);
		}

		return new DataResponse([]);
	}
}
