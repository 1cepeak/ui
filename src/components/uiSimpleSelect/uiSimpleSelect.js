import Mountable from '../../mixins/mountable';
import Selectable from '../../mixins/selectable';

import uiTooltip from '../uiTooltip';
import uiIcon from '../uiIcon';
// import uiRadioGroup from '../uiRadioGroup';
// import uiRadio from '../uiRadio';
// import uiCheckbox from '../uiCheckbox';

// @todo Объединить этот компонент с uiSelect

export default {
	name: 'ui-simple-select',
	mixins: [
		Mountable,
		Selectable
	],
	props: {
		placeholder: {
			type: String,
			default: 'Выберите вариант'
		},
		lowerCase: Boolean,
		light: Boolean,
		useComponents: Boolean
	},
	data: () => ({
		isActive: false
	}),
	computed: {
		caption() {
			return this.selected.length > 0 ? this.selected.join(', ') : this.placeholder;
		},
		selected() {
			return this.options.filter((item) => {
				item = this.getItemValue(item);

				return this.multiple ? this.value.includes(item) : this.value == item;
			}).map((item) => this.getItemLabel(item));
		},
	},
	methods: {
		select(item) {
			if (this.disabled || this.getItemDisabled(item)) {
				return;
			}

			const itemValue = this.getItemValue(item);
			const value = this.multiple ? [].concat(this.value).push(itemValue) : itemValue;

			this.$emit('input', value);
			this.$emit('change', value);
			this.$emit('select', itemValue);

			this.isActive = false;
		},
		genCaption() {
			return this.$createElement('a', {
				slot: 'activator',
				attrs: {
					href: 'javascript:void(0);'
				},
				nativeOn: {
					click: (e) => e.preventDefault()
				}
			}, [
				this.$createElement('span', {
					style: {
						'margin-right': '0.2em'
					}
				}, [this.caption]),
				this.$createElement(uiIcon, {
					props: {
						name: 'arrowhead',
						rotate: this.isActive ? 270 : 90,
					},
					style: {
						'font-size': '0.8em'
					}
				})
			]);
		},
		genList() {
			// @todo Добавить возможность выводить элементы списка как радио-кнопки или чекбоксы
			// const genItem = (item) => {
			// 	const name = this.getItemLabel(item);
			// 	const value = this.getItemValue(item);
			//
			// 	if (this.useComponents) {
			// 		return this.$createElement(this.multiple ? uiCheckbox : uiRadio, {
			//
			// 		})
			// 	}
			// };

			return [].concat(this.options).map((item) => this.$createElement('li', {
				slot: 'list',
				on: {
					click: (e) => {
						e.preventDefault();

						this.select(item);
					}
				}
			}, [
				this.$createElement('a', { staticClass: '-cursor-pointer' }, this.getItemLabel(item))
			]));
		},
	},
	render(h) {
		return h(uiTooltip, {
			props: {
				opened: this.isActive,
				clickable: true,
				dark: !this.light
			},
			on: {
				toggle: (value) => this.isActive = value
			}
		}, [
			this.genCaption(),
			this.genList()
		]);
	}
}
