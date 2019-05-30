export const CLASS_PREFIX = 'ag-grid__cell';

export default {
	name: 'ui-column',
	props: {
		xl: [String, Number],
		lg: [String, Number],
		md: [String, Number],
		sm: [String, Number],
		xsm: [String, Number],
		xs: [String, Number],
		xss: [String, Number]
	},
	computed: {
		classes () {
			return {
				[CLASS_PREFIX]: true,
				[`-by-content`]: this.byContent,
				[`-xl-${this.xl}`]: this.xl,
				[`-lg-${this.lg}`]: this.lg,
				[`-md-${this.md}`]: this.md,
				[`-sm-${this.sm}`]: this.sm,
				[`-xsm-${this.xsm}`]: this.xsm,
				[`-xs-${this.xs}`]: this.xs,
				[`-xss-${this.xss}`]: this.xss
			};
		},
		byContent () {
			return !this.xs && !this.sm && !this.md && !this.lg && !this.xl;
		}
	},
	render (h) {
		return h('div', { class: this.classes }, this.$slots.default);
	}
}
