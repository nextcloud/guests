<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Command;

use OCA\Guests\GuestManager;
use OCP\IUser;
use OCP\IUserManager;
use OCP\Mail\IMailer;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\QuestionHelper;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;

class AddCommand extends Command {
	/** @var IUserManager */
	private $userManager;
	/** @var GuestManager */
	private $guestManager;
	/** @var IMailer */
	private $mailer;

	public function __construct(IUserManager $userManager, IMailer $mailer, GuestManager $guestManager) {
		parent::__construct();
		$this->userManager = $userManager;
		$this->guestManager = $guestManager;
		$this->mailer = $mailer;
	}

	protected function configure() {
		$this
			->setName('guests:add')
			->setDescription('Add a new guest account')
			->addArgument(
				'created-by',
				InputArgument::REQUIRED,
				'User ID who is set as creator'
			)
			->addArgument(
				'email',
				InputArgument::REQUIRED,
				'Email address'
			)
			->addOption(
				'generate-password',
				null,
				InputOption::VALUE_NONE,
				'Do not set an initial password'
			)
			->addOption(
				'password-from-env',
				null,
				InputOption::VALUE_NONE,
				'Read password from environment variable OC_PASS'
			)
			->addOption(
				'display-name',
				null,
				InputOption::VALUE_OPTIONAL,
				'User name used in the web UI (can contain any characters)',
				''
			)
			->addOption(
				'language',
				null,
				InputOption::VALUE_OPTIONAL,
				'Language',
				''
			);
		parent::configure();
	}

	protected function execute(InputInterface $input, OutputInterface $output) {
		$creatorUser = $this->userManager->get($input->getArgument('created-by'));
		if ($creatorUser === null) {
			$output->writeln('<error>The user "' . $input->getArgument('created-by') . '" does not exist.</error>');
			return 1;
		}

		// same behavior like in the UsersController
		$uid = $input->getArgument('email');
		if ($this->userManager->userExists($uid)) {
			$output->writeln('<error>The user "' . $uid . '" already exists.</error>');
			return 1;
		}

		$email = $input->getArgument('email');
		if (!$this->mailer->validateMailAddress($email)) {
			$output->writeln('<error>Invalid email address "' . $email . '".</error>');
			return 1;
		}

		$password = null;
		if (!$input->getOption('generate-password')) {
			if ($input->getOption('password-from-env')) {
				$password = getenv('OC_PASS');
				if (!$password) {
					$output->writeln('<error>--password-from-env given, but OC_PASS is empty!</error>');
					return 1;
				}
			} elseif ($input->isInteractive()) {
				/** @var QuestionHelper $helper */
				$helper = $this->getHelper('question');

				$question = new Question('Enter password: ');
				$question->setHidden(true);
				$password = $helper->ask($input, $output, $question);

				$question = new Question('Confirm password: ');
				$question->setHidden(true);
				$confirm = $helper->ask($input, $output, $question);

				if ($password !== $confirm) {
					$output->writeln('<error>Passwords did not match!</error>');
					return 1;
				}
			} else {
				$output->writeln('<error>Interactive input or --password-from-env is needed for entering a password!</error>');
				return 1;
			}
		}

		$user = $this->guestManager->createGuest(
			$creatorUser,
			$uid,
			$email,
			$input->getOption('display-name') ?? '',
			$input->getOption('language') ?? '',
			$password
		);

		if ($user instanceof IUser) {
			$output->writeln('<info>The guest account user "' . $user->getUID() . '" was created successfully</info>');
			return 0;
		} else {
			$output->writeln('<error>An error occurred while creating the user</error>');
			return 1;
		}
	}
}
