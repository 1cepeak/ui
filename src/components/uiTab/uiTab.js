import Stateable from '../../mixins/stateable';
import { inject as RegistrableInject } from '../../mixins/registrable';

import uiIcon from '../uiIcon';

import { consoleError } from "../../utils/console";

import { CLASS_PREFIX } from '../uiTabs/uiTabs';

export default {
	name: 'ui-tab',
	mixins: [
		Stateable,
		RegistrableInject('buttonGroup')
	],
	props: {
		value: null,
		icon: String,
		tag: {
			type: String,
			default: 'div'
		},
		activeClass: {
			type: String,
			default: '-selected active'
		}
	},
	data: () => ({
		isActive: false
	}),
	computed: {
		classes() {
			return {
				[`${CLASS_PREFIX}__tab`]: true,
				[this.activeClass]: this.isActive,
				[this.disableClass]: this.disabled
			};
		}
	},
	methods: {
		genIcon() {
			return this.$createElement(uiIcon, { props: { name: this.icon } });
		},
		genIconSlot() {
			let slot = null;

			if (this.$slots['icon']) {
				slot = this.$slots['icon'];
			} else if (this.icon) {
				slot = this.genIcon();
			}

			return slot;
		},
		genContent() {
			return this.$createElement('span', [this.$slots.default]);
		}
	},
	mounted() {
		if (!this.buttonGroup) {
			consoleError('ui-tab component should be inside of ui-tabs component', this);
		}

		this.buttonGroup.register(this);
	},
	beforeDestory() {
		this.buttonGroup.unregister(this);
	},
	render(h) {
		return h(this.tag, {
			class: this.classes,
			on: {
				click: (e) => {
					if (!this.disabled) {
						this.$emit('click', e);
					}
				}
			}
		}, [
			this.genIconSlot(),
			this.genContent()
		]);
	}
}
