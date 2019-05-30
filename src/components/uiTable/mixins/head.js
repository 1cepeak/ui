import uiCheckbox from '../../uiCheckbox';
// import uiIcon from '../../uiIcon';
// import uiTooltip from '../../uiTooltip';

export default {
	props: {
		/**
		 * Массив колонок таблицы
		 * @param {array}
		 */
		columns: {
			type: Array,
			default: () => ([])
		},
		/**
		 * Флаг скрывающий шапку таблицы
		 * @param {boolean}
		 */
		hideHeader: Boolean
	},
	computed: {
		leftColumns() {
			return this.columns.filter((row) => row.sticky === 'left');
		},
		rightColumns() {
			return this.columns.filter((row) => row.sticky === 'right');
		}
	},
	methods: {
		genHead() {
			if (this.hideHeader) {
				return;
			}

			let content = [];

			if (this.$scopedSlots.header) {
				const row = this.$scopedSlots.header({ columns: this.columns });

				content.push(this.hasTag(row, 'th') ? this.genTR(row) : row);
			} else {
				const row = this.columns.map((col) => this.genColumn(col));

				if (this.selectable) {
					const checkbox = this.$createElement(uiCheckbox, {
						props: {
							value: this.hasSelectAll,
							small: true
						},
						on: {
							input: this.toggleSelectAll
						}
					});

					row.unshift(this.$createElement('th', [checkbox]));
				}

				content.push(this.genTR(row));
			}

			return this.$createElement('thead', content);
		},
		genColumn(column) {
			const scope = this.$scopedSlots.column || null;

			let content = [];

			if (typeof scope === 'function') {
				content.push(scope(column));
			} else {
				content.push(this.$createElement('th', {
					key,
					attrs: {
						width: column.width || null,
						align: column.align || null
					},
					style: column.styles || {},
					class: column.classes || {}
				}, [column.title]));
			}

			return content;
		}
	}
};
