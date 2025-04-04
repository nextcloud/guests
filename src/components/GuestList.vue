<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcSettingsSection :name="t('guests', 'Guests accounts')">
		<div v-if="loaded && !error" class="guests-list">
			<table v-if="guests.length" class="table">
				<thead>
					<tr>
						<th :class="getSortClass('email')" @click="setSort('email')">
							{{ t('guests', 'Email') }}
						</th>
						<th :class="getSortClass('display_name')" @click="setSort('display_name')">
							{{ t('guests', 'Name') }}
						</th>
						<th :class="getSortClass('created_by')" @click="setSort('created_by')">
							{{ t('guests', 'Invited by') }}
						</th>
						<th :class="getSortClass('share_count')" @click="setSort('share_count')">
							{{ t('guests', 'Received shares') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<template v-for="guest in guests">
						<tr :key="guest.email"
							:class="guest.email === details_for ? 'active': ''"
							@click="toggleDetails(guest.email)">
							<td class="email"
								:title="guest.email">
								{{ guest.email }}
							</td>
							<td class="display_name"
								:title="guest.display_name">
								{{ guest.display_name }}
							</td>
							<td class="created_by"
								:title="guest.created_by">
								{{ guest.created_by }}
							</td>
							<td class="share_count">
								{{ guest.share_count }}
							</td>
						</tr>
						<tr v-if="guest.email === details_for"
							:key="guest.email + '-details'"
							class="details">
							<td colspan="4">
								<GuestDetails :guest-id="guest.email" />
							</td>
						</tr>
					</template>
				</tbody>
			</table>
			<div v-if="!guests.length">
				{{ t('guests', 'No guest accounts created') }}
			</div>
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
	</NcSettingsSection>
</template>

<script lang="ts">
import type { OCSResponse } from '@nextcloud/typings/ocs'
import type { AxiosResponse } from '@nextcloud/axios'

import { defineComponent } from 'vue'
import { generateOcsUrl } from '@nextcloud/router'
import { t } from '@nextcloud/l10n'
import axios from '@nextcloud/axios'
import NcSettingsSection from '@nextcloud/vue/components/NcSettingsSection'

import GuestDetails from './GuestDetails.vue'

type OcsGuest = {
	email: string
	display_name: string
	created_by: string
	share_count: number
}

export default defineComponent({
	name: 'GuestList',

	components: {
		GuestDetails,
		NcSettingsSection,
	},

	setup() {
		return {
			t,
		}
	},

	data() {
		return {
			details_for: '',
			sort: 'email',
			sort_direction: 1,
			error: false,
			loaded: false,
			guests: [] as OcsGuest[],
		}
	},

	beforeMount() {
		this.loadGuests()
	},

	methods: {
		async loadGuests() {
			try {
				const { data } = await axios.get(generateOcsUrl('apps/guests/api/v1/users')) as AxiosResponse<OCSResponse<OcsGuest[]>>
				this.guests = data.ocs.data
			} catch (error) {
				this.error = true
				console.error('Error fetching guests list', error)
			} finally {
				this.loaded = true
			}
		},
		getSortClass(name: string) {
			return name + ' ' + (name === this.sort ? `sort-${this.sort_direction > 0 ? 'asc' : 'desc'}` : '')
		},
		setSort(name: string) {
			if (name === this.sort) {
				this.sort_direction = -this.sort_direction
			} else {
				this.sort = name
				this.sort_direction = 1
			}
			this.guests = this.guests.sort((a, b) => {
				return (a[this.sort]).localeCompare(b[this.sort]) * this.sort_direction
			})
		},
		toggleDetails(email: string) {
			this.details_for = email
		},
	},
})
</script>

<style lang="scss" scoped>
.guests-list {
	padding: 20px 0 0;

	:deep(table) {
		width: calc(100% + 60px);
		margin: 0 -30px;
		table-layout: fixed;

		tr {
			height: 32px;

			&.active, &.details {
				background-color: var(--color-background-dark);
			}
		}

		.sort-desc::after {
			position: absolute;
			right: 10px;
			content: '▼';
		}

		.sort-asc::after {
			position: absolute;
			right: 10px;
			content: '▲';
		}

		th {
			cursor: pointer;
			border-bottom: 1px #ddd solid;

			.sort_arrow {
				float: right;
				color: #888;
			}
		}

		td, th {
			position: relative;
			display: table-cell;
			overflow: hidden;
			padding: 10px;
			white-space: normal;
			text-overflow: ellipsis;

			&:first-child {
				padding-left: 30px;
			}

			&:last-child {
				padding-right: 30px;
				text-align: right;
			}

			&.groups {
				width: 400px;
			}

			&.remove {
				width: 32px;
			}

			a.icon {
				margin-left: 5px;
			}
		}
	}
}

.error {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50px;
	.icon-error {
		width: 24px;
		height: 24px;
		margin: 10px;
		background-size: 24px;
	}
}

</style>
