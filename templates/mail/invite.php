<?php
/**
 * @author Jörn Friedrich Dreyer <jfd@butonic.de>
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
?>
<table cellspacing="0" cellpadding="0" border="0" width="100%">
<tr><td>
<table cellspacing="0" cellpadding="0" border="0" width="600px">
<tr>
<td bgcolor="<?php p($theme->getMailHeaderColor());?>" width="20px">&nbsp;</td>
<td bgcolor="<?php p($theme->getMailHeaderColor());?>">
<img src="<?php p(\OC::$server->getURLGenerator()->getAbsoluteURL(image_path('', 'logo-mail.gif'))); ?>" alt="<?php p($theme->getName()); ?>"/>
</td>
</tr>
<tr><td colspan="2">&nbsp;</td></tr>
<tr>
<td width="20px">&nbsp;</td>
<td style="font-weight:normal; font-size:0.8em; line-height:1.2em; font-family:verdana,'arial',sans;">
<?php
print_unescaped($l->t(
		'Hey there,<br><br>
         
         just letting you know that %s shared <strong>%s</strong> with you.<br><br>
         Activate your guest account at %s by <a href="%s">setting a password</a>.<br><br>
         Then <a href="%s">view it!</a><br><br>You can login using the email address <strong>"%s"</strong> .<br><br>',
		[$_['user_displayname'], $_['filename'], $_['cloud_name'], $_['password_link'], $_['link'], $_['guestEmail']]
));

if ( isset($_['expiration']) ) {
	p($l->t("The share will expire on %s.", array($_['expiration'])));
	print_unescaped('<br><br>');
}
// TRANSLATORS term at the end of a mail
p($l->t('Cheers!'));
?>
</td>
</tr>
<tr><td colspan="2">&nbsp;</td></tr>
<tr>
	<td width="20px">&nbsp;</td>
	<td style="font-weight:normal; font-size:0.8em; line-height:1.2em; font-family:verdana,'arial',sans;">--<br>
		<?php p($theme->getName()); ?> -
		<?php p($theme->getSlogan()); ?>
		<br><a href="<?php p($theme->getBaseUrl()); ?>"><?php p($theme->getBaseUrl());?></a>
	</td>
</tr>
<tr>
	<td colspan="2">&nbsp;</td>
</tr>
</table>
</td></tr>
</table>
