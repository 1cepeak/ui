import { factory as SizeFactory } from '../../mixins/sizeable';

const CLASS_PREFIX = 'ag-form__label';

export default {
	name: 'ui-label',
	mixins: [
		SizeFactory(CLASS_PREFIX)
	],
	props: {
		tag: {
			type: String,
			default: 'label'
		},
		for: String
	},
	computed: {
		classes() {
			return Object.assign({
				[CLASS_PREFIX]: true,
				'-cursor-text': this.for
			}, this.sizeClasses);
		}
	},
	render(h) {
		return h(this.tag, {
			class: this.classes,
			attrs: {
				for: this.for
			}
		}, this.$slots.default);
	}
}
