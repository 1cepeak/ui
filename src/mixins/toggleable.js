function update(value, delay) {
	if (this.useDelay) {
		if (value) {
			this.isHidden = false;

			setTimeout(() => {
				this.isActive = true;
			}, delay);
		} else {
			this.isActive = false;

			setTimeout(() => {
				this.isHidden = true;
			}, delay);
		}
	} else {
		this.isActive = !!value;
		this.isHidden = !value;
	}
}

export function factory (prop = 'value', event = 'input', delay = 200) {
	return {
		model: {
			prop,
			event
		},
		props: {
			[prop]: {
				required: false
			}
		},
		data() {
			return {
				isActive: !!this[prop],
				isHidden: !this[prop],
				useDelay: false
			};
		},
		watch: {
			[prop](value) {
				update.call(this, value, delay);
			},
			isActive(value) {
				!!value !== this[prop] && this.$emit(event, value);
			}
		},
		methods: {
			toggle() {
				update.call(this, !this.isActive, delay);
			}
		}
	}
}

export default factory();
