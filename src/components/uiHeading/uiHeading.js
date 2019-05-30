import Colorable from '../../mixins/colorable';

export default {
	name: 'ui-heading',
	mixins: [
		Colorable
	],
	props: {
		level: {
			type: [String, Number],
			default: 4
		}
	},
	computed: {
		classes() {
			return Object.assign({
				[`ag-h${this.level}`]: true
			}, this.colorClasses);
		}
	},
	render(h) {
		return h(`h${this.level}`, {
			class: this.classes,
			style: this.colorStyles
		}, this.$slots.default);
	}
}
