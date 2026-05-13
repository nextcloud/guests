/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, test, uniqueSuffix } from '../support/fixtures.ts'

test('Invite Guest dialog submits and creates the account', async ({
	adminPage,
	createdUsers,
}) => {
	const email = `playwright-guest-${uniqueSuffix()}@example.com`
	createdUsers.push(email)

	// Load Files so the guests bundle (init.ts) registers OCA.Guests.openGuestDialog.
	await adminPage.goto('/apps/files', { waitUntil: 'domcontentloaded' })
	await adminPage.waitForFunction(
		() => Boolean(window.OCA?.Guests?.openGuestDialog),
		undefined,
		{ timeout: 15_000 },
	)

	// Open the dialog directly, skipping the NC-version-dependent share-search hook.
	await adminPage.evaluate((shareWith) => {
		window.OCA.Guests!.openGuestDialog!('files', shareWith)
	}, email)

	// Title mutates from "Invite Guest" to "Invite <name|email>" as the form fills.
	const dialog = adminPage.getByRole('dialog', { name: /^invite /i })
	await expect(dialog).toBeVisible({ timeout: 10_000 })

	await dialog.getByLabel(/guest name|name/i).first().fill('Playwright Guest')

	// The submit button must actually submit the form; the v4.7.0 nativeType="submit"
	// regression broke that silently.
	const responsePromise = adminPage.waitForResponse((r) => r.url().includes('/apps/guests/api/v1/users') && r.request().method() === 'PUT')
	await dialog.getByRole('button', { name: /invite (guest|user)/i }).click()
	const response = await responsePromise
	expect(response.status(), 'guest creation API status').toBeLessThan(400)

	// The "files" integration path resolves a share template instead of showing
	// a success toast, so the API response above is the real success signal.
	// Modal closing confirms the flow completed without throwing.
	await expect(dialog).toBeHidden({ timeout: 10_000 })
})
