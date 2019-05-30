import { provide as RegistrableProvide } from './registrable';
import { consoleWarn } from '../utils/console';

export default {
	mixins: [
		RegistrableProvide('buttonGroup')
	],
	data() {
		return {
			buttons: [],
			listeners: [],
			isDestroying: false
		}
	},
	watch: {
		buttons: 'update'
	},
	methods: {
		getValue(i) {
			if (this.buttons[i].value != null) {
				return this.buttons[i].value;
			}

			if (this.buttons[i].$el.value != null && this.buttons[i].$el.value !== '') {
				return this.buttons[i].$el.value;
			}

			return i;
		},
		update() {
			const selected = [];

			for (let i = 0; i < this.buttons.length; i++) {
				const button = this.buttons[i];

				if (this.isSelected(i)) {
					!button.to && !button.href && (button.isActive = true);

					selected.push(i);
				} else {
					!button.to && !button.href && (button.isActive = false);
				}
			}

			this.ensureMandatoryInvariant(selected.length > 0);
		},
		register(button) {
			if (this.beforeRegister) {
				this.beforeRegister(button);
			}

			const index = this.buttons.length;

			this.buttons.push(button);
			this.listeners.push(this.updateValue.bind(this, index));

			button.$on('click', this.listeners[index]);
		},
		unregister(button) {
			if (this.isDestroying) {
				const index = this.buttons.indexOf(button);

				if (index === -1) {
					button.$off('click', this.listeners[index]);
				}
			}
		},
		redoRegistractions(buttonToUnregister) {
			let selectedCount = 0;

			const buttons = [];

			for (let index = 0; index < this.buttons.length; ++index) {
				const button = this.buttons[index];

				if (button !== buttonToUnregister) {
					buttons.push(button);

					selectedCount += Boolean(this.isSelected(index));
				}

				button.$off('click', this.listeners[index]);
			}

			this.buttons = [];
			this.listeners = [];

			for (let index = 0; index < buttons.length; ++index) {
				this.register(buttons[index]);
			}

			this.ensureMandatoryInvariant(selectedCount > 0);
			this.updateAllValues && this.updateAllValues();
		},
		ensureMandatoryInvariant(hasSelectedAlready) {
			if (!this.mandatory || hasSelectedAlready) {
				return;
			}

			if (!this.listeners.length) {
				consoleWarn('There must be at least one ui-button child if the mandatory prop is true', this);

				return;
			}

			this.listeners[0]();
		}
	},
	mounted() {
		this.update();
	},
	beforeDestroy() {
		this.isDestroying = true;
	}
}
