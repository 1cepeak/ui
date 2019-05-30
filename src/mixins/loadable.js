import uiLoader from '../components/uiLoader';

export default {
	components: {
		uiLoader
	},
	props: {
		loading: Boolean
	},
	methods: {
		genDefaultSlot () {
			if (!this.loading) {
				return this.$slots.default;
			}

			return this.$createElement(uiLoader);
		}
	}
}
