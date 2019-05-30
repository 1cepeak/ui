import Stateable from '../../mixins/stateable';

export const CLASS_PREFIX = 'ag-select__option';

export default {
	name: 'ui-menu-item',
	mixins: [
		Stateable
	],
	props: {
		value: [String, Number, Object],
		label: String,
		hint: String,
		selected: Boolean,
		mandatory: Boolean,
		tag: {
			type: String,
			default: 'li'
		}
	},
	computed: {
		classes() {
			return Object.assign({
				[CLASS_PREFIX]: true,
				selected: this.selected
			}, this.stateClasses);
		}
	},
	methods: {
		genLabel() {
			return this.$createElement('div', { class: `${CLASS_PREFIX}-title` }, [this.label || this.$slots.default]);
		},
		genHint() {
			if (!this.hint) {
				return null;
			}

			return this.$createElement('div', { class: `${CLASS_PREFIX}-description` }, [this.hint]);
		},
		click(e) {
			if (this.disabled) {
				return;
			}

			const event = this.selected && !this.mandatory ? 'remove' : 'select';

			this.$emit(event, this.value);
			this.$emit('click', e);
		}
	},
	render(h) {
		return h(this.tag, {
			class: this.classes,
			on: {
				click: this.click,
			},
			nativeOn: {
				click: this.click
			}
		}, [
			this.genLabel(),
			this.genHint()
		]);
	}
}
