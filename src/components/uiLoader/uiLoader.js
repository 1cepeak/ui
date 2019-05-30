export const CLASS_PREFIX = 'ag-loader';

export default {
	name: 'ui-loader',
	computed: {
		classes () {
			return {
				[CLASS_PREFIX]: true
			};
		}
	},
	render (h) {
		return h('div', { class: this.classes }, [
			this.$createElement('div'),
			this.$createElement('div'),
			this.$createElement('div')
		]);
	}
};
