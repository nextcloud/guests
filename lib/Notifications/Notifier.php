<?php

declare(strict_types=1);

/**
 * @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
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
 */

namespace OCA\Guests\Notifications;

use InvalidArgumentException;
use OCA\Guests\AppInfo\Application;
use OCP\IURLGenerator;
use OCP\L10N\IFactory;
use OCP\Notification\INotification;
use OCP\Notification\INotifier;

class Notifier implements INotifier {

	/** @var IFactory */
	private $factory;

	/** @var IURLGenerator */
	private $url;

	public function __construct(IFactory $factory,
								IURLGenerator $url) {
		$this->factory = $factory;
		$this->url = $url;
	}

	public function getID(): string {
		return Application::APP_ID;
	}

	public function getName(): string {
		return $this->factory->get(Application::APP_ID)->t('Guests');
	}

	public function prepare(INotification $notification, string $languageCode): INotification {
		if ($notification->getApp() !== Application::APP_ID) {
			// Not my app => throw
			throw new InvalidArgumentException();
		}

		// Read the language from the notification
		$l = $this->factory->get(Application::APP_ID, $languageCode);
		switch ($notification->getSubject()) {
			case 'data_migrated_to_system_user':
				$notification->setParsedSubject(
					$l->t('Data imported')
				)->setParsedMessage(
					$l->t('Data from your previous guest account was successfully imported into your new account.')
				);

				$notification->setIcon($this->url->getAbsoluteURL($this->url->imagePath('core', 'actions/info.svg')));

				return $notification;

			default:
				// Unknown subject => Unknown notification => throw
				throw new InvalidArgumentException();
		}
	}
}
