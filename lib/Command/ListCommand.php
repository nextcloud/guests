<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Command;

use OC\Core\Command\Base;
use OCA\Guests\GuestManager;
use Symfony\Component\Console\Helper\Table;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ListCommand extends Base {
	private $guestManager;

	public function __construct(GuestManager $guestManager) {
		parent::__construct();
		$this->guestManager = $guestManager;
	}

	protected function configure(): void {
		$this
			->setName('guests:list')
			->setDescription('List created guests');
		parent::configure();
	}

	protected function execute(InputInterface $input, OutputInterface $output): int {
		$guests = $this->guestManager->getGuestsInfo();

		$outputType = $input->getOption('output');
		if (count($guests) === 0) {
			if ($outputType === self::OUTPUT_FORMAT_JSON || $outputType === self::OUTPUT_FORMAT_JSON_PRETTY) {
				$output->writeln('[]');
			} else {
				$output->writeln('<info>No guests created</info>');
			}
			return 0;
		}

		if ($outputType === self::OUTPUT_FORMAT_JSON || $outputType === self::OUTPUT_FORMAT_JSON_PRETTY) {
			$this->writeArrayInOutputFormat($input, $output, $guests);
		} else {
			$table = new Table($output);
			$table->setHeaders(['Email', 'Name', 'Invited By']);
			$table->setRows($guests);
			$table->render();
		}
		return 0;
	}
}
