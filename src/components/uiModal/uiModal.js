import Mountable from '../../mixins/mountable';
import { factory as ToggleFactory } from '../../mixins/toggleable';

import ClickOutside from '../../directives/ClickOutside';

import uiOverlay from '../uiOverlay';
import uiIcon from '../uiIcon';

import { CLASS_PREFIX } from "../uiOverlay/uiOverlay";

export default {
	name: 'ui-modal',
	mixins: [
		Mountable,
		ToggleFactory('show', 'toggle')
	],
	directives: {
		ClickOutside
	},
	props: {
		width: String,
		minWidth: String,
		maxWidth: String,
		caption: String,
		stretch: Boolean,
		disableClickOutside: Boolean,
		zIndex: [Number, String]
	},
	computed: {
		classes() {
			return {
				'ag-width--stretch': this.stretch
			};
		},
		styles() {
			return {
				width: this.width,
				minWidth: this.minWidth,
				maxWidth: this.maxWidth
			};
		},
		directives() {
			return [{
				name: 'click-outside',
				value: this.hide.bind(this),
				args: {
					closeConditional: (e) => {
						if (this.disableClickOutside) {
							return false;
						}

						let content = this.$refs.window;

						return !content || !content.contains(e.target);
					}
				}
			}];
		},
		handlers() {
			return {
				scroll: (e) => this.$emit('overlayScroll', e),
				open: (e) => this.$emit('open', e),
				close: (e) => this.$emit('close', e)
			};
		}
	},
	methods: {
		hide() {
			this.isActive = false;
		},
		genWindow() {
			return this.$createElement('div', {
				ref: 'window',
				staticClass: `${CLASS_PREFIX}__window`,
				class: this.classes,
				style: this.styles
			}, [
				this.genCaption(),
				this.genClose(),
				this.genInfoSlot(),
				this.genContent(),
				this.genActionsSlot()
			]);
		},
		genCaption() {
			return this.$createElement('div', {
				ref: 'header',
				staticClass: `${CLASS_PREFIX}__header`
			}, [this.$slots.caption || this.caption || null]);
		},
		genClose() {
			return this.$createElement('div', {
				staticClass: `${CLASS_PREFIX}__close`,
				on: {
					click: this.hide
				},
				nativeOn: {
					click: this.hide
				}
			}, [
				this.$createElement(uiIcon, { props: { name: 'cross-circled' } })
			]);
		},
		genInfoSlot() {
			return this.$slots.info || null;
		},
		genContent() {
			return this.$createElement('div', {
				ref: 'body',
				staticClass: `${CLASS_PREFIX}__body`,
				on: {
					scroll: (event) => this.$emit('scroll', event)
				}
			}, [this.$slots.default]);
		},
		genActionsSlot() {
			return this.$slots.actions;
		}
	},
	render(h) {
		return h(uiOverlay, {
			props: this.$props,
			directives: this.directives,
			on: this.handlers
		}, [this.genWindow()]);
	}
}
