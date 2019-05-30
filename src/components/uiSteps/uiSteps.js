import { provide as RegistrableProvide } from '../../mixins/registrable'

const CLASS_PREFIX = 'ag-steps';

export default {
	name: 'ui-steps',
	mixins: [
		RegistrableProvide('steps')
	],
	props: {
		value: [Number, String]
	},
	data() {
		return {
			steps: [],
			listeners: [],
			currentIndex: null,
			isDestroying: false
		};
	},
	watch: {
		steps: 'init',
		value: 'update'
	},
	computed: {
		valueIsEmpty() {
			return typeof this.value === 'undefined' || this.value === null;
		}
	},
	methods: {
		register(step) {
			const index = this.steps.length;

			this.steps.push(step);
			this.listeners.push(this.select.bind(this, index));

			step.$on('click', this.listeners[index]);
		},
		unregister(step) {
			if (this.isDestroying) {
				const index = this.steps.indexOf(step);

				if (index === -1) {
					step.$off('click', this.listeners[index]);
				}
			}
		},
		init() {
			this.update();

			if (this.valueIsEmpty && this.steps.length > 0) {
				this.setStep(this.steps[0], 0, 'active');
			}
		},
		update() {
			if (this.currentIndex) {
				const step = this.steps[this.currentIndex];

				this.setStep(step, this.currentIndex, 'active');

				let completed = this.steps.slice(this.currentIndex, 0);

				// completed.map((row, index) => )

				return;
			}

			this.steps.map((row, index) => this.setStep(row, index));
		},
		setStep(step, index, action = null) {
			step.$data.index = index;
			step.$data.isActive = action === 'active';
			step.$data.isCompleted = action === 'completed';
		},
		getValue(index) {
			const step = this.steps[index];

			return step.value || index;
		},
		select(index) {
			this.currentIndex = index;

			this.$emit('input', this.getValue(index));
		}
	},
	render(h) {
		return h('div', { staticClass: CLASS_PREFIX }, [
			this.$createElement('div', { staticClass: `${CLASS_PREFIX}__wrapper` }, this.$slots.default)
		]);
	},
	beforeDestroy() {
		this.isDestroying = true;
	}
}
