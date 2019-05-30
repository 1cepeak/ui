export const CLASS_PREFIX = 'ag-grid__row';

export default {
	name: 'ui-row',
	props: {
		align: String,
		alignXs: String,
		alignSm: String,
		alignMd: String,
		alignLg: String,
		alignXl: String,
		justify: String,
		justifyXs: String,
		justifySm: String,
		justifyMd: String,
		justifyLg: String,
		justifyXl: String,
		reverse: Boolean,
		reverseXs: Boolean,
		reverseSm: Boolean,
		reverseMd: Boolean,
		reverseLg: Boolean,
		reverseXl: Boolean,
		noWrap: Boolean,
	},
	computed: {
		classes () {
			return {
				[`${CLASS_PREFIX}--align-${this.align}`]: this.align,
				[`${CLASS_PREFIX}--align-${this.alignXs}--xs`]: this.alignXs,
				[`${CLASS_PREFIX}--align-${this.alignSm}--sm`]: this.alignSm,
				[`${CLASS_PREFIX}--align-${this.alignMd}--md`]: this.alignMd,
				[`${CLASS_PREFIX}--align-${this.alignLg}--lg`]: this.alignLg,
				[`${CLASS_PREFIX}--align-${this.alignXl}--xl`]: this.alignXl,
				[`${CLASS_PREFIX}--justify-${this.justify}`]: this.justify,
				[`${CLASS_PREFIX}--justify-${this.justifyXs}--xs`]: this.justifyXs,
				[`${CLASS_PREFIX}--justify-${this.justifySm}--sm`]: this.justifySm,
				[`${CLASS_PREFIX}--justify-${this.justifyMd}--md`]: this.justifyMd,
				[`${CLASS_PREFIX}--justify-${this.justifyLg}--lg`]: this.justifyLg,
				[`${CLASS_PREFIX}--justify-${this.justifyXl}--xl`]: this.justifyXl,
				[`${CLASS_PREFIX}--reverse`]: this.reverse,
				[`${CLASS_PREFIX}--reverse--xs`]: this.reverseXs,
				[`${CLASS_PREFIX}--reverse--sm`]: this.reverseSm,
				[`${CLASS_PREFIX}--reverse--md`]: this.reverseMd,
				[`${CLASS_PREFIX}--reverse--lg`]: this.reverseLg,
				[`${CLASS_PREFIX}--reverse--xl`]: this.reverseXl,
				[`${CLASS_PREFIX}--nowrap`]: this.noWrap,
			};
		}
	},
	render (h) {
		return h('div', {
			staticClass: CLASS_PREFIX,
			class: this.classes
		}, [this.$slots.default]);
	}
}
