/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, test } from '../support/fixtures.ts'

test('Admin Guests settings page renders without errors', async ({ adminPage }) => {
	// Capture only uncaught page errors. NC pages emit unrelated console.error
	// noise (user-status 404s, etc.) we don't want to gate on.
	const pageErrors: string[] = []
	adminPage.on('pageerror', (error) => pageErrors.push(error.message))

	await adminPage.goto('/settings/admin/guests')

	await expect(adminPage.getByRole('heading', { name: 'Guests', exact: true })).toBeVisible()
	await expect(adminPage.getByRole('checkbox', { name: /external storage/i })).toBeVisible()

	expect(pageErrors, `uncaught page errors: ${pageErrors.join(' | ')}`).toEqual([])
})
