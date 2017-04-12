<?php
/**
 * @author Jörn Friedrich Dreyer <jfd@butonic.de>
 * @author Ilja Neumann <ineumann@butonic.de>
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
script('guests', 'guests');
/** @var $l OC_L10N */
/** @var $_ array */
?>
<div class="section" id="guests">
	<h2>Guests</h2>
	<div>
		<span class="inlineblock user-info-label"><?php p($l->t('Guest users are grouped under a virtual group in the user manager'));?></span><br/><br/>
		<label for="guestGroup"><?php p($l->t('Group name'));?>
		</label><input type="text" id="guestGroup" value="" /><br/>
		<br/>
		<input type="checkbox" id="guestUseWhitelist" value="useWhitelist"/><label for="guestUseWhitelist"><?php p($l->t('Limit guest access to an app whitelist'));?></label><br/>
		<input type="text" id="guestWhitelist" value="" style="display:none; width:99%;"/><br/>
		<button type="button" id="guestResetWhitelist"><?php p($l->t('Reset whitelist'));?></button><span class="msg"></span>
	</div>
</div>
