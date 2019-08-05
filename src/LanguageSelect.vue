<template>
	<v-select
		:placeholder="t('guests', 'Default')"
		label="name"
		:options="merged"
		v-model="language" />
</template>

<script>
export default {
	props: ['value'],
	name: 'LanguageSelect',
	data() {
		return {
			language: '',
			commonLanguages: [],
			languages: [],
			merged: []
		};
	},
	methods: {
		loadLanguages() {
			$.get(OC.generateUrl('apps/guests/config/languages')).then(data => {
				console.log(data);
				this.commonLanguages = data.commonLanguages;
				this.languages = data.languages;
				this.merged = data.commonLanguages.concat(data.languages);
			});
		}
	},
	watch: {
		language: function() {
			this.$emit('input', this.language.code);
		}
	},
	beforeMount() {
		this.loadLanguages();
	}
};
</script>

<style lang="scss">
.v-select {
	width: 100%;
	margin-right: 0;

	.vs__dropdown-toggle {
		flex-wrap: nowrap;
		height: 36px;

		input:not(:disabled):not(.primary):not([type='radio']):not([type='checkbox']):not([type='range']):not([type='submit']):not([type='button']):not([type='reset']):not([type='color']):not([type='file']):not([type='image']) {
			min-height: auto;
			height: 28px;

			border-color: transparent;
			&:hover,
			&:active {
				border-color: transparent;
			}
		}
	}

	.vs__deselect {
		display: inline-block;
	}
}
</style>
