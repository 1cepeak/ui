const CLASS_PREFIX = 'ag-line';

export default {
	name: 'ui-divider',
	methods: {
		genContent() {
			return this.$createElement('div', { class: `${CLASS_PREFIX}__content`}, this.$slots.default);
		}
	},
	render(h) {
		return h('div', { class: CLASS_PREFIX }, [this.genContent()]);
	}
}
