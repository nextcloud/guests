<template>
	<NcMultiselect v-model="language"
		class="lang-multiselect"
		:placeholder="t('guests', 'Default')"
		track-by="code"
		label="name"
		:options="merged"
		:disabled="disabled"
		open-direction="bottom"
		:allow-empty="false" />
</template>

<script>
import { generateOcsUrl } from '@nextcloud/router'
import NcMultiselect from '@nextcloud/vue/dist/Components/NcMultiselect.js'
import axios from '@nextcloud/axios'

export default {
	name: 'LanguageSelect',
	components: {
		NcMultiselect,
	},
	props: {
		value: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			language: '',
			defaultLanguage: {
				code: '',
				name: t('guests', 'Default'),
			},
			commonLanguages: [],
			languages: [],
			merged: [],
		}
	},
	watch: {
		language() {
			this.$emit('input', this.language.code)
		},
	},
	beforeMount() {
		this.loadLanguages()
	},
	methods: {
		async loadLanguages() {
			try {
				const result = await axios.get(generateOcsUrl('apps/guests/api/v1/languages'))
				this.commonLanguages = result.data.ocs.data.commonLanguages
				this.languages = result.data.ocs.data.languages
				this.merged = [this.defaultLanguage].concat(result.data.ocs.data.commonLanguages).concat(result.data.ocs.data.languages)
			} catch (error) {
				console.error('Failed to retrieve languages', error)
			}
		},
	},
}
</script>

<style lang="scss">
.lang-multiselect {
	width: 100%;
	margin-right: 0;
}
</style>
