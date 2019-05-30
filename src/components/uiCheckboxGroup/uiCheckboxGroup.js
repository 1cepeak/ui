import Formable from '../../mixins/formable';
import { provide as RegistrableProvide } from '../../mixins/registrable';

import { MODEL_EVENT } from '../uiCheckbox/uiCheckbox';

export default {
	name: 'ui-checkbox-group',
	model: {
		prop: 'value',
		event: 'change'
	},
	mixins: [
		Formable,
		RegistrableProvide('checkboxGroup')
	],
	props: {
		value: {
			type: Array,
			required: false,
			default: () => ([])
		},
		tag: {
			type: String,
			default: 'div'
		}
	},
	data: () => ({
		checkboxes: [],
		listeners: [],
		isDestroying: false
	}),
	watch: {
		value: {
			handler() {
				this.update();
			},
			deep: true
		},
		checkboxes: 'update'
	},
	methods: {
		getValue(i) {
			return this.checkboxes[i].value;
		},
		update() {
			this.checkboxes.map((row, index) => {
				row.isActive = this.isSelected(index);

				return row;
			});
		},
		register(checkbox) {
			const index = this.checkboxes.length;

			this.checkboxes.push(checkbox);
			this.listeners.push(this.updateValue.bind(this, index));

			checkbox.$on(MODEL_EVENT, this.listeners[index]);
		},
		unregister(checkbox) {
			if (this.isDestroying) {
				const index = this.checkboxes.indexOf(checkbox);

				if (index === -1) {
					checkbox.$off(MODEL_EVENT, this.listeners[index]);
				}
			}
		},
		isSelected(i) {
			return this.value.includes(this.getValue(i));
		},
		updateValue(i) {
			const item = this.getValue(i);
			const items = this.value.slice();
			const index = items.indexOf(item);

			if (index > -1) {
				items.length >= 1 && items.splice(index, 1);
			} else {
				items.push(item);
			}

			this.$emit('change', items);
		}
	},
	mounted() {
		this.update();
	},
	beforeDestroy() {
		this.isDestroying = true;
	},
	render(h) {
		return this.genWrapper([
			h(this.tag, { staticClass: 'ag-checkbox-group' }, this.$slots.default)
		]);
	}
}
