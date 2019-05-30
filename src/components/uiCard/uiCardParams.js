import { CLASS_PREFIX } from './uiCard';

export default {
	name: 'ui-card-params',
	render(h) {
		return h('div', { staticClass: `${CLASS_PREFIX}__params` }, this.$slots.default);
	}
}
