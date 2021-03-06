import ButtonGroup from '../../mixins/button-group';
import { consoleWarn } from '../../utils/console';

const CLASS_PREFIX = 'ag-group';

export default {
	name: 'ui-button-group',
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
		tag: {
			type: String,
			default: 'div'
		},
		join: Boolean,
		tabs: Boolean,
		mandatory: Boolean,
		multiple: Boolean,
		stretch: Boolean,
		wrap: Boolean
	},
	computed: {
		classes () {
			return {
				[CLASS_PREFIX]: true,
				'-join': this.join,
				'-tabs': this.tabs,
				'-stretch': this.stretch,
				'-wrap': this.wrap
			};
		}
	},
	watch: {
		inputValue: {
			handler() {
				this.update();
			},
			deep: true
		}
	},
	methods: {
		isSelected(i) {
			const item = this.getValue(i);

			if (!this.multiple) {
				return this.inputValue === item;
			}

			return this.inputValue.includes(item);
		},
		updateValue(i) {
			const item = this.getValue(i);

			if (!this.multiple) {
				if (this.mandatory && this.inputValue === item) {
					return;
				}

				return this.$emit('change', this.inputValue === item ? null : item);
			}

			const items = this.inputValue.slice();
			const index = items.indexOf(item);

			if (index > -1) {
				if (this.mandatory && items.length === 1) {
					return;
				}

				items.length >= 1 && items.splice(index, 1);
			} else {
				items.push(item);
			}

			this.$emit('change', items);
		},
		updateAllValues() {
			if (!this.multiple) {
				return;
			}

			const items = [];

			for (let i = 0; this.buttons.length; ++i) {
				const item = this.getValue(i);
				const index = this.inputValue.indexOf(item);

				if (index !== -1) {
					items.push(item);
				}
			}

			this.$emit('change', items);
		}
	},
	created() {
		if (this.multiple && !Array.isArray(this.inputValue)) {
			consoleWarn('Model must be bound to an array if the multiple prop is true', this);
		}
	},
	render(h) {
		return h(this.tag, { class: this.classes }, [this.$slots.default]);
	}
}
