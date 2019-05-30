import Stateable from '../../mixins/stateable';
import { factory as SizeFactory } from '../../mixins/sizeable';
import { factory as ToggleFactory } from '../../mixins/toggleable';
import { inject as RegistrableInject } from '../../mixins/registrable';

import uiFormField from '../uiFormField';

const CLASS_PREFIX = 'ag-radio';

export default {
	name: 'ui-radio',
	mixins: [
		Stateable,
		SizeFactory(CLASS_PREFIX),
		ToggleFactory('inputValue'),
		RegistrableInject('buttonGroup')
	],
	props: {
		value: [String, Number, Boolean],
		name: String
	},
	data: () => ({
		disableField: false
	}),
	computed: {
		classes() {
			return Object.assign({
				[CLASS_PREFIX]: true
			}, this.stateClasses, this.sizeClasses);
		}
	},
	methods: {
		genLabel() {
			return this.$createElement('span', { class: `${CLASS_PREFIX}__label` }, [this.$slots.default]);
		},
		genMarker() {
			return this.$createElement('span', { class: `${CLASS_PREFIX}__marker` }, []);
		},
		genInput() {
			let attributes = {
				type: 'radio'
			};

			if (this.name) {
				attributes['name'] = this.name;
			}

			return this.$createElement('input', {
				class: this.stateClasses,
				attrs: attributes,
				domProps: {
					checked: this.isActive
				}
			});
		},
		genRadio() {
			return this.$createElement('label', {
				class: this.classes,
				on: {
					click: (e) => {
						if (this.disabled) {
							e.preventDefault();

							return;
						}

						this.$emit('click', e);
					}
				}
			}, [
				this.genInput(),
				this.$createElement('span', { class: `${CLASS_PREFIX}__view` }, [
					this.genMarker(),
					this.genLabel()
				])
			]);
		}
	},
	mounted() {
		if (this.buttonGroup) {
			this.buttonGroup.register(this);
		}
	},
	beforeDestroy() {
		if (this.buttonGroup) {
			this.buttonGroup.unregister(this);
		}
	},
	render(h) {
		if (this.disableField) {
			return this.genRadio();
		}

		return h(uiFormField, {
			props: {
				small: true
			}
		}, [
			this.genRadio(),
			this.genErrorSlot()
		].filter((row) => !!row));
	}
}
