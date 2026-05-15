/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: './playwright',

	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: 1,
	// HTML output is uploaded as a CI artifact so failed runs leave breadcrumbs.
	reporter: process.env.CI
		? [['github'], ['html', { outputFolder: 'playwright-report', open: 'never' }]]
		: 'html',

	use: {
		baseURL: 'http://localhost:8089/index.php/',
		trace: 'on-first-retry',
		ignoreHTTPSErrors: true,
	},

	projects: [
		{
			name: 'setup',
			testMatch: /setup\.ts$/,
		},
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
			dependencies: ['setup'],
		},
	],

	webServer: {
		command: 'npm run start:nextcloud',
		reuseExistingServer: !process.env.CI,
		url: 'http://127.0.0.1:8089',
		stderr: 'pipe',
		stdout: 'pipe',
		timeout: 5 * 60 * 1000,
	},
})
