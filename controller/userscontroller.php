<?php

namespace OCA\Guests\Controller;


use OC\AppFramework\Http;

use OCA\Guests\Backend;
use OCA\Guests\Mail;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\IGroupManager;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUserManager;
use OCP\Mail\IMailer;
use OCP\Security\ISecureRandom;
use Punic\Data;

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
	 *
	 * @param $username
	 * @param $password
	 * @param $email
	 * @return DataResponse
	 */
	public function create($username, $password, $email) {

		if (empty($email) && !$this->mailer->validateMailAddress($email)) {
			return new DataResponse(
				[
					'message' => (string)$this->l10n->t('Invalid mail address')
				],
				Http::STATUS_UNPROCESSABLE_ENTITY
			);
		}


		if ($this->userManager->userExists($username)) {
			return new DataResponse(
				[
					'message' => (string)$this->l10n->t(
						'A user with that name already exists.'
					)
				],
				Http::STATUS_CONFLICT
			);
		}

		$guestGroupName = $this->config->getAppValue(
			'guests',
			'group',
			'guests'
		);

		$readOnlyGroups = json_decode(
			$this->config->getAppValue('core', 'read_only_groups', []),
			true
		);


		if (!$this->groupManager->groupExists($guestGroupName)) {
			$this->groupManager->createGroup($guestGroupName);
		}

		if (!in_array($guestGroupName, $readOnlyGroups)) {
			$readOnlyGroups[] = $guestGroupName;
			$this->config->setAppValue(
				'core', 'read_only_groups', json_encode($readOnlyGroups)
			);
		}

		$user = $this->userManager->createUser($username, $password);
		$user->setEMailAddress($email);

		$guestGroup = $this->groupManager->get($guestGroupName);
		$guestGroup->addUser($user);


		$token = $this->secureRandom->getMediumStrengthGenerator()->generate(
			21,
			ISecureRandom::CHAR_DIGITS .
			ISecureRandom::CHAR_LOWER .
			ISecureRandom::CHAR_UPPER);

		$token = sprintf('%s:%s', time(), $token);

		$this->config->setUserValue(
			$user->getUID(),
			'owncloud',
			'lostpassword',
			$token
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