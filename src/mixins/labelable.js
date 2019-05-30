import uiLabel from '../components/uiLabel';

import { makeHash } from '../utils/helpers';

export default {
	components: {
		uiLabel
	},
	props: {
		required: Boolean,
		requiredText: {
			type: String,
			default: 'Обязательное для заполнения поле'
		}
	},
	data: () => ({
		useHash: false,
		hash: null
	}),
	computed: {
		hasLabel() {
			return !!(this.$slots.default || this.$slots.label);
		}
	},
	methods: {
		genLabelSlot() {
			let slot = null;

			if (this.$slots['label']) {
				slot = this.$slots['label'];
			} else if (this.$slots.default) {
				slot = this.genLabel();
			}

			return slot;
		},
		genLabel() {
			return this.$createElement(uiLabel, {
				props: {
					small: this.small,
					for: this.hash || undefined
				}
			}, this.$slots.default);
		}
	},
	created() {
		if (this.useHash && this.hasLabel) {
			this.hash = makeHash(this.$options.name + '-');
		}
	}
}
