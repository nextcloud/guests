<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2018 Robin Appelman <robin@icewind.nl>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
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

	protected function execute(InputInterface $input, OutputInterface $output): void {
		$guests = $this->guestManager->getGuestsInfo();

		$outputType = $input->getOption('output');
		if (count($guests) === 0) {
			if ($outputType === self::OUTPUT_FORMAT_JSON || $outputType === self::OUTPUT_FORMAT_JSON_PRETTY) {
				$output->writeln('[]');
			} else {
				$output->writeln("<info>No guests created</info>");
			}
			return;
		}

		if ($outputType === self::OUTPUT_FORMAT_JSON || $outputType === self::OUTPUT_FORMAT_JSON_PRETTY) {
			$this->writeArrayInOutputFormat($input, $output, $guests);
		} else {
			$table = new Table($output);
			$table->setHeaders(['Email', 'Name', 'Invited By']);
			$table->setRows($guests);
			$table->render();
		}
	}
}
