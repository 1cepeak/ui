import Head from './mixins/head';
import Body from './mixins/body';

import uiTableHead from '../uiTableHead';
import uiTableHeadItem from '../uiTableHeadItem';
import uiTableBody from '../uiTableBody';
import uiTableRow from '../uiTableRow';
import uiTableCell from '../uiTableCell';

export const CLASS_PREFIX = 'ag-index-table';

/**
 * @todo: Отрефакторить. Переделать логику раскрытия вложенных строк.
 */
export default {
	name: 'ui-table',
	mixins: [
		Head,
		Body
	],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: Array,
			default: () => ([])
		},
		caption: String,
		description: String,
		withBorder: Boolean,
		childrenProp: {
			type: String,
			default: 'children'
		},
		selectable: Boolean
	},
	data() {
		return {
			leftShadow: false,
			rightShadow: true,
			expandableRows: []
		};
	},
	computed: {
		hasSelectAll() {
			return this.value.length === this.items.length;
		},
		hasLeftStickyColumns() {
			return !!this.columns.find((row) => row.sticky === 'left') || this.selectable;
		},
		hasRightStickyColumns() {
			return !!this.columns.find((row) => row.sticky === 'right');
		},
		hasStickyColumns() {
			return this.hasLeftStickyColumns || this.hasRightStickyColumns;
		},
		classes() {
			return {
				[CLASS_PREFIX]: true,
				'-scrollable': true,
				'-bordered': this.withBorder
			};
		},
		rows() {

		}
	},
	methods: {
		toggleSelectAll() {
			const value = this.hasSelectAll ? [] : this.items.map((row) => row[this.itemKey] || null).filter((row) => row !== null);

			this.$emit('change', value);
		},
		hasTag(elements, tag) {
			return Array.isArray(elements) && elements.find((row) => row.tag === tag);
		},
		genTR(children = [], data = {}) {
			return this.$createElement('tr', data, children);
		},
		genCaption () {
			const caption = this.caption || this.$slots.caption || null;

			if (!caption) {
				return null;
			}

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__caption` }, [caption]);
		},
		genDescription () {
			const description = this.description || this.$slots.description || null;

			if (!description) {
				return null;
			}

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__desc` }, [description]);
		},
		genTable () {
			if (this.$slots.table) {
				return this.$slots.table;
			}

			const makeTable = (position = null) => {
				let style = {};

				if ((position === 'left' && !this.leftShadow) || (position === 'right' && !this.rightShadow)) {
					style['box-shadow'] = 'none';
				}

				return this.$createElement('table', {
					style,
					class: {
						'-fixed-left': position === 'left',
						'-fixed-right': position === 'right'
					},
					attrs: {
						cellpadding: 0,
						cellspacing: 0
					}
				}, [
					this.genTableHead(position),
					this.genTableBody(position),
					this.$slots.footer
				]);
			};

			const wrapper = this.$createElement('div', {
				staticClass: `${CLASS_PREFIX}__wrapper`,
				on: {
					scroll: ({ target }) => {
						const table = target.querySelector('table');

						this.leftShadow = target.scrollLeft > 0;
						this.rightShadow = !(target.scrollLeft === table.clientWidth - target.clientWidth);
					}
				}
			}, [
				makeTable()
			]);

			if (this.hasStickyColumns) {
				return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__fixer` }, [
					wrapper,
					this.hasLeftStickyColumns ? makeTable('left') : null,
					this.hasRightStickyColumns ? makeTable('right') : null
				]);
			}

			return wrapper;
		},
		genTableHead (position = null) {
			if (this.columns.length === 0) {
				return null;
			}

			let columns = this.columns;

			if (['left', 'right'].includes(position)) {
				columns = this.columns.filter((row) => row.sticky === position);
			} else {
				columns = [].concat(
					this.columns.filter((row) => row.sticky === 'left'),
					this.columns.filter((row) => !row.sticky),
					this.columns.filter((row) => row.sticky === 'right'),
				);
			}

			return this.$createElement(uiTableHead, columns.map((column) => {
				let props = {};
				let allowed = ['width', 'minWidth', 'align', 'sortable', 'classes'];

				Object.keys(column).forEach((key) => {
					if (allowed.includes(key)) {
						props[key] = column[key];
					}
				});

				return this.$createElement(uiTableHeadItem, { props }, [column.title]);
			}));
		},
		genTableBody (position = null) {
			let columns = [];

			if (['left', 'right'].includes(position)) {
				columns = this.columns.filter((row) => row.sticky === position);
			} else {
				columns = [].concat(
					this.columns.filter((row) => row.sticky === 'left'),
					this.columns.filter((row) => !row.sticky),
					this.columns.filter((row) => row.sticky === 'right'),
				);
			}

			return this.$createElement(uiTableBody, this.items.map((item, index) => {
				const expand = this.$scopedSlots.expanded || (() => ([]));
				const data = expand({ item, id: index });

				let expandedData = data;

				if (position && Array.isArray(data) && data.length > 0) {
					expandedData = [];

					data.forEach(() => {
						expandedData.push(this.$createElement('tr', { staticClass: '-unpacked' }, [
							this.$createElement('td')
						]))
					});
				}

				return [
					this.$createElement(uiTableRow, columns.map((column) => {
						const scope = this.$scopedSlots[column.key] || null;
						const value = item[column.key];

						let content = null;

						if (typeof scope === 'function') {
							content = scope({ item, value, id: index });
						} else {
							content = value === null || value === void(0) ? '' : value;
						}

						return this.$createElement(uiTableCell, {
							props: {
								classes: column.rowClasses
							}
						}, [content]);
					})),
					expandedData
				];
			}));
		},
	},
	render (h) {
		return h('div', { class: this.classes }, [
			this.genCaption(),
			this.genDescription(),
			this.genTable()
		]);
	}
}
