import { provide as RegistrableProvide } from '../../mixins/registrable';

export const CLASS_PREFIX = 'ag-form';

export default {
	name: 'ui-form',
	mixins: [
		RegistrableProvide('form')
	],
	props: {
		tag: {
			type: String,
			default: 'div'
		}
	},
	data: () => ({
		fields: [],
		isDestroying: false
	}),
	methods: {
		register(field) {
			field.isInField = !field.formGroup && !field.radioGroup && !field.buttonGroup;

			this.fields.push(field);
		},
		unregister(field) {
			if (this.isDestroying) {
				const index = this.fields.indexOf(field);

				if (index > -1) {
					this.fields.splice(index, 1);
				}
			}
		}
	},
	beforeDestroy() {
		this.isDestroying = true;
	},
	render(h) {
		return h(this.tag, { staticClass: CLASS_PREFIX }, this.$slots.default);
	}
}
