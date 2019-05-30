import { inject as RegistrableInject } from '../../mixins/registrable';

export default {
	name: 'ui-error',
	mixins: [
		RegistrableInject('errorInput')
	],
	props: {
		tag: {
			type: String,
			default: 'label'
		}
	},
	computed: {
		classes () {
			return {
				'ag-form__label': true,
				'error': true,
				'mt-10': !!this.errorInput
			};
		}
	},
	render (h) {
		return h(this.tag, { class: this.classes }, this.$slots.default);
	}
}
