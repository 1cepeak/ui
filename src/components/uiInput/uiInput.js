import Stateable from '../../mixins/stateable';
import Labelable from '../../mixins/labelable';
import Inputable from '../../mixins/inputable';
import { factory as SizeFactory, SIZE_STRETCH_CLASS } from '../../mixins/sizeable';
import { factory as IconFactory } from '../../mixins/iconable';
import { inject as RegistrableInject } from '../../mixins/registrable';

import uiIcon from '../uiIcon';

import { ITEM_CLASS } from '../uiFormGroup/uiFormGroup';

export const CLASS_PREFIX = 'ag-input';

export default {
	name: 'ui-input',
	mixins: [
		Stateable,
		Labelable,
		Inputable,
		SizeFactory(CLASS_PREFIX),
		IconFactory(CLASS_PREFIX),
		RegistrableInject('formGroup')
	],
	data: () => ({
		useHash: true
	}),
	computed: {
		classes () {
			return Object.assign({
				[CLASS_PREFIX]: true,
				[ITEM_CLASS]: !!this.formGroup
			}, this.stateClasses, this.sizeClasses);
		},
		mountElementAttributes() {
			return {
				classes: {
					[SIZE_STRETCH_CLASS]: this.stretch
				}
			};
		}
	},
	methods: {
		register() {},
		unregister() {},
		genContent() {
			return this.$createElement('div', { class: this.classes }, [
				this.genInput(),
				this.genPrependSlot(),
				this.genClearIcon(),
				this.genAppendSlot(),
				this.$slots.dropdown
			]);
		},
		genInput() {
			return this.$createElement('input', Object.assign({
				ref: 'input',
				attrs: Object.assign({
					id: this.hasLabel ? this.hash : undefined
				}, this.inputAttributes),
				domProps: {
					value: this.value
				}
			}, this.inputHandlers));
		},
		genClearIcon() {
			if (!this.clearable) {
				return null;
			}

			const classPrefix = `${CLASS_PREFIX}__icon`;

			return this.$createElement('div', {
				class: {
					[classPrefix]: true,
					[`${classPrefix}--right`]: true,
					[`${classPrefix}--button`]: true,
					hide: this.value.length === 0
				}
			}, [
				this.$createElement(uiIcon, {
					props: {
						name: 'cross',
						small: true
					},
					on: {
						click: this.clearHandler
					},
					nativeOn: {
						click: this.clearHandler
					}
				})
			]);
		}
	},
	mounted() {
		if (this.formGroup) {
			this.formGroup.register(this);
		}
	},
	beforeDestroy() {
		if (this.formGroup) {
			this.formGroup.unregister(this);
		}
	},
	render() {
		return this.genWrapper([
			this.genLabelSlot(),
			this.genContent(),
			this.genErrorSlot()
		]);
	}
}
