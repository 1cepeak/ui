import Formable from './formable';

import { keyCodes } from '../utils/helpers';

export default {
	mixins: [
		Formable
	],
	props: {
		value: [String, Number],
		type: {
			type: String,
			default: 'text'
		},
		focusClass: {
			type: String,
			default: 'focus'
		},
		clearable: Boolean,
		readonly: Boolean,
		placeholder: String,
		size: [String, Number],
		maxSize: [String, Number],
		maxLength: [String, Number],
		min: [String, Number], // Only for type = number
		max: [String, Number], // Only for type = number
		autoComplete: Boolean,
		autoFocus: Boolean
	},
	computed: {
		inputAttributes() {
			let attributes = {
				type: this.type,
				disabled: this.disabled,
				autocomplete: this.autoComplete ? 'on' : 'off',
			};

			if (this.readonly) {
				attributes['readonly'] = this.readonly;
			}

			if (this.placeholder) {
				attributes['placeholder'] = this.placeholder;
			}

			if (this.size) {
				if (this.maxSize) {
					let length = this.value ? String(this.value).length + 1 : 0;

					attributes['size'] = Math.min(Math.max(this.size, length), this.maxSize);
				} else {
					attributes['size'] = this.size;
				}
			}

			if (this.maxLength) {
				attributes['maxLength'] = this.maxLength;
			}

			if (this.type === 'number') {
				if (this.min) {
					attributes['min'] = this.min;
				}

				if (this.max) {
					attributes['max'] = this.max;
				}
			}

			return attributes;
		},
		inputHandlers() {
			return {
				on: {
					input: this.inputHandler,
					change: this.changeHandler,
					focus: this.focusHandler,
					blur: this.blurHandler,
					keyup: this.keyUpHandler,
					keydown: this.keyDownHandler,
					keypress: this.keyPressHandler
				}
			};
		}
	},
	methods: {
		inputHandler(event) {
			let value = event;

			if (event.target) {
				value = event.target.value;
			}

			this.$emit('input', value);
		},
		changeHandler(event) {
			let value = event;

			if (event.target) {
				value = event.target.value;
			}

			this.$emit('change', value);
		},
		focusHandler() {
			if (!this.readonly) {
				this.isFocused = true;
			}

			this.$emit('focus');
		},
		blurHandler() {
			if (!this.readonly) {
				this.isFocused = false;
			}

			this.$emit('blur');
		},
		keyUpHandler(event) {
			this.$emit('keyup', event);

			const { keyCode } = event;

			switch (keyCode) {
				case keyCodes.enter: {
					this.submitHandler(event);

					break;
				}
				case keyCodes.esc: {
					this.clearHandler(event);

					break;
				}
			}
		},
		keyDownHandler(event) {
			this.$emit('keydown', event);
		},
		keyPressHandler(event) {
			this.$emit('keypress', event);
		},
		submitHandler(event) {
			this.$emit('submit', event);
		},
		clearHandler(event) {
			this.inputHandler('');

			this.$emit('clear', event);
		}
	},
	mounted() {
		if (this.autoFocus) {
			let { input } = this.$refs;

			if (input.$el && input.$el.focus) {
				this.$refs.input.$el.focus();
			}

			if (input.focus) {
				this.$refs.input.focus();
			}
		}
	}
}
