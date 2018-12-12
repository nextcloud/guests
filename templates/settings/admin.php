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
style('guests', 'admin');
/** @var $l OC_L10N */
/** @var $_ array */
?>
<div class="section" id="guests">
	<h2>Guests <span class="msg"></span></h2>
	<div>
		<p>
			<span class="inlineblock user-info-label"><?php p($l->t('Guest users are grouped under a virtual group in the user manager')); ?></span><br/><br/>
		</p>
		<p class="external-storage-toggle">
			<input type="checkbox" id="allowExternalStorage" class="checkbox"
				   value="allowExternalStorage"/>
			<label for="allowExternalStorage">
				<?php p($l->t('Guest users can access mounted external storages')); ?>
			</label>
		</p>
		<p class="whitelist-toggle">
			<input type="checkbox" id="guestUseWhitelist" class="checkbox"
				   value="useWhitelist"/>
			<label for="guestUseWhitelist">
				<?php p($l->t('Limit guest access to an app whitelist')); ?>
			</label>
		</p>
		<p class="whitelist" style="display: none">
			<select multiple="multiple" id="guestWhitelist">
				<?php foreach ($_['whitelistableApps'] as $app): ?>
					<option value="<?php p($app); ?>"><?php p($app); ?></option>
				<?php endforeach; ?>
			</select>
			<button title="<?php p($l->t('Reset')) ?>" type="button"
					class="icon-history icon"
					id="guestResetWhitelist"></button>
		</p>
	</div>
</div>
