/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import AccountPlusOutlineSvg from '@mdi/svg/svg/account-plus-outline.svg?raw'
import { t } from '@nextcloud/l10n'

window.addEventListener('DOMContentLoaded', () => {
	if (OC.ContactsMenu && OCA.Guests?.openGuestDialog) {
		OC.ContactsMenu.addAction({
			id: 'guests_addGuestAction',
			icon: AccountPlusOutlineSvg,
			label: t('guests', 'Add guest'),
			onClick: () => {
				OCA.Guests.openGuestDialog('core')
			},
		})
	}
})
