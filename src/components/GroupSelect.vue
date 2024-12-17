<!--
  - SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcSelect v-model="selected"
		class="group-multiselect"
		:placeholder="t('guests', 'None')"
		label="name"
		:options="groups"
		:disabled="required && groups.length < 2"
		placement="bottom"
		:multiple="true"
		:required="required" />
</template>

<script>
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'

export default {
	name: 'GroupSelect',
	components: {
		NcSelect,
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
		selected() {
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
