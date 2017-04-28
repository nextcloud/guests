<?php
/**
 * @author Ilja Neumann <ineumann@owncloud.com>
 *
 * @copyright Copyright (c) 2017, ownCloud GmbH
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 */

namespace OCA\Guests\Settings;

use OCP\AppFramework\Http\TemplateResponse;

class Admin implements \OCP\Settings\ISettings
{
	/**
	 * {@inheritdoc}
	 */
	public function getForm() {
		return new TemplateResponse('guests', 'settings/admin');
	}

	/**
	 * {@inheritdoc}
	 */
	public function getSection() {
		return 'guests';
	}

	/**
	 * {@inheritdoc}
	 */
	public function getPriority() {
		return 0;
}}