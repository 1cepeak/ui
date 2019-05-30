import { inject as RegistrableInject } from '../../mixins/registrable';

export default {
	name: 'ui-form-group-connector',
	mixins: [
		RegistrableInject('formGroup')
	],
	mounted () {
		if (this.formGroup) {
			this.formGroup.register(this);
		}
	},
	beforeDestroy () {
		if (this.formGroup) {
			this.formGroup.unregister(this);
		}
	},
	render (h) {
		return h('div', { class: 'ag-group__connector' }, []);
	}
};