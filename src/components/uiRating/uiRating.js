import uiIcon from '../uiIcon';
import {consoleError} from "../../utils/console";

export const CLASS_PREFIX = 'ag-user-rating';

export default {
	name: 'ui-rating',
	props: {
		value: [Number, String],
		tag: {
			type: String,
			default: 'span'
		},
		underline: Boolean
	},
	computed: {
		classes() {
			return {
				[CLASS_PREFIX]: true,
				'-underline-dashed': this.underline,
				'-color-success': this.value >= 2000,
				'-color-danger': this.value < 2000
			};
		},
		rating() {
			let value = this.value;

			if (typeof value === 'string') {
				value = parseFloat(value);
			}

			return String(Number(value / 1000).toFixed(3));
		}
	},
	methods: {
		genIcon() {
			return this.$createElement(uiIcon, {
				props: {
					name: 'star',
					color: 'secondary'
				}
			});
		},
		genContent() {
			return this.$createElement('span', { class: this.classes }, [
				this.$createElement('span', { staticClass: `${CLASS_PREFIX}__value` }, [
					this.rating.substr(0, 3),
					this.$createElement('small', [' ' + this.rating.substr(3, 2)])
				])
			]);
		}
	},
	created() {
		if (typeof this.value === 'string' && isNaN(parseFloat(this.value))) {
			consoleError('The property "value" must be numeric', this);
		}
	},
	render(h) {
		return h(this.tag, {
			staticClass: `${CLASS_PREFIX}__wrap`,
			on: {
				click: (e) => this.$emit('click', e)
			}
		}, [
			this.genIcon(),
			this.genContent()
		]);
	}
}
