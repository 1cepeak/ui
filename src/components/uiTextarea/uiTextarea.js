import Stateable from '../../mixins/stateable';
import Labelable from '../../mixins/labelable';
import Inputable from '../../mixins/inputable';
import { factory as SizeFactory } from '../../mixins/sizeable';
import { provide as RegistrableProvide } from '../../mixins/registrable';

import uiFormField from '../uiFormField';

export const CLASS_PREFIX = 'ag-textarea';

export default {
	name: 'ui-textarea',
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		rows: {
			type: [Number, String],
			default: 3
		}
	},
	mixins: [
		Stateable,
		Labelable,
		Inputable,
		SizeFactory(CLASS_PREFIX),
		RegistrableProvide('errorInput')
	],
	components: {
		uiFormField,
	},
	computed: {
		classes() {
			return Object.assign({ [CLASS_PREFIX]: true }, this.stateClasses, this.sizeClasses);
		}
	},
	methods: {
		register() {},
		unregister() {},
		genContent() {
			return [
				this.genLabelSlot(),
				this.$createElement('div', { class: this.classes }, [
					this.genInput()
				]),
				this.genErrorSlot()
			].filter((row) => row !== null);
		},
		genInput() {
			return this.$createElement('textarea', Object.assign({
				ref: 'input',
				attrs: this.inputAttributes,
				domProps: {
					value: this.value,
					rows: this.rows
				}
			}, this.inputHandlers));
		}
	},
	render(h) {
		const content = this.genContent();

		if (content.length === 1) {
			return content[0];
		}

		return h(this.tag, content);
	}

}
