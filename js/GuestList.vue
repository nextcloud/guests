<template>
	<div class="section" id="guests-list">
		<h2>Guests accounts</h2>
		<div v-if="loaded">
			<table class="table" v-if="guests.length">
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
				</tr>
				</thead>
				<tbody>
				<tr v-for="guest in guests">
					<td class="email">{{guest.email}}</td>
					<td class="display_name">{{guest.display_name}}</td>
					<td class="created_by">{{guest.created_by}}</td>
				</tr>
				</tbody>
			</table>
			<div v-if="!guests.length">
				{{ t('guests', 'No guest accounts created') }}
			</div>
		</div>
		<div v-if="!loaded">
			<div class="loading"/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'guest-list',
		data () {
			return {
				sort: 'email',
				sort_direction: 1,
				loaded: false,
				guests: []
			};
		},
		methods: {
			loadGuests () {
				$.get(OC.generateUrl('apps/guests/users'))
					.then(data => {
						this.guests = data;
						this.$nextTick(() => {
							this.loaded = true;
						});
					});
			},
			getSortClass (name) {
				return name + ' ' + (name === this.sort ? `sort-${this.sort_direction > 0 ? 'asc' : 'desc'}` : '');
			},
			setSort (name) {
				if (name === this.sort) {
					this.sort_direction = -this.sort_direction;
				} else {
					this.sort = name;
					this.sort_direction = 1;
				}
				this.guests = this.guests.sort((a, b) => {
					return (a[this.sort]).localeCompare(b[this.sort]) * this.sort_direction;
				});
			},
		},
		beforeMount () {
			this.loadGuests();
		}
	};
</script>

<style>
	#guests-list {
		padding: 20px 0 0;

		table {
			margin: 0 -30px;
			table-layout: fixed;
			width: calc(100% + 60px);

			tr {
				height: 32px;
			}

			.sort-desc::after {
				content: '▼';
				position: absolute;
				right: 10px;
			}

			.sort-asc::after {
				content: '▲';
				position: absolute;
				right: 10px;
			}

			th {
				border-bottom: 1px #ddd solid;
				cursor: pointer;

				.sort_arrow {
					float: right;
					color: #888;
				}
			}

			td, th {
				&:first-child {
					padding-left: 30px;
				}

				&:last-child {
					padding-right: 30px;
				}

				padding: 10px;
				position: relative;
				display: table-cell;

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
</style>
