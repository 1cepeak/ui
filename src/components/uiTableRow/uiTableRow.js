import Colorable from '../../mixins/colorable';

export default {
	name: 'ui-table-row',
	mixins: [
		Colorable
	],
	props: {
		expanded: Boolean,
		unpacked: Boolean
	},
	computed: {
		classes() {
			return {
				'-selected': Object.keys(this.colorStyles).length > 0
			};
		},
		styles() {
			return Object.assign({}, this.colorStyles);
		}
	},
	render(h) {
		return h('tr', { class: this.classes, style: this.styles }, [this.$slots.default]);
	}
}
