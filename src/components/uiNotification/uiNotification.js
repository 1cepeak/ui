import uiIcon from '../uiIcon';

export const CLASS_PREFIX = 'ag-notify';

export default {
	name: 'ui-notification',
	props: {
		/**
		 * Заголовок
		 */
		title: String,
		/**
		 * Тонкий
		 */
		thin: Boolean,
		/**
		 * Большой
		 */
		large: Boolean,
		/**
		 * С обводкой
		 */
		outline: Boolean,
		/**
		 * Линия слева
		 */
		leftLine: Boolean,

		alert: Boolean,
		notice: Boolean,
		warning: Boolean,
		success: Boolean,
		info: Boolean,
		interactive: Boolean,
		light: Boolean,
		stretch: Boolean,
		closeable: Boolean,
		icon: String
	},
	computed: {
		classes () {
			return {
				'-thin': this.thin,
				'-interactive': this.closeable || this.interactive,
				'-narrow': this.large,
				'-outline': this.outline,
				'-leftline': this.leftLine,
				'-alert': this.alert,
				'-notice': this.notice,
				'-warning': this.warning,
				'-success': this.success,
				'-info': this.info,
				'-light': this.light,
				'-stretch': this.stretch
			};
		},
		handlers () {
			return {
				on: {
					click: this.clickHandler
				}
			};
		},
		hasTitle() {
			return !!(this.$slots.title || this.title);
		}
	},
	methods: {
		clickHandler(e) {
			this.$emit('remove', e);
		},
		genActionsSlot() {
			if (!this.$slots['actions']) {
				return null;
			}

			let content = this.$slots['actions'].filter(node => node.tag).map(node => {
				return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__action` }, [node]);
			});

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__content` }, [
				this.$createElement('div', { staticClass: `${CLASS_PREFIX}__actions` }, content)
			]);
		},
		genContent() {
			let content = [this.genCaption()];

			if (this.hasTitle) {
				content.push(this.genText());
			}

			return content;
		},
		genCaption() {
			let content = this.genTitleSlot();

			if (!content) {
				content = this.genText();
			}

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__caption` }, [
				this.genIconSlot(),
				content,
				this.genRightActionSlot(),
				this.genClose(),
			]);
		},
		genTitleSlot() {
			const title = this.$slots.title || this.title;

			if (!title) {
				return null;
			}

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__title` }, [title]);
		},
		genClose() {
			if (!this.closeable) {
				return null;
			}

			return this.$createElement('span', { staticClass: `${CLASS_PREFIX}__close` }, [
				this.$createElement(uiIcon, Object.assign({
					props: {
						name: 'cross'
					}
				}, this.handlers))
			]);
		},
		genIcon() {
			return this.$createElement(uiIcon, { props: { name: this.icon } });
		},
		genIconSlot() {
			if (this.$slots.icon) {
				return this.$slots.icon;
			} else if (this.icon) {
				return this.genIcon();
			}

			return null;
		},
		genRightActionSlot() {
			const action = this.$slots.rightAction || this.$slots.leftAction /** @deprecated */;

			if (!action) {
				return null;
			}

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__left-action` }, action);
		},
		genText() {
			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__text` }, this.$slots.default);
		}
	},
	render(h) {
		return h('div', { staticClass: CLASS_PREFIX, class: this.classes }, [
			this.genActionsSlot(),
			this.genContent()
		]);
	}
}
