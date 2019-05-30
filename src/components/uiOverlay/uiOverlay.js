import Mountable from '../../mixins/mountable';
import { factory as ToggleFactory } from '../../mixins/toggleable';
import { factory as OverlayFactory } from '../../mixins/overlayable';

export const CLASS_PREFIX = 'ag-dialog-box';

export default {
	name: 'ui-overlay',
	mixins: [
		Mountable,
		ToggleFactory('show', 'toggle'),
		OverlayFactory('isActive')
	],
	data: () => ({
		automaticMounting: true
	}),
	computed: {
		classes() {
			return {
				shown: this.isActive
			};
		}
	},
	watch: {
		isActive(value) {
			this.$emit(value ? 'open' : 'close');
		}
	},
	methods: {
		clickHandler(e) {
			this.toggle();

			this.$emit('toggle', e);
		},
		scrollHandler(event) {
			this.$emit('scroll', event)
		}
	},
	render(h) {
		return h('div', {
			staticClass: CLASS_PREFIX,
			class: this.classes,
			on: {
				scroll: this.scrollHandler
			},
			nativeOn: {
				click: this.clickHandler
			}
		}, this.$slots.default);
	}
}
