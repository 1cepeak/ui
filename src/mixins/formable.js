import { inject as RegistrableInject } from './registrable';

import uiFormField from '../components/uiFormField';

import { consoleError } from '../utils/console';

export default {
	mixins: [
		RegistrableInject('form')
	],
	props: {
		field: Boolean
	},
	data: () => ({
		isInField: false
	}),
	watch: {
		field(value) {
			this.isInField = value;
		}
	},
	methods: {
		genWrapper(content, tag = 'div', data = {}) {
			if (!Array.isArray(content)) {
				consoleError('The argument "content" must be type of array');
			}

			content = content.filter((row) => !!row);

			if (this.isInField) {
				return this.$createElement(uiFormField, data, content);
			}

			if (content.length > 1) {
				return this.$createElement(tag, data, content);
			}

			return content[0];
		}
	},
	mounted() {
		this.isInField = !!this.field;

		if (this.form) {
			this.form.register(this);
		}
	},
	beforeDestroy() {
		if (this.form) {
			this.form.unregister(this);
		}
	}
}
