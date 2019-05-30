import Stateable from '../../mixins/stateable';
import Formable from '../../mixins/formable';
import { factory as SizeFactory } from '../../mixins/sizeable';
import { inject as RegistrableInject } from '../../mixins/registrable';

// import uiFormField from '../uiFormField';

import { consoleError } from '../../utils/console';

const CLASS_PREFIX = 'ag-checkbox';

export const MODEL_EVENT = 'input';

export default {
	name: 'ui-checkbox',
	mixins: [
		Stateable,
		Formable,
		SizeFactory(CLASS_PREFIX),
		RegistrableInject('checkboxGroup')
	],
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		value: [Number, Boolean, String],
		name: String,
		terms: Boolean
	},
	data: () => ({
		isActive: false
	}),
	computed: {
		classes() {
			return Object.assign({ [CLASS_PREFIX]: true }, this.stateClasses, this.sizeClasses);
		}
	},
	methods: {
		genLabel() {
			let prefix = `${CLASS_PREFIX}__label`;

			return this.$createElement('span', {
				class: {
					[prefix]: true,
					[`${prefix}--terms`]: this.terms
				}
			}, [this.$slots.default]);
		},
		genMarker() {
			return this.$createElement('span', { class: `${CLASS_PREFIX}__marker` });
		},
		genInput() {
			let attributes = {
				type: 'checkbox'
			};

			if (this.name) {
				attributes['name'] = this.name;
			}

			return this.$createElement('input', {
				class: {
					hover: this.hovered
				},
				attrs: attributes,
				domProps: {
					checked: this.checkboxGroup ? this.isActive : Boolean(this.value),
					disabled: this.disabled
				},
				on: {
					change: (e) => this.$emit(MODEL_EVENT, this.checkboxGroup ? this.value : e.target.checked)
				}
			});
		},
		genCheckbox() {
			return this.$createElement('label', { class: this.classes }, [
				this.genInput(),
				this.$createElement('span', {
					class: `${CLASS_PREFIX}__view`,
					on: {
						click: (e) => this.$emit('click', e)
					}
				}, [
					this.genMarker(),
					this.genLabel()
				])
			]);
		},
	},
	mounted() {
		if (this.checkboxGroup) {
			this.checkboxGroup.register(this);
		} else if (typeof this.value === 'string') {
			consoleError('The "value" property can be type of string only when component is in checkbox group', this);
		}
	},
	beforeDestroy() {
		if (this.checkboxGroup) {
			this.checkboxGroup.unregister(this);
		}
	},
	render() {
		return this.genWrapper([
			this.genCheckbox(),
			this.genErrorSlot()
		], this.tag, { props: { small: !!this.checkboxGroup } });
	}
}
