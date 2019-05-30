export default {
	name: 'ui-table-head',
	render(h) {
		return h('thead', [
			h('tr', [this.$slots.default])
		]);
	}
}
