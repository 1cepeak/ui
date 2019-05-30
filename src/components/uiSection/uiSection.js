const CLASS_PREFIX = 'ag-section';

export default {
	name: 'ui-section',
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		first: Boolean
	},
	computed: {
		classes() {
			return {
				[CLASS_PREFIX]: true,
				[`${CLASS_PREFIX}--first`]: this.first
			};
		}
	},
	render(h) {
		return h(this.tag, { class: this.classes }, this.$slots.default);
	}
}
