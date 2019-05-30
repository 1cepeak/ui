export default {
	name: 'ui-table-cell',
	props: {
		cols: [Number, String],
		rows: [Number, String],
		classes: String
	},
	render(h) {
		return h('td', {
			staticClass: this.classes,
			attrs: {
				colspan: this.cols,
				rowspan: this.rows
			}
		}, [this.$slots.default]);
	}
}
