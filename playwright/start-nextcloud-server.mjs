/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { startNextcloud, stopNextcloud } from '@nextcloud/e2e-test-server/docker'
import { readFileSync } from 'node:fs'
import process from 'node:process'

/**
 *
 */
async function start() {
	const appinfo = readFileSync('appinfo/info.xml').toString()
	const maxVersion = appinfo.match(/<nextcloud min-version="\d+" max-version="(\d\d+)" \/>/)?.[1]
	const branch = maxVersion ? `stable${maxVersion}` : undefined
	return await startNextcloud(branch, true, { exposePort: 8089 })
}

await start()

process.on('beforeExit', () => {
	stopNextcloud()
})

while (true) {
	await new Promise((resolve) => setTimeout(resolve, 5000))
}
