import Colorable from '../../mixins/colorable';
import { factory as ThemeFactory } from '../../mixins/themeable';

export const CLASS_PREFIX = 'ag-svg';

export default {
	name: 'ui-icon',
	mixins: [
		Colorable,
		ThemeFactory(CLASS_PREFIX)
	],
	props: {
		tag: {
			type: String,
			default: 'span'
		},
		name: String,
		small: Boolean,
		large: Boolean,
		size: String,
		rotate: [String, Number]
	},
	computed: {
		classes() {
			return Object.assign({
				[CLASS_PREFIX]: true,
				[`-rotate-${this.rotate}`]: this.rotate,
				[`-size-${this.size}`]: this.size,
				'-smaller': this.small,
				'-larger': this.large
			}, this.themesClasses, this.colorClasses);
		},
		handlers() {
			return {
				on: {
					click: (e) => this.$emit('click', e)
				}
			}
		}
	},
	methods: {
		genContent() {
			return this.$createElement('svg', [
				this.$createElement('use', {
					attrs: {
						'xlink:href': `#${this.name}`
					}
				})
			]);
		}
	},
	render (h) {
		const data = Object.assign({ class: this.classes }, this.handlers);
		const content = [this.genContent()];

		return h(this.tag, data, content);
	}
}
