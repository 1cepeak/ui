import uiIcon from '../uiIcon';

export const CLASS_PREFIX = 'ag-chip';

export default {
	name: 'ui-chip',
	props: {
		removable: Boolean
	},
	computed: {
		handlers () {
			let handlers = {
				click: this.removeHandler
			};

			return {
				on: handlers,
				nativeOn: handlers
			};
		}
	},
	methods: {
		removeHandler () {
			this.$emit('remove');
		},
		genContent () {
			return this.$createElement('span', { staticClass: `${CLASS_PREFIX}__name` }, [this.$slots.default]);
		},
		genClose () {
			if (!this.removable) {
				return null;
			}

			return this.$createElement('span', Object.assign({
				staticClass: `${CLASS_PREFIX}__close`
			}, this.handlers), [
				this.$createElement(uiIcon, { props: { name: 'cross' } })
			]);
		}
	},
	render (h) {
		return h('div', { staticClass: CLASS_PREFIX }, [
			this.genContent(),
			this.genClose()
		]);
	}
}
