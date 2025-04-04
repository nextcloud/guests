<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div class="guests-details">
		<div v-if="loaded && !error">
			<table>
				<thead>
					<tr>
						<th colspan="2">
							{{ t('guests', 'Name') }}
						</th>
						<th>
							{{ t('guests', 'Shared By') }}
						</th>
						<th>
							{{ t('guests', 'Shared At') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="share in details[activeUser].shares" :key="share.id">
						<td colspan="2" class="name" :style="{ backgroundImage: 'url(' + getMimeIcon(share.mime_type) + ')'}">
							{{ share.name }}
						</td>
						<td class="shared_by" :title="share.shared_by">
							{{ share.shared_by }}
						</td>
						<td class="shared_at">
							{{ formatTime(share.time) }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-else-if="error">
			<div class="error">
				<div class="icon-error" />
				{{ t('guests', 'An error occured while fetching the shares list') }}
			</div>
		</div>
		<div v-if="!loaded">
			<div class="loading" />
		</div>
	</div>
</template>

<script>
import { generateOcsUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'

export default {
	name: 'GuestDetails',
	props: {
		guestId: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			activeUser: '',
			details: {},
			error: false,
			loaded: false,
		}
	},
	watch: {
		guestId() {
			this.loadGuestDetails()
		},
	},
	beforeMount() {
		this.loadGuestDetails()
	},
	methods: {
		async loadGuestDetails() {
			if (!this.details[this.guestId]) {
				this.loaded = false
				try {
					const { data } = await axios.get(
						generateOcsUrl('apps/guests/api/v1/users/{guestId}', { guestId: this.guestId }),
					)
					this.details[this.guestId] = data.ocs.data
					this.activeUser = this.guestId
				} catch (error) {
					console.error(error)
					this.error = true
				} finally {
					this.loaded = true
				}
			} else {
				this.activeUser = this.guestId
			}
		},
		getMimeIcon(mime) {
			return OC.MimeType.getIconUrl(mime)
		},
		formatTime(time) {
			return OC.Util.formatDate(new Date(time * 1000))
		},
	},
}
</script>

<style lang="scss" scoped>
.guests-details {
	.loading,
	.error {
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		.icon-error {
			margin: 10px;
			height: 24px;
			width: 24px;
			background-size: 24px;
		}
	}

	table tr {
		th.name {
			padding-left: 68px;
		}

		td.name {
			background-repeat: no-repeat;
			background-size: 32px;
			padding-left: 68px;
			background-position: 33px 3px;
		}
	}
}
</style>
