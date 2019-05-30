const CLASS_PREFIX = 'ag-ticket';

export default {
	name: 'ui-ticket',
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		title: String
	},
	methods: {
		genTitle() {
			const content = this.$slots.title || this.title || null;

			if (!content) {
				return null;
			}

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__title` }, [content]);
		},
		genContent() {
			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__content` }, this.$slots.default);
		}
	},
	render(h) {
		return h(this.tag, { staticClass: CLASS_PREFIX }, [
			this.genTitle(),
			this.genContent()
		]);
	}
}
