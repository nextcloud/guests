<?php
/**
 * @author Jörn Friedrich Dreyer <jfd@butonic.de>
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
print_unescaped($l->t("Hey there,\n\njust letting you know that %s shared %s with you.\n\nActivate your guest account at %s by setting a password: %s\n\nThen view it: %s\n\nYou can login using the email address "%s".\n\n", array($_['user_displayname'], $_['filename'], $_['cloud_name'], $_['password_link'],  $_['link'], $_['guestEmail'])));
if ( isset($_['expiration']) ) {
	print_unescaped($l->t("The share will expire on %s.", array($_['expiration'])));
	print_unescaped("\n\n");
}
// TRANSLATORS term at the end of a mail
p($l->t("Cheers!"));
?>

--
<?php p($theme->getName() . ' - ' . $theme->getSlogan()); ?>
<?php print_unescaped("\n".$theme->getBaseUrl());
