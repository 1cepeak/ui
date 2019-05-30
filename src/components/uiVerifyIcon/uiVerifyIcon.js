import Mountable from '../../mixins/mountable';

import uiTooltip from '../uiTooltip';
import uiIcon from '../uiIcon';

import { CLASS_PREFIX } from '../uiTooltip/uiTooltip';

export default {
	name: 'ui-verify-icon',
	mixins: [
		Mountable
	],
	props: {
		border: String,
		name: {
			type: String,
			default: 'tick-circled'
		},
		position: {
			type: String,
			default: 'bottom'
		},
		maxWidth: {
			type: [String, Number],
			default: 320
		},
		minWidth: [String, Number],
		maxHeight: {
			type: [String, Number],
			default: 300
		},
		minHeight: [String, Number],
	},
	computed: {
		classes() {
			return {
				'ag-verify-icon': true,
				[`-border-${this.border}`]: !!this.border
			};
		}
	},
	methods: {
		genTooltip() {
			return this.$createElement(uiTooltip, {
				props: {
					maxWidth: this.maxWidth,
					minWidth: this.minWidth,
					maxHeight: this.maxHeight,
					minHeight: this.minHeight,
					position: this.position,
					mountElement: this.mountElement,
					disableMounting: this.disableMounting,
					clickable: true
				}
			}, [
				this.genIcon(),
				this.$createElement('div', { staticClass: `${CLASS_PREFIX}__indents` }, this.$slots.default)
			]);
		},
		genIcon() {
			return this.$createElement(uiIcon, {
				slot: 'activator',
				props: {
					name: this.name
				}
			});
		}
	},
	render(h) {
		return h('div', { class: this.classes }, [this.genTooltip()]);
	}
};
