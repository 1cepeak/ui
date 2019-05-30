import Shave from 'shave';
import debounce from 'lodash.debounce';

export default {
	name: 'ui-shave',
	props: {
		tag: {
			type: String,
			default: 'span'
		},
		lines: {
			type: [Number, String],
			default: 1
		},
		ignoreSpaces: Boolean
	},
	data() {
		return {
			resizeCb: null
		};
	},
	computed: {
		shaveOptions() {
			let result = {};

			if (this.ignoreSpaces) {
				result['spaces'] = !this.ignoreSpaces;
			}

			return result;
		}
	},
	methods: {
		shave() {
			const lineHeight = parseFloat(window.getComputedStyle(this.$el).getPropertyValue('line-height'));

			Shave(this.$el, lineHeight * parseFloat(this.lines), this.shaveOptions);

			this.$emit('change');
		}
	},
	render(h) {
		return h(this.tag, this.$slots.default);
	},
	mounted() {
		this.shave();

		this.resizeCb = debounce(this.shave, 200);

		window.addEventListener('resize', this.resizeCb);
	},
	updated() {
		this.shave();

		this.$nextTick(this.shave);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeCb);
	}
}
