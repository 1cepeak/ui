import { consoleError } from "../../utils/console";

import Selectable from '../../mixins/selectable';

import uiMenuItem from '../uiMenuItem';

export default {
	name: 'ui-menu',
	mixins: [
		Selectable
	],
	components: {
		uiMenuItem
	},
	methods: {
		genItem(item) {
			return this.$createElement(uiMenuItem, {
				props: {
					value: this.getItemValue(item),
					label: this.getItemLabel(item),
					hint: this.getItemHint(item),
					disabled: this.getItemDisabled(item),
					selected: this.isSelected(item),
					mandatory: this.mandatory
				},
				on: {
					select: this.selectItem.bind(this, item),
					remove: this.removeItem.bind(this, item)
				}
			});
		},
		isSelected(item) {
			let itemValue = this.getItemValue(item);

			if (this.multiple) {
				return this.value.includes(itemValue);
			}

			return this.value === itemValue;
		},
		selectItem(item) {
			let value = this.getItemValue(item);

			if (this.multiple) {
				value = [].concat(this.value, [value]);
			}

			this.$emit('select', item);
			this.$emit('input', value);
		},
		removeItem (item) {
			let value = null;

			if (this.multiple) {
				value = [].concat(this.value).filter(row => row != this.getItemValue(item));
			}

			this.$emit('remove', item);
			this.$emit('input', value);
		},
	},
	mounted () {
		if (this.multiple && !Array.isArray(this.value)) {
			consoleError('The value prop must be type of array when the multiple prop is true');
		}
	},
	render (h) {
		return h('ul', {}, this.options.map(this.genItem));
	}
}
