import Mountable from '../../mixins/mountable';

import uiTooltipIndents from './uiTooltipIndents';

import ClickOutside from '../../directives/ClickOutside';

import { appendElement } from '../../utils/helpers';

export const CLASS_PREFIX = 'ag-drophint';

/**
 * @param {Element} el
 * @return {{ el: Element, top: number, left: number, width: number, height: number }}
 */
const elData = (el) => {
	const rect = el.getBoundingClientRect();
	const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	return {
		el,
		top: rect.top + scrollTop,
		left: rect.left + scrollLeft,
		width: el.offsetWidth,
		height: el.offsetHeight
	};
};

/**
 * @return {{ scrollLeft: number, scrollTop: number, scrollBottom: number }}
 */
const getScrollData = () => ({
	scrollLeft: window.pageXOffset || document.documentElement.scrollLeft,
	scrollTop: window.pageYOffset || document.documentElement.scrollTop,
	scrollBottom: window.pageYOffset || document.documentElement.scrollTop + window.innerHeight
});

export default {
	name: 'ui-tooltip',
	mixins: [
		Mountable
	],
	directives: {
		ClickOutside
	},
	model: {
		prop: 'opened',
		event: 'toggle'
	},
	props: {
		/**
		 * Показан / скрыт
		 * @param {boolean}
		 */
		opened: Boolean,
		/**
		 * Выключает темный стиль
		 * @param {boolean}
		 */
		light: Boolean,
		/**
		 * Включает управление показом по клику на активатор
		 * @param {boolean}
		 */
		clickable: Boolean,
		/**
		 * Отключает управление показом при наведении и клике (только через v-model)
		 * @param {boolean}
		 */
		disabled: Boolean,
		/**
		 * Максимальная ширина
		 * @param {number}
		 */
		maxWidth: {
			type: [String, Number],
			default: 320
		},
		minWidth: [String, Number],
		/**
		 * Максимальная высота
		 * @param {number}
		 */
		maxHeight: {
			type: [String, Number],
			default: 300
		},
		minHeight: [String, Number],
		/**
		 * Позиция (снизу, сверху, слева, справа и тд)
		 * @param {string}
		 */
		position: {
			type: String,
			default: 'bottom'
		},
		/**
		 * Задержка при переключении классов видимости (shown / hidden)
		 * @param {number}
		 */
		delay: {
			type: Number,
			default: 50
		},
		/**
		 * Задержка при скрытии (работает только при наведении)
		 * @param {number}
		 */
		hideDelay: {
			type: Number,
			default: 50
		},
		/**
		 * z-index
		 * @param {number | string}
		 */
		zIndex: [Number, String],
		/**
		 * Тэг в который будет маунтится содержимое слота activator
		 * @param {string}
		 */
		tag: {
			type: String,
			default: 'div'
		}
	},
	data() {
		return {
			isActive: false,
			hidden: true,
			margins: 10,
			timeout: undefined,
			customPosition: null,
			windowWidth: window.innerWidth,

			activator: {
				el: null,
				top: 0,
				left: 0,
				width: 0,
				height: 0
			},
			tooltip: {
				el: null,
				top: 0,
				left: 0,
				width: 0,
				height: 0,
				bottom: 0,
				right: 0
			},
			window: {
				el: null,
				top: 0,
				left: 0,
				width: 0,
				height: 0
			},
			arrow: {
				el: null,
				top: 0,
				left: 0,
				width: 0,
				height: 0
			},
		};
	},
	watch: {
		opened(value) {
			value ? this.show() : this.hide();
		}
	},
	computed: {
		classes() {
			return {
				'-dark': !this.light,
				'hidden': this.hidden,
				'shown': this.isActive
			};
		},
		styles() {
			let styles = {
				transform: `translate3d(${Math.round(this.tooltip.left)}px, ${Math.round(this.tooltip.top)}px, 0px)`,
				zIndex: this.zIndex
			};

			if (this.maxWidth && this.maxWidth < this.windowWidth) {
				styles['maxWidth'] = this.maxWidth === 'auto' ? this.maxWidth : `${this.maxWidth}px`;
			}

			if (this.maxHeight) {
				styles['maxHeight'] = this.maxHeight === 'auto' ? this.maxHeight : `${this.maxHeight}px`;
			}

			if (this.minWidth) {
				styles['minWidth'] = this.minWidth === 'auto' ? this.minWidth : `${this.minWidth}px`;
			}

			if (this.minHeight) {
				styles['minHeight'] = this.minHeight === 'auto' ? this.minHeight : `${this.minHeight}px`;
			}

			return styles;
		},
		arrowStyles() {
			const { top, left } = this.arrow;

			return {
				top: top ? `${top}px` : null,
				left: left ? `${left}px` : null
			};
		},
		handlers() {
			if (this.disabled) {
				return {};
			}

			if (!this.clickable) {
				return {
					mouseenter: this.show,
					mouseleave: this.hide
				};
			}

			return {
				click: (e) => {
					e.preventDefault();
					e.stopPropagation();

					this.toggle();

					this.$emit('click', e);
				}
			};
		},
		directives() {
			let directives = [];

			if (this.clickable) {
				directives.push({
					name: 'click-outside',
					value: this.hide.bind(this),
					args: {
						closeConditional: (e) => {
							const { activator, tooltip } = this.$refs;
							const { target } = e;

							if (!!tooltip && tooltip.contains(target)) {
								return false;
							}

							return activator !== target && !activator.contains(target);
						}
					}
				});
			}

			return directives;
		},
		currentPosition() {
			return this.customPosition || this.position;
		},
		positionsIsSame() {
			return this.customPosition === this.position;
		}
	},
	methods: {
		toggle() {
			this.isActive ? this.hide() : this.show();
		},
		show() {
			if (this.isActive) {
				return;
			}

			clearTimeout(this.timeout);

			this.hidden = false;

			setTimeout(() => {
				this.isActive = true;

				this.calculatePosition();

				this.$emit('toggle', this.isActive);
				this.$emit('show', this.isActive);
			}, this.delay);
		},
		hide() {
			clearTimeout(this.timeout);

			const hide = () => {
				this.isActive = false;

				this.$emit('toggle', this.isActive);
				this.$emit('hide', this.isActive);

				setTimeout(() => {
					this.hidden = true;
				}, this.delay);
			};

			if (this.clickable || this.disabled) {
				hide();
			} else {
				this.timeout = setTimeout(hide, this.hideDelay);
			}
		},
		getRefData(ref) {
			const el = this.$refs[ref];

			return el ? elData(el) : {};
		},
		initData() {
			Object.assign(this.activator, this.getRefData('activator'));
			Object.assign(this.tooltip, this.getRefData('tooltip'));
			Object.assign(this.window, this.getRefData('window'));
			Object.assign(this.arrow, this.getRefData('arrow'));
		},
		getTooltipPosition() {
			if (this.hidden) {
				return;
			}

			switch (this.currentPosition) {
				case 'top': {
					this.tooltip.left = this.activator.left + this.activator.width / 2 - this.window.width / 2;
					this.tooltip.top = this.activator.top - this.window.height;

					break;
				}
				case 'top-right': {
					this.tooltip.left = this.activator.left + this.margins;
					this.tooltip.top = this.activator.top - this.window.height;

					break;
				}
				case 'top-left': {
					this.tooltip.left = this.activator.left + this.activator.width - this.window.width + this.margins;
					this.tooltip.top = this.activator.top - this.window.height;

					break;
				}
				case 'bottom': {
					this.tooltip.left = this.activator.left + this.activator.width / 2 - this.window.width / 2;
					this.tooltip.top = this.activator.top + this.activator.height;

					break;
				}
				case 'bottom-right': {
					this.tooltip.left = this.activator.left - this.margins;
					this.tooltip.top = this.activator.top + this.activator.height;

					break;
				}
				case 'bottom-left': {
					this.tooltip.left = this.activator.left + this.activator.width - this.window.width + this.margins;
					this.tooltip.top = this.activator.top + this.activator.height;

					break;
				}
				case 'left': {
					this.tooltip.left = this.activator.left - this.window.width;
					this.tooltip.top = this.activator.top + this.activator.height / 2 - this.window.height / 2;

					break;
				}
				case 'right': {
					this.tooltip.left = this.activator.left + this.activator.width;
					this.tooltip.top = this.activator.top + this.activator.height / 2 - this.window.height / 2;

					break;
				}
			}

			this.tooltip.right = this.tooltip.left + this.tooltip.width - this.margins;
			this.tooltip.bottom = this.tooltip.top + this.tooltip.height;

			const { scrollLeft, scrollTop, scrollBottom } = getScrollData();

			// if (['left', 'right'].includes(this.currentPosition)) {
			// 	const heightFix = this.activator.height < 30 ? this.activator.height / 2 : 0;
			//
			// 	if (this.tooltip.top < scrollTop + this.margins) {
			// 		console.log('top');
			//
			// 		if (scrollTop < this.activator.top - this.margins - heightFix) {
			// 			this.tooltip.top = scrollTop + this.margins;
			// 		} else {
			// 			this.tooltip.top = this.activator.top - heightFix;
			// 		}
			// 	}
			//
			// 	if (this.tooltip.bottom > scrollBottom + this.margins) {
			// 		if (this.activator.top + this.activator.height + heightFix + this.margins < scrollTop + window.innerHeight) {
			// 			console.log(scrollBottom - this.tooltip.height + this.margins);
			//
			// 			this.tooltip.top = scrollBottom - this.tooltip.height + this.margins;
			// 		} else {
			// 			console.log('test');
			//
			// 			this.tooltip.top = this.activator.top + this.activator.height + heightFix - this.tooltip.height + this.margins * 2;
			// 		}
			// 	}
			// } else {
				if (this.tooltip.left < this.margins + scrollLeft) {
					this.tooltip.left = this.margins + scrollLeft;

					if (this.tooltip.left > this.activator.left + this.activator.width - this.margins * 2) {
						this.tooltip.left = this.activator.left + this.activator.width - this.margins * 2;
					}
				}

				if (this.tooltip.right > window.innerWidth + scrollLeft) {
					this.tooltip.left = window.innerWidth + scrollLeft - this.tooltip.width + this.margins;

					if (this.tooltip.left < this.activator.left - this.tooltip.width + this.margins * 4) {
						this.tooltip.left = this.activator.left - this.tooltip.width + this.margins * 4;
					}
				}
			// }
		},
		correctTooltipPosition() {
			if (!this.isActive) {
				return;
			}

			const { scrollLeft, scrollTop } = getScrollData();

			if (this.currentPosition === 'left' && this.positionsIsSame) {
				if (this.tooltip.left - this.margins * 2 < scrollLeft) {
					this.customPosition = 'top';

					this.calculatePosition();
				}
			}

			if (this.currentPosition === 'right' && this.positionsIsSame) {
				if (this.tooltip.left + this.tooltip.width > scrollLeft + window.innerWidth) {
					this.customPosition = 'top';

					this.calculatePosition();
				}
			}

			if (['top', 'top-right', 'top-left'].includes(this.currentPosition) && (this.positionsIsSame || ['left', 'right'].includes(this.position))) {
				if (this.tooltip.top - this.margins * 2 < scrollTop && scrollTop + window.innerHeight > this.activator.top + this.activator.height + this.tooltip.height) {
					this.customPosition = this.position.replace('top', 'bottom');

					this.calculatePosition();
				}
			}

			if (['bottom', 'bottom-right', 'bottom-left'].includes(this.currentPosition) && this.positionsIsSame) {
				if (this.tooltip.top + this.tooltip.height > scrollTop + window.innerHeight && scrollTop < this.activator.top - this.tooltip.height) {
					this.customPosition = this.position.replace('bottom', 'top');

					this.calculatePosition();
				}
			}

			if (!this.positionsIsSame) {
				if (this.position === 'right' && this.activator.left + this.activator.width + this.tooltip.width < scrollLeft + window.innerWidth) {
					this.customPosition = 'right';

					this.calculatePosition();
				}

				if (this.position === 'left' && this.activator.left - this.tooltip.width > scrollLeft) {
					this.customPosition = 'left';

					this.calculatePosition();
				}

				if (['bottom', 'bottom-right', 'bottom-left'].includes(this.currentPosition) && ['left', 'right'].includes(this.position) && scrollTop < this.activator.top - this.tooltip.height) {
					this.customPosition = this.position.replace('bottom', 'top');

					this.calculatePosition();
				}

				if (['top', 'top-right', 'top-left'].includes(this.position) && scrollTop < this.activator.top - this.tooltip.height) {
					this.customPosition = this.position.replace('bottom', 'top');

					this.calculatePosition();
				}

				if (['bottom', 'bottom-right', 'bottom-left'].includes(this.position) && scrollTop + window.innerHeight > this.activator.top + this.activator.height + this.tooltip.height) {
					this.customPosition = this.position.replace('top', 'bottom');

					this.calculatePosition();
				}
			}
		},
		getArrowPosition() {
			if (['left', 'right'].includes(this.currentPosition)) {
				const tooltipCenter = this.activator.top + this.activator.height / 2;
				const maxTop = this.window.height - this.arrow.height - this.margins;

				let position = (tooltipCenter - this.tooltip.top) - this.arrow.height / 2;

				position < this.margins ? position = this.margins : position > maxTop ? position = maxTop : null;

				this.arrow.top = position;
				this.arrow.left = null;
			} else {
				const tooltipCenter = this.activator.left + this.activator.width / 2;
				const maxLeft = this.window.width - this.arrow.width - this.margins;

				let position = (tooltipCenter - this.tooltip.left) - this.arrow.width / 2;

				position < this.margins ? position = this.margins : position > maxLeft ? position = maxLeft : null;

				this.arrow.top = null;
				this.arrow.left = position;
			}
		},
		calculatePosition() {
			if (this.hidden) {
				return;
			}

			this.initData();

			if (this.activator.el.offsetParent !== null && window.getComputedStyle(this.activator.el).visibility !== 'hidden') {
				this.getTooltipPosition();
				this.correctTooltipPosition();
				this.getArrowPosition();
			} else {
				this.hide();
			}
		},
		resizeHandler() {
			this.hide();

			if (this.windowWidth !== window.innerWidth) {
				this.calculatePosition();

				this.windowWidth = window.innerWidth;
			}
		},
		genTooltip() {
			return this.$createElement('div', {
				ref: 'tooltip',
				attrs: {
					'drophint-position': this.currentPosition
				},
				staticClass: CLASS_PREFIX,
				class: this.classes,
				style: this.styles,
				directives: this.directives,
				on: this.clickable ? {} : this.handlers
			}, [
				this.$createElement('div', {
					ref: 'window',
					staticClass: `${CLASS_PREFIX}__window`
				}, [
					this.genArrow(),
					this.genContent()
				])
			]);
		},
		genArrow() {
			return this.$createElement('span', {
				ref: 'arrow',
				staticClass: `${CLASS_PREFIX}__arrow`,
				style: this.arrowStyles
			});
		},
		genIndents(content) {
			return this.$createElement(uiTooltipIndents, {}, content);
		},
		genIndentsSlot() {
			if (!this.$slots.indents) {
				return null;
			}

			return this.genIndents(this.$slots.indents);
		},
		genTopSlot() {
			if (!this.$slots.top) {
				return null;
			}

			return this.genIndents(this.$slots.top);
		},
		genBottomSlot() {
			if (!this.$slots.bottom) {
				return null;
			}

			return this.genIndents(this.$slots.bottom);
		},
		genListSlot() {
			if (!this.$slots.list) {
				return null;
			}

			return this.$createElement('ul', { staticClass: `${CLASS_PREFIX}__list` }, this.$slots.list);
		},
		genContent() {
			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__content` }, [
				this.genTopSlot(),
				this.genListSlot(),
				this.genIndentsSlot(),
				this.$slots.default,
				this.genBottomSlot()
			]);
		}
	},
	render(h) {
		return h(this.tag, {
			ref: 'activator',
			attrs: {
				'data-drophint': JSON.stringify({
					trigger: this.clickable ? 'click' : 'hover',
					position: this.currentPosition,
					interactive: true
				})
			},
			class: {
				'active': this.isActive
			},
			on: this.handlers
		}, [
			this.$slots.activator,
			this.genTooltip()
		]);
	},
	mounted() {
		this.remount(this.$refs.tooltip);

		window.addEventListener('scroll', this.calculatePosition);
		window.addEventListener('resize', this.resizeHandler);

		if (this.opened) {
			this.show();
		}
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.calculatePosition);
		window.removeEventListener('resize', this.resizeHandler);

		this.unmount(this.$refs.tooltip);
	}
}
