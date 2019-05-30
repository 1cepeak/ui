import uiButton from '../uiButton';
import uiIcon from '../uiIcon';

import { consoleError } from '../../utils/console';

export const CLASS_PREFIX = 'ag-pagination';

export default {
	name: 'ui-pagination',
	model: {
		prop: 'page',
		event: 'change'
	},
	props: {
		/**
		 * Текущая страница
		 * @param {number}
		 */
		page: {
			type: Number,
			default: 1
		},
		/**
		 * Последняя страница
		 * @param {number}
		 */
		last: {
			type: Number,
			default: 1
		},
		/**
		 * Кол-во показываемых страниц
		 * @param {number}
		 */
		count: {
			type: Number,
			default: 5
		},
		/**
		 * Простой режим
		 * @param {boolean}
		 */
		simple: Boolean,
		/**
		 * Показывать кнопку "показать ещё" или нет
		 * @param {boolean}
		 */
		more: Boolean,
		/**
		 * Текст кнопки "показать ещё"
		 * @param {string}
		 */
		moreCaption: {
			type: String,
			default: 'Показать ещё'
		}
	},
	computed: {
		pageOffset() {
			return Math.floor(this.count / 2);
		},
		leftOffset() {
			return this.page - this.pageOffset;
		},
		rightOffset() {
			return this.page + this.pageOffset;
		},
		startPage() {
			if (this.rightOffset >= this.last && this.last > this.count) {
				return this.last - this.count + 1;
			}

			return this.leftOffset <= 0 ? 1 : this.leftOffset;
		},
		endPage() {
			if (this.leftOffset <= 0 && this.last > this.count) {
				return this.count;
			}

			return this.rightOffset >= this.last ? this.last : this.rightOffset;
		},
		hasFirstButton() {
			return this.leftOffset - 1 > 0;
		},
		hasLastButton() {
			return this.rightOffset < this.last;
		}
	},
	methods: {
		pageChangeHandler(page) {
			this.$emit('change', page);
		},
		genMoreButton() {
			if (!this.more || this.page === this.last) {
				return null;
			}

			const content = this.$slots.more || this.moreCaption;

			return this.$createElement(uiButton, {
				staticClass: `${CLASS_PREFIX}__more`,
				props: {
					small: true,
					wide: true
				},
				on: {
					click: (e) => this.$emit('more', e)
				}
			}, [content]);
		},
		genPages() {
			if (this.simple) {
				return null;
			}

			let content = [];

			if (this.hasFirstButton) {
				content.push(this.genFirstPageButton(), this.genSeparator());
			}

			for (let i = this.startPage; i <= this.endPage; i++) {
				content.push(this.genPageButton(i));
			}

			if (this.hasLastButton) {
				content.push(this.genSeparator(), this.genLastPageButton());
			}

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__pages` }, content);
		},
		genPageButton(page) {
			return this.$createElement(uiButton, {
				class: {
					'-pagination': true,
					'-selected': this.page === page
				},
				props: {
					small: true
				},
				on: {
					click: this.pageChangeHandler.bind(this, page)
				}
			}, [page]);
		},
		genSeparator() {
			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__ellipsis` });
		},
		genFirstPageButton() {
			return this.genPageButton(1);
		},
		genLastPageButton() {
			return this.genPageButton(this.last);
		},
		genNavigation() {
			return [
				this.genPrevButton(),
				this.genNextButton()
			];
		},
		genNavigationButton(direction) {
			const value = direction === 'prev' ? this.page - 1 : this.page + 1;

			return this.$createElement(uiButton, {
				staticClass: `${CLASS_PREFIX}__rewind -wide`,
				props: {
					small: true
				},
				on: {
					click: this.pageChangeHandler.bind(this, value)
				}
			}, [
				this.$createElement(uiIcon, {
					props: {
						name: 'arrowhead',
						rotate: direction === 'prev' ? 180 : 0
					}
				})
			])
		},
		genPrevButton() {
			if (this.page === 1) {
				return null;
			}

			return this.genNavigationButton('prev');
		},
		genNextButton() {
			if (this.page === this.last) {
				return null;
			}

			return this.genNavigationButton('next');
		}
	},
	created() {
		if (this.page < 1) {
			consoleError('The property "page" must be greater then 0', this);
		}
	},
	render(h) {
		if (this.last <= 1) {
			return null;
		}

		return h('div', { staticClass: CLASS_PREFIX }, [
			this.genMoreButton(),
			this.genPages(),
			this.genNavigation()
		]);
	}
}
