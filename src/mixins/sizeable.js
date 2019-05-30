export const SIZE_STRETCH_CLASS = '-width-100ps';

export function factory (classPrefix = null) {
	return {
		props: {
			small: Boolean,
			stretch: Boolean
		},
		computed: {
			sizeClasses () {
				return {
					[`${classPrefix}--large`]: !this.small && !this.terms,
					[SIZE_STRETCH_CLASS]: this.stretch
				};
			}
		}
	};
}

const Factory = factory();

export default Factory;
