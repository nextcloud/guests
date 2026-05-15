/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare global {
	interface Window {
		OCA: {
			Guests?: {
				openGuestDialog?: (app: string, shareWith?: string) => void
			}
		}
	}
}

export {}
