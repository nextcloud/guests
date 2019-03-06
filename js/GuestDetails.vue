<template>
	<div id="guests-details">
		<div v-if="loaded">
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
				<tr v-for="share in details[activeUser].shares">
					<td colspan="2" class="name" :style="{ backgroundImage: 'url(' + getMimeIcon(share.mime_type) + ')'}">
						{{share.name}}
					</td>
					<td class="shared_by">{{share.shared_by}}</td>
					<td class="shared_at">{{formatTime(share.time)}}</td>
				</tr>
				</tbody>
			</table>
		</div>
		<div v-if="!loaded">
			<div class="loading"/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'guest-details',
		props: ['guestId'],
		data () {
			return {
				loaded: false,
				details: {},
				activeUser: ''
			};
		},
		methods: {
			loadGuestDetails () {
				if (!this.details[this.guestId]) {
					this.loaded = false;
					$.get(OC.generateUrl(`apps/guests/users/${encodeURIComponent(this.guestId)}`))
						.then(data => {
							this.details[this.guestId] = data;
							this.activeUser = this.guestId;
							this.loaded = true;
						});
				} else {
					this.activeUser = this.guestId;
				}
			},
			getMimeIcon(mime) {
				return OC.MimeType.getIconUrl(mime);
			},
			formatTime(time) {
				return OC.Util.formatDate(new Date(time));
			}
		},
		beforeMount () {
			this.loadGuestDetails();
		},
		watch: {
			guestId: function () {
				this.loadGuestDetails();
			}
		}
	};
</script>

<style>
	#guests-details {
		.loading {
			height: 50px;
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
