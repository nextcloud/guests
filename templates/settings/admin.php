<?php
/**
 * ownCloud
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING-AGPL file.
 *
 * @author Jörn Friedrich Dreyer <jfd@butonic.de>
 * @copyright Jörn Friedrich Dreyer 2015
 */

/** @var $l OC_L10N */
/** @var $_ array */
?>
<div class="section" id="guests">
	<h2>Guests</h2>
	<div>
		<span class="inlineblock user-info-label"><?php p($l->t('Treat users as Guests when:'));?></span><br/><br/>
		<input type="checkbox" id="guestsByQuota" value="quota"/><label for="guestsByQuota"><?php p($l->t('their quota is 0'));?></label><br/>
		<input type="checkbox" id="guestsByGroup" value="group"/><label for="guestsByGroup"><?php p($l->t('they are a member of group'));?></label>
			<input type="text" id="guestGroup" value="" /><br/>
		<input type="checkbox" id="guestsByContact" value="contact"/><label for="guestsByContact"><?php p($l->t('they are a contact of a regular user'));?></label><br/>
		<br/>
		<input type="checkbox" id="guestUseWhitelist" value="useWhitelist"/><label for="guestUseWhitelist"><?php p($l->t('Limit guest access to an app whitelist'));?></label><br/>
		<input type="text" id="guestWhitelist" value="" style="display:none; width:99%;"/><br/>
		<button type="button" id="guestResetWhitelist"><?php p($l->t('Reset whitelist'));?></button><span class="msg"></span>
	</div>
</div>
