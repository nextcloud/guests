declare module '@nextcloud/event-bus' {
	export interface NextcloudEvents {
		'guests:user:deleted': string,
		'guests:user:created': string,
	}
}

export {}
