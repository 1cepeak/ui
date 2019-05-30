import Colorable from '../../mixins/colorable';

const CLASS_PREFIX = 'ag-text';

export default {
	name: 'ui-text',
	mixins: [
		Colorable
	],
	props: {
		tag: {
			type: String,
			default: 'span'
		},
		/**
		 * @deprecated Use "size" prop
		 */
		fontSize: String,
		/**
		 * @deprecated Use "weight" prop
		 */
		fontWeight: [Number, String],
		modifier: String,
	},
	computed: {
		classes() {
			return Object.assign(this.colorClasses, {
				[CLASS_PREFIX]: true,
				[`-font-size-${this.size || this.fontSize}`]: this.size || this.fontSize,
				[`-font-weight-${this.weight || this.fontWeight}`]: this.weight || this.fontWeight,
				[`-text-${this.modifier}`]: this.modifier
			});
		}
	},
	render (h) {
		return h(this.tag, { class: this.classes }, [this.$slots.default]);
	}
}
