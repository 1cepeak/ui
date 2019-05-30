import ButtonGroup from '../../mixins/button-group';

export const CLASS_PREFIX = 'ag-tabbar';

export default {
	name: 'ui-tabs',
	model: {
		prop: 'inputValue',
		event: 'change'
	},
	mixins: [
		ButtonGroup
	],
	props: {
		inputValue: {
			required: false
		},
		mandatory: Boolean
	},
	watch: {
		inputValue: {
			handler () {
				this.update();
			},
			deep: true
		}
	},
	methods: {
		isSelected(i) {
			return this.inputValue === this.getValue(i);
		},
		updateValue(i) {
			return this.$emit('change', this.getValue(i));
		}
	},
	render (h) {
		return h('div', { staticClass: CLASS_PREFIX, }, [
			this.$createElement('div', { staticClass: `${CLASS_PREFIX}__scroller` }, [this.$slots.default])
		]);
	}
}
