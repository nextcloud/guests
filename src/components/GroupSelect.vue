<template>
	<Multiselect
		v-model="selected"
		class="group-multiselect"
		:placeholder="t('guests', 'None')"
		track-by="gid"
		label="name"
		:options="groups"
		:disabled="required && groups.length < 2"
		open-direction="bottom"
		:multiple="true"
		:allow-empty="!required" />
</template>

<script>
import Multiselect from '@nextcloud/vue/dist/Components/Multiselect'

export default {
	name: 'GroupSelect',
	components: {
		Multiselect,
	},
	props: {
		groups: {
			type: Array,
			default: () => [],
		},
		required: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		const defaultGroups = []
		if (this.required && this.groups.length === 1) {
			defaultGroups.push(this.groups[0])
			this.$emit('input', defaultGroups.map(group => group.gid))
		}
		return {
			selected: defaultGroups,
		}
	},
	watch: {
		selected: function() {
			this.$emit('input', this.selected.map(group => group.gid))
		},
	},
}
</script>

<style lang="scss">
	.group-multiselect {
		width: 100%;
		margin-right: 0;
	}
</style>
