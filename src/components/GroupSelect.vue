<!--
  - SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcSelect
		v-model="selected"
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
import { t } from '@nextcloud/l10n'
import NcSelect from '@nextcloud/vue/components/NcSelect'

export default {
	name: 'GroupSelect',
	components: {
		NcSelect,
	},

	props: {
		modelValue: {
			type: Array,
			default: () => [],
		},

		groups: {
			type: Array,
			default: () => [],
		},

		required: {
			type: Boolean,
			default: false,
		},
	},

	emits: ['update:modelValue'],

	data() {
		const defaultGroups = []
		if (this.required && this.groups.length === 1) {
			defaultGroups.push(this.groups[0])
			this.$emit('update:modelValue', defaultGroups.map((group) => group.gid))
		}
		return {
			selected: defaultGroups,
		}
	},

	watch: {
		modelValue(value) {
			if (value.length === 0) {
				this.selected = []
			}
		},

		selected() {
			this.$emit('update:modelValue', this.selected.map((group) => group.gid))
		},
	},

	methods: {
		t,
	},
}
</script>

<style lang="scss">
	.group-multiselect {
		width: 100%;
		margin-right: 0;
	}
</style>
