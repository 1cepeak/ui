import { provide as RegistrableProvide } from '../../mixins/registrable';

export const CLASS_PREFIX = 'ag-breadcrumbs';

export default {
	name: 'ui-breadcrumbs',
	mixins: [
		RegistrableProvide('breadcrumbs')
	],
	methods: {
		register() {},
		unregister() {},
		genContent() {
			return this.$createElement('ul', { staticClass: `${CLASS_PREFIX}__list` }, this.$slots.default);
		}
	},
	render(h) {
		return h('div', { staticClass: CLASS_PREFIX }, [this.genContent()]);
	}
}
