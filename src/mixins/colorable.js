export const CLASS_PREFIX = '-color';

export function factory() {
	return {
		props: {
			color: String,
			bg: String,
			backgroundColor: String,
			borderColor: String,
			textColor: String,
			colorScheme: {
				type: Object,
				default: () => ({})
			}
		},
		computed: {
			colorClasses() {
				return {
					[`${CLASS_PREFIX}-${this.color}`]: Boolean(this.color),
					[`-bg-${this.bg}`]: Boolean(this.bg),
				};
			},
			colorStyles() {
				let scheme = {
					background: this.backgroundColor || this.colorScheme.background || null,
					borderColor: this.borderColor || this.colorScheme.border || null,
					color: this.textColor || this.colorScheme.text || null,
				};
				let styles = {};

				Object.keys(scheme).forEach((key) => {
					const value = scheme[key];

					if (typeof value === 'string' && value.length > 0) {
						styles[key] = `${value} !important`;
					}
				});

				return styles;
			}
		}
	};
}

export default factory();
