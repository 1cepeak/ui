import { inject as RegistrableInject } from '../../mixins/registrable';

const CLASS_PREFIX = 'ag-step';

export default {
	name: 'ui-step',
	mixins: [
		RegistrableInject('steps')
	],
	props: {
		value: [Number, String],
	},
	data() {
		return {
			index: null,
			isActive: false,
			isCompleted: false
		};
	},
	computed: {
		classes() {
			return {
				[CLASS_PREFIX]: true,
				'-active': this.isActive,
				'-completed': this.isCompleted
			};
		}
	},
	methods: {
		genIndex() {
			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__index` }, [this.index]);
		},
		genTitle() {
			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__title` }, this.$slots.default);
		}
	},
	render(h) {
		return h('div', {
			class: this.classes,
			on: {
				click: (e) => this.$emit('click', e)
			}
		}, [
			this.genIndex(),
			this.genTitle()
		]);
	},
	mounted() {
		if (this.steps) {
			console.log('group', this.steps);

			this.steps.register(this);
		}
	},
	beforeDestroy() {
		if (this.steps) {
			this.steps.unregister(this);
		}
	}
}
