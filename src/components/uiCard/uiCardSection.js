import { CLASS_PREFIX } from './uiCard';

export default {
	name: 'ui-card-section',
	render(h) {
		return h('div', { staticClass: `${CLASS_PREFIX}__section` }, this.$slots.default);
	}
}
