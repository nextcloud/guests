/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { startNextcloud, stopNextcloud, waitOnNextcloud } from '@nextcloud/e2e-test-server/docker'
import { readFileSync } from 'node:fs'
import process from 'node:process'

/**
 *
 */
async function start() {
	const appinfo = readFileSync('appinfo/info.xml').toString()
	const maxVersion = appinfo.match(/<nextcloud min-version="\d+" max-version="(\d\d+)" \/>/)?.[1]
	const branch = maxVersion ? `stable${maxVersion}` : undefined
	const ip = await startNextcloud(branch, true, { exposePort: 8089 })
	// startNextcloud returns as soon as the container's IP answers, which can be
	// before NC's install scripts finish. Without this extra poll the first API
	// call races the boot and flakes.
	await waitOnNextcloud(ip)
	return ip
}

await start()

process.on('beforeExit', () => {
	stopNextcloud()
})

while (true) {
	await new Promise((resolve) => setTimeout(resolve, 5000))
}
