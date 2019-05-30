const CLASS_PREFIX = 'ag-grid';

export default {
	name: 'ui-grid',
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		gutters: [Number, String]
	},
	computed: {
		classes() {
			return {
				[CLASS_PREFIX]: true,
				[`${CLASS_PREFIX}--gutters-${this.gutters}`]: this.gutters
			};
		}
	},
	render(h) {
		return h(this.tag, { class: this.classes }, this.$slots.default);
	}
}
