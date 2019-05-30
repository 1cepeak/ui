import uiCardSection from './uiCardSection';
import uiCardRibbon from './uiCardRibbon';
import uiCardParams from './uiCardParams';

export const CLASS_PREFIX = 'ag-request-card';

export default {
	name: 'ui-card',
	components: {
		uiCardSection,
		uiCardRibbon,
		uiCardParams
	},
	methods: {
		genHeadSlot() {
			if (!this.$slots.head) {
				return null;
			}

			return this.$createElement(uiCardSection, { staticClass: '-head' }, this.$slots.head);
		},
		genBottomSlot() {
			if (!this.$slots.bottom && !this.$slots.actions) {
				return null;
			}

			return this.$createElement(uiCardSection, { staticClass: '-bottom' }, [
				this.$slots.bottom,
				this.genActionsSlot()
			]);
		},
		genActionsSlot() {
			if (!this.$slots.actions) {
				return null;
			}

			return this.$createElement('div', {
				staticClass: `${CLASS_PREFIX}__buttons`,
				props: {
					stretch: true,
					gutters: 5
				}
			}, this.$slots.actions);
		},
		genContent() {
			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__central` }, this.$slots.default);
		}
	},
	render(h) {
		return h('div', { staticClass: CLASS_PREFIX }, [
			this.genHeadSlot(),
			this.genContent(),
			this.genBottomSlot()
		]);
	}
};
