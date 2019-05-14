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
				<v-select :options="config.whiteListableApps" multiple v-model="config.whitelist"
						  :on-change="saveConfig"></v-select>
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

<style>
	#guests {
		.whitelist {
			display: flex;

			.v-select {
				width: calc(100% - 48px);
				margin-right: 0;

				.vs__dropdown-toggle {
					border-top-right-radius: 0;
					border-bottom-right-radius: 0;
					border-right: 0;
					flex-wrap: nowrap;

					input {
						min-height: auto;

						border-color: transparent;
					}
				}

				.vs__deselect {
					display:inline-block;
				}
			}

			button {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}

			.whitelist-toggle {
				margin: 1em 0;
			}
		}
	}
</style>
