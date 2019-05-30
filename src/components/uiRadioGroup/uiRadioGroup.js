import ButtonGroup from '../../mixins/button-group';
import Formable from '../../mixins/formable';

export const CLASS_PREFIX = 'ag-radio-group';

export default {
	name: 'ui-radio-group',
	mixins: [
		ButtonGroup,
		Formable
	],
	model: {
		prop: 'inputValue',
		event: 'change'
	},
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		inputValue: {
			required: false
		},
		horizontal: Boolean,
		noField: Boolean
	},
	watch: {
		inputValue: {
			handler() {
				this.update();
			},
			deep: true
		}
	},
	methods: {
		isSelected(i) {
			return this.inputValue === this.getValue(i);
		},
		updateValue(i) {
			return this.$emit('change', this.getValue(i));
		},
		beforeRegister(child) {
			child.disableField = this.noField;
		}
	},
	render(h) {
		return this.genWrapper([
			h(this.tag, { staticClass: CLASS_PREFIX }, this.$slots.default)
		]);
	}
}
