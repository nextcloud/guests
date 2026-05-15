/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { configureNextcloud } from '@nextcloud/e2e-test-server/docker'
import { test as setup } from '@playwright/test'

setup('Configure Nextcloud with guests app', async () => {
	await configureNextcloud(['guests'])
})
