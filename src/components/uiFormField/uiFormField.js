import { CLASS_PREFIX } from '../uiForm/uiForm';

export default {
	name: 'ui-form-field',
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		small: Boolean,
		centered: Boolean
	},
	computed: {
		classes() {
			const prefix = `${CLASS_PREFIX}__field`;

			return {
				[prefix]: true,
				[`${prefix}--small`]: this.small,
				[`${prefix}--centered`]: this.centered
			};
		}
	},
	render(h) {
		return h(this.tag, { class: this.classes }, this.$slots.default);
	}
}
