export default {
	name: 'ui-container',
	props: {
		compact: Boolean
	},
	computed: {
		classes() {
			const prefix = 'ag-container';

			return {
				[prefix]: true,
				[`${prefix}--compact`]: this.compact
			};
		}
	},
	render(h) {
		return h('div', { class: this.classes }, this.$slots.default);
	}
}
