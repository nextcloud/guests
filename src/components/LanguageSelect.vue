<template>
	<Multiselect
		v-model="language"
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
import Multiselect from '@nextcloud/vue/dist/Components/Multiselect'
import axios from '@nextcloud/axios'

export default {
	name: 'LanguageSelect',
	components: {
		Multiselect,
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
		language: function() {
			this.$emit('input', this.language.code)
		},
	},
	beforeMount() {
		this.loadLanguages()
	},
	methods: {
		async loadLanguages() {
			try {
				const result = await axios.get(generateOcsUrl('apps/guests/api/v1/', 2) + 'languages')
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
