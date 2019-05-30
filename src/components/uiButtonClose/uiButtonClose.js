import uiButton from '../uiButton';
import uiIcon from '../uiIcon';

export default {
	name: 'ui-button-close',
	computed: {
		classes() {
			return {
				'ag-sticky-button': true,
				'ag-close-icon': true
			};
		}
	},
	methods: {
		genIcon() {
			return this.$createElement(uiIcon, { props: { name: 'cross' } });
		},
		genLabel() {
			return this.$createElement('span', this.$slots.default);
		}
	},
	render(h) {
		return h(uiButton, { class: this.classes }, [
			this.genIcon(),
			this.genLabel()
		]);
	}
}
