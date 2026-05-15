/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { APIRequestContext, Page } from '@playwright/test'

import { login } from '@nextcloud/e2e-test-server/playwright'
import { test as base, expect, request } from '@playwright/test'

export const NEXTCLOUD_URL = 'http://localhost:8089'

const ADMIN = { userId: 'admin', password: 'admin', language: 'en' }

export const uniqueSuffix = () => Math.random().toString(36).slice(2, 8)

/**
 * APIRequestContext authenticated as admin with the OCS-APIRequest header.
 * Uses Basic auth so it works for OCS calls regardless of session state.
 */
async function getAdminApi(): Promise<APIRequestContext> {
	const auth = 'Basic ' + Buffer.from(`${ADMIN.userId}:${ADMIN.password}`).toString('base64')
	return await request.newContext({
		baseURL: NEXTCLOUD_URL,
		extraHTTPHeaders: {
			Authorization: auth,
			'OCS-APIRequest': 'true',
			Accept: 'application/json',
		},
		ignoreHTTPSErrors: true,
	})
}

/**
 * Create a guest user via the guests app's OCS endpoint. Returns the new UID.
 *
 * @param api admin API context
 * @param payload guest payload
 * @param payload.displayName display name for the new guest
 * @param payload.email email; becomes the UID when hashing is disabled
 */
export async function createGuest(
	api: APIRequestContext,
	{ displayName, email }: { displayName: string, email: string },
): Promise<string> {
	const response = await api.put('/ocs/v2.php/apps/guests/api/v1/users', {
		headers: { 'Content-Type': 'application/json' },
		data: { displayName, email, language: '', groups: [], sendInvite: false },
	})
	const body = await response.json().catch(() => ({}))
	expect(
		response.ok(),
		`createGuest expected 2xx, got ${response.status()}: ${JSON.stringify(body)}`,
	).toBeTruthy()
	const uid = body?.ocs?.data?.id ?? body?.ocs?.data?.uid
	if (!uid) {
		throw new Error(`createGuest: missing id/uid in OCS response: ${JSON.stringify(body)}`)
	}
	return String(uid)
}

/**
 * Delete a user via OCS. Idempotent; treats 404 as already-gone.
 *
 * @param api admin API context
 * @param uid the user id to delete
 */
export async function deleteUser(api: APIRequestContext, uid: string): Promise<void> {
	const response = await api.delete(`/ocs/v2.php/cloud/users/${encodeURIComponent(uid)}`)
	if (!response.ok() && response.status() !== 404) {
		throw new Error(`deleteUser failed for ${uid}: ${response.status()}`)
	}
}

type Fixtures = {
	adminApi: APIRequestContext
	adminPage: Page
	createdUsers: string[]
}

export const test = base.extend<Fixtures>({
	// eslint-disable-next-line no-empty-pattern
	adminApi: async ({}, use) => {
		const api = await getAdminApi()
		await use(api)
		await api.dispose()
	},

	adminPage: async ({ page }, use) => {
		await login(page.context().request, ADMIN)
		await use(page)
	},

	// Specs push created UIDs here; teardown deletes them and surfaces failures.
	createdUsers: async ({ adminApi }, use) => {
		const uids: string[] = []
		await use(uids)
		for (const uid of uids) {
			try {
				await deleteUser(adminApi, uid)
			} catch (error) {
				// eslint-disable-next-line no-console
				console.warn(`teardown: failed to delete user ${uid}`, error)
			}
		}
	},
})

export { expect }
