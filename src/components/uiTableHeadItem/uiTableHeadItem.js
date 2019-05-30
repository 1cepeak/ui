import uiIcon from '../uiIcon';

export default {
	name: 'ui-table-head-item',
	model: {
		prop: 'sortDirection',
		event: 'sort'
	},
	props: {
		width: String,
		minWidth: String,
		align: {
			type: String,
			default: 'left'
		},
		sortable: Boolean,
		sortDirection: String,
		classes: String
	},
	computed: {
		styles() {
			let result = {};

			if (this.width) {
				result['width'] = this.width;
			}

			if (this.minWidth) {
				result['min-width'] = this.minWidth;
			}

			if (this.align && ['left', 'right', 'center'].includes(this.align)) {
				result['text-align'] = this.align;
			}

			return result;
		},
		handlers() {
			return {
				on: {
					click: this.clickHandler.bind(this)
				}
			};
		}
	},
	methods: {
		clickHandler() {
			if (!this.sortable) {
				return;
			}

			if (!this.sortDirection) {
				this.$emit('sort', 'asc');
			} else if (this.sortDirection === 'asc') {
				this.$emit('sort', 'desc');
			} else {
				this.$emit('sort', undefined);
			}
		},
		genContent() {
			if (!this.sortable) {
				return [this.$slots.default];
			}

			let name = 'sort-desc';
			let rotate = undefined;

			if (!this.sortDirection) {
				name = 'sort';
			} else if (this.sortDirection === 'asc') {
				rotate = 180;
			}

			return [
				this.$createElement('span', {}, [this.$slots.default]),
				this.$createElement(uiIcon, { props: { name, rotate } })
			];
		}
	},
	render(h) {
		return h('th', Object.assign({ staticClass: this.classes, style: this.styles }, this.handlers), this.genContent());
	}
}
