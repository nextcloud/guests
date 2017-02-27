<?php


namespace OCA\Guests\Controller;


use OC\AppFramework\Http;

use OC\User\User;
use OCA\Guests\Backend;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\IGroupManager;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUserManager;
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
	 * @var IDBConnection
	 */
	private $dbConnection;


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
	 * @param IDBConnection $dbConnection
	 */
	public function __construct($appName,
								IRequest $request,
								IUserManager $userManager,
								IGroupManager $groupManager,
								IL10N $l10n,
								IConfig $config,
								IMailer $mailer,
								IDBConnection $dbConnection
	) {
		parent::__construct($appName, $request);

		$this->request = $request;
		$this->userManager = $userManager;
		$this->l10n = $l10n;
		$this->config = $config;
		$this->mailer = $mailer;
		$this->groupManager = $groupManager;
		$this->dbConnection = $dbConnection;
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

		/** @var Backend $backend */
		$backend = null;
		foreach ($this->userManager->getBackends() as $be) {
			if ($be instanceof Backend) {
				$backend = $be;
				break;
			}
		}



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

		$guestGroup = $this->config->getAppValue(
			'guests',
			'group',
			null
		);


		if (!$this->groupManager->groupExists($guestGroup)) {
			$group = $this->groupManager->createGroup($guestGroup);
		}



		$backend->createGuest($username, $email);
		#$user = $this->userManager->createUser($username, $password);
		#$user->setEMailAddress($email);

		$readOnlyGroups = json_decode(
			$this->config->getAppValue('core', 'read_only_groups', [])
		);

		$group = $this->groupManager->get($readOnlyGroups[0]);
		$group->addUser(new User($username, $backend));

		return new DataResponse(
			[
				'message' => (string)$this->l10n->t(
					'User sucessfully created'
				)
			],
			Http::STATUS_CREATED
		);

	}

}