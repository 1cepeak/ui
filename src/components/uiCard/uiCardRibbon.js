import { CLASS_PREFIX } from './uiCard';

export default {
	name: 'ui-card-ribbon',
	methods: {
		genContent() {
			return this.$createElement('div', this.$slots.default);
		},
		genStatsSlot() {
			if (!this.$slots.stats) {
				return null;
			}

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__ribbon-stats` }, this.$slots.stats);
		},
		getParamsSlot() {
			if (!this.$slots.params) {
				return null;
			}

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__params` }, this.$slots.params);
		}
	},
	render(h) {
		return h('div', { staticClass: `${CLASS_PREFIX}__ribbon` }, [
			this.genContent(),
			this.getParamsSlot(),
			this.genStatsSlot()
		]);
	}
}
