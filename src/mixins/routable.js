export default {
	props: {
		href: [String, Object],
		to: [String, Object],
		activeClass: String,
		exactActiveClass: String,
		exact: {
			type: Boolean,
			default: undefined
		},
		append: Boolean,
		replace: Boolean,
		disabled: Boolean,
		tag: String,
		target: String
	},
	methods: {
		click () {},
		generateRouteLink () {
			let exact = this.exact;
			let tag = 'router-link';

			const data = {
				attrs: { disabled: this.disabled },
				class: this.classes,
				props: {},
				directives: [],
				[this.to ? 'nativeOn' : 'on']: Object.assign({
					click: this.click
				}, this.$listeners)
			};

			if (typeof this.exact === 'undefined') {
				exact = this.to === '/' || (this.to === Object(this.to) && this.to.path === '/');
			}

			if (this.to) {
				let activeClass = this.activeClass;
				let exactActiveClass = this.exactActiveClass;

				if (this.proxyClass) {
					activeClass += ' ' + this.proxyClass;
					exactActiveClass += ' ' + this.proxyClass;
				}

				Object.assign(data.props, {
					to: this.to,
					exact,
					activeClass,
					exactActiveClass,
					append: this.append,
					replace: this.replace
				});
			} else {
				tag = (this.href && 'a') || this.tag || 'a';

				if (tag === 'a' && this.href) {
					data.attrs.target = this.target;
					data.attrs.href = this.href;
				}
			}

			if (this.target) {
				data.attrs.target = this.target;
			}

			return { tag, data };
		}
	}
}
