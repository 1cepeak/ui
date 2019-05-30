import { CLASS_PREFIX } from './uiTooltip';

export default {
	name: 'ui-tooltip-indents',
	props: {
		tag: {
			type: String,
			default: 'div'
		}
	},
	render(h) {
		return h(this.tag, { staticClass: `${CLASS_PREFIX}__indents` }, this.$slots.default);
	}
}
