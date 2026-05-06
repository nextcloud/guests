/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	export default DefineComponent
}

declare module '*.svg?raw' {
	const content: string
	export default content
}
