import Inputable from '../../mixins/inputable';
import Stateable from '../../mixins/stateable';
import { factory as SizeFactory } from '../../mixins/sizeable';

import uiInput from '../uiInput';
import { CLASS_PREFIX } from "../uiInput/uiInput";

export default {
	name: 'ui-input-password',
	mixins: [
		Stateable,
		Inputable,
		SizeFactory(CLASS_PREFIX)
	],
	data () {
		return {
			icon: {
				hide: 'field-hide',
				show: 'field-show'
			},
			passwordHidden: true
		};
	},
	computed: {
		inputType() {
			return this.passwordHidden ? 'password' : this.type;
		},
		inputIcon () {
			return this.passwordHidden ? this.icon.show : this.icon.hide;
		},
		clearedProps () {
			let props = Object.assign({}, this.$props);

			const propsForDelete = ['type', 'appendIcon', 'appendCb'];

			propsForDelete.forEach((prop) => {
				delete props[prop];
			});

			return Object.assign({}, props, {
				type: this.inputType,
				appendIcon: this.inputIcon,
				appendCb: this.passwordToggle
			});
		}
	},
	methods: {
		passwordToggle() {
			if (this.disabled) {
				return;
			}

			this.passwordHidden = !this.passwordHidden;
		}
	},
	render(h) {
		return h(uiInput, Object.assign({
			ref: 'input',
			props: this.clearedProps
		}, this.inputHandlers), this.$slots.default);
	}
}
