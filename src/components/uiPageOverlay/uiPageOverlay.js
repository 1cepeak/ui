import Mountable from '../../mixins/mountable';
import { factory as ToggleFactory } from '../../mixins/toggleable';
import { factory as OverlayFactory } from '../../mixins/overlayable';

import uiIcon from '../uiIcon';

const CLASS_PREFIX = 'ag-page-overlay';

export default {
	name: 'ui-page-overlay',
	mixins: [
		Mountable,
		ToggleFactory('show', 'toggle'),
		OverlayFactory('isActive')
	],
	props: {
		closeHidden: {
			type: Boolean,
			default: true
		},
		closeText: {
			type: String,
			default: 'Закрыть'
		},
		zIndex: [Number, String]
	},
	data() {
		return {
			automaticMounting: true,
			useDelay: true
		};
	},
	computed: {
		classes() {
			return {
				[CLASS_PREFIX]: true,
				'-active': this.isActive,
				'-hidden': this.isHidden
			};
		},
		styles() {
			return {
				'z-index': this.zIndex
			};
		}
	},
	methods: {
		genContent() {
			if (!this.$slots.content) {
				return this.$slots.default;
			}

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__content` }, this.$slots.content);
		},
		genCloseButton() {
			if (this.closeHidden) {
				return null;
			}

			return this.$createElement('button', {
				class: {
					[`${CLASS_PREFIX}__close-button`]: true,
					'ag-sticky-button': true,
					'ag-close-icon': true
				},
				attrs: {
					type: 'button'
				},
				on: {
					click: this.toggle
				}
			}, [
				this.$createElement(uiIcon, { props: { name: 'cross' } }),
				this.$createElement('span', [this.closeText])
			]);
		}
	},
	render(h) {
		return h('div', { class: this.classes }, [
			this.genContent(),
			this.genCloseButton()
		]);
	}
}
