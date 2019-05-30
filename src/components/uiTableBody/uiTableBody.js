export default {
	name: 'ui-table-body',
	render(h) {
		return h('tbody', [this.$slots.default]);
	}
}
