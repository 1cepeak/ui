import uiError from '../components/uiError';

export default {
	props: {
		hovered: Boolean,
		hoverClass: {
			type: String,
			default: 'hover'
		},
		focused: Boolean,
		focusClass: {
			type: String,
			default: 'active'
		},
		disabled: Boolean,
		disableClass: {
			type: String,
			default: 'disabled'
		},
		error: Boolean,
		errorMessage: String,
		errorClass: {
			type: String,
			default: 'error'
		},
	},
	data () {
		return {
			isFocused: false
		};
	},
	computed: {
		stateClasses() {
			return {
				[this.hoverClass]: this.hovered,
				[this.focusClass]: this.focused || this.isFocused,
				[this.disableClass]: this.disabled,
				[this.errorClass]: this.error
			};
		},
		hasError() {
			return this.errorMessage || this.$slots['error'];
		}
	},
	methods: {
		genErrorSlot() {
			let slot = null;

			if (this.$slots['error']) {
				slot = this.$slots['error'];
			} else if (this.errorMessage) {
				slot = this.genError();
			}

			return slot;
		},
		genError() {
			return this.$createElement(uiError, { class: this.errorClass }, [this.errorMessage]);
		}
	}
}
