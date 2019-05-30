export default {
	props: {
		items: {
			type: Array,
			default: () => ([])
		},
		itemKey: {
			type: String,
			default: 'id'
		}
	},
	methods: {
		genBody() {
			return this.$createElement('tbody', []);
		},
		genItems() {
			const scope = this.$scopedSlots.row || null;

			if (scope) {
				const rows = this.items.map((row) => scope({ item: row }));
			}

			if (!this.items) {
				return null;
			}


		},
		genItem(item) {}
	}
};
