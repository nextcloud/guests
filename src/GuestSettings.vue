<template>
	<div class="section" id="guests">
		<h2>{{ t('guests', 'Guests') }} <span class="msg" ref="msg"></span></h2>
		<div v-if="loaded">
			<p>
				<span class="user-info-label">
					{{ t('guests', 'Guest users are grouped under a virtual group in the user manager') }}
				</span>
			</p>
			<p class="external-storage-toggle">
				<input type="checkbox"
					   id="allowExternalStorage"
					   class="checkbox"
					   @change="saveConfig"
					   v-model="config.allowExternalStorage"/>
				<label for="allowExternalStorage">
					{{ t('guests', 'Guest users can access mounted external storages') }}
				</label>
			</p>
			<p class="hide-users-toggle">
				<input type="checkbox"
					   id="hideUsers"
					   class="checkbox"
					   @change="saveConfig"
					   v-model="config.hideUsers"/>
				<label for="hideUsers">
					{{ t('guests', 'Hide other users from guests') }}
				</label>
			</p>
			<p class="note" v-if="config.hideUsers">
				{{ t('guests', 'Guests will still be able to see users from any group they are added to') }}
			</p>
			<p class="whitelist-toggle">
				<input type="checkbox"
					   id="guestUseWhitelist"
					   class="checkbox"
					   @change="saveConfig"
					   v-model="config.useWhitelist"/>
				<label for="guestUseWhitelist">
					{{ t('guests', 'Limit guest access to an app whitelist') }}
				</label>
			</p>
			<p class="whitelist" v-if="config.useWhitelist">
				<Multiselect :options="config.whiteListableApps" :multiple="true" v-model="config.whitelist"
							 @input="saveConfig" :close-on-select="false" :clear-on-select="false" :tagWidth="75"></Multiselect>
				<button :title="t('guests', 'Reset')" type="button" class="icon-history icon" @click="reset"></button>
			</p>
		</div>
		<div v-if="!loaded">
			<div class="loading"/>
		</div>
		<guest-list/>
	</div>
</template>

<script>
	import deepEqual from 'deep-equal';

	export default {
		name: 'guest-settings',
		data () {
			return {
				loaded: false,
				enable_save: false,
				config: {
					useWhitelist: false,
					allowExternalStorage: false,
					hideUsers: false,
					whitelist: [],
					whiteListableApps: [],
				}
			};
		},
		methods: {
			loadConfig () {
				$.get(OC.generateUrl('apps/guests/config'))
					.then(data => {
						this.config = data;
						this.loaded = true;
						this.$nextTick(() => {
							this.enable_save = true;
						});
					});
			},
			saveConfig () {
				if (!this.loaded || !this.enable_save) {
					return;
				}
				OC.msg.startSaving(this.$refs.msg);
				$.ajax({
					type: 'PUT',
					url: OC.generateUrl('apps/guests/config'),
					data: this.config,
					dataType: 'json'
				})
					.success(() => {
						const data = {status: 'success', data: {message: t('guests', 'Saved')}};
						OC.msg.finishedSaving(this.$refs.msg, data);
					})
					.fail((result) => {
						const data = {status: 'error', data: {message: result.responseJSON.message}};
						OC.msg.finishedSaving(this.$refs.msg, data);
					});
			},
			reset () {
				OC.msg.startSaving(this.$refs.msg);
				$.ajax({
					type: 'POST',
					url: OC.generateUrl('apps/guests/whitelist/reset')
				}).success((response) => {
					this.config.whitelist = response.whitelist;

					OC.msg.finishedSaving(this.$refs.msg, {
						status: 'success',
						data: {message: t('guests', 'Reset')}
					});
				}).fail((response) => {
					OC.msg.finishedSaving(this.$refs.msg, {
						status: 'error',
						data: {message: response.responseJSON.message}
					});
				});
			}
		},
		beforeMount () {
			this.loadConfig();
		}
	};
</script>

<style lang="scss">
#guests {
	.note {
		margin: 5px;
		padding: 10px;
		background: var(--color-background-dark);
		border-radius: var(--border-radius);
		border: 1px solid var(--color-border);
	}

	.whitelist {
		display: flex;

		.multiselect {
			width: calc(100% - 48px);
			margin-right: 0;

			.multiselect__tags {
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
				border-right: 0;
				flex-wrap: nowrap;

			}
		}

		button {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			margin: 0;
		}

		.whitelist-toggle {
			margin: 1em 0;
		}
	}
}
</style>
