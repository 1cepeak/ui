import Mountable from '../../mixins/mountable';

import { appendElement } from '../../utils/helpers';

import { CLASS_PREFIX } from '../uiNotification/uiNotification';

export default {
	name: 'ui-notification-container',
	mixins: [
		Mountable
	],
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		x: {
			type: String,
			default: 'top'
		},
		y: {
			type: String,
			default: 'right'
		}
	},
	computed: {
		styles() {
			const isTop = this.x === 'top';
			const isRight = this.y === 'right';

			return {
				top: isTop ? '0' : 'unset',
				bottom: isTop ? 'unset' : '0',
				right: isRight ? '0' : 'unset',
				left: isRight ? 'unset' : '0'
			};
		}
	},
	render(h) {
		return h(this.tag, {
			staticClass: `${CLASS_PREFIX}-container`,
			style: this.styles
		}, [this.$slots.default]);
	},
	mounted() {
		appendElement(this.$el, this.mountElement);
	},
	beforeDestroy() {
		this.$el.remove();
	}
}
