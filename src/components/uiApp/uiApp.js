export const STORAGE_KEY = 'agro24-ui-dark-mode';

export default {
	name: 'ui-app',
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		dark: Boolean
	},
	computed: {
		classes() {
			const dark = localStorage.getItem(STORAGE_KEY) === true || this.dark;

			return {
				'ag-ui-2': true,
				'-night': dark
			};
		}
	},
	watch: {
		dark(value) {
			localStorage.setItem(STORAGE_KEY, value);
		}
	},
	render(h) {
		return h(this.tag, { class: this.classes }, this.$slots.default);
	}
}
