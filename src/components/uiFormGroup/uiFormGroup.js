import Formable from '../../mixins/formable';
import { provide as RegistrableProvide, inject as RegistrableInject } from '../../mixins/registrable';

export const CLASS_PREFIX = 'ag-group';
export const ITEM_CLASS = `${CLASS_PREFIX}__item`;

export default {
	name: 'ui-form-group',
	mixins: [
		Formable,
		RegistrableProvide('formGroup'),
		RegistrableInject('form')
	],
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		join: Boolean,
		stretch: Boolean,
		gutters: [Number, String]
	},
	computed: {
		classes() {
			return {
				[CLASS_PREFIX]: true,
				[`${CLASS_PREFIX}--join`]: this.join,
				[`${CLASS_PREFIX}--stretch`]: this.stretch,
				[`-gutters-${this.gutters}`]: typeof this.gutters !== 'undefined' && !isNaN(parseInt(this.gutters))
			};
		}
	},
	methods: {
		register(child) {},
		unregister(child) {}
	},
	render(h) {
		return this.genWrapper([
			h(this.tag, { class: this.classes }, this.$slots.default)
		]);
	}
}
