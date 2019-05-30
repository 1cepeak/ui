import Routable from '../../mixins/routable';
import { inject as RegistrableInject } from '../../mixins/registrable';

export default {
	name: 'ui-breadcrumb',
	mixins: [
		Routable,
		RegistrableInject('breadcrumbs')
	],
	props: {
		tag: {
			type: String,
			default: 'span'
		},
		activeClass: {
			type: String,
			default: 'active'
		},
		exactActiveClass: {
			type: String,
			default: 'active'
		}
	},
	methods: {
		click(e) {
			this.$emit('click', e);
		},
		genContent() {
			const { tag, data } = this.generateRouteLink();

			return this.$createElement(tag, data, this.$slots.default);
		}
	},
	mounted() {
		if (this.breadcrumbs) {
			this.breadcrumbs.register(this);
		}
	},
	beforeDestroy() {
		if (this.breadcrumbs) {
			this.breadcrumbs.unregister(this);
		}
	},
	render(h) {
		return h('li', [this.genContent()]);
	}
}
