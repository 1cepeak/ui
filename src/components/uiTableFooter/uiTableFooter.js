export default {
	name: 'ui-table-footer',
	render(h) {
		return h('tfoot', [this.$slots.default]);
	}
}
