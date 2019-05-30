import Routeable from '../../mixins/routable';
import Colorable from '../../mixins/colorable';
import { factory as ThemeFactory } from '../../mixins/themeable';
import { factory as IconFactory } from '../../mixins/iconable';

import uiIcon from '../uiIcon';

export const CLASS_PREFIX = 'ag-tag';

export default {
	name: 'ui-tag',
	mixins: [
		Routeable,
		Colorable,
		ThemeFactory(CLASS_PREFIX),
		IconFactory(CLASS_PREFIX)
	],
	computed: {
		classes () {
			return Object.assign({}, this.themesClasses, this.colorClasses);
		}
	},
	methods: {
		click (e) {
			this.$emit('click', e);
		},
		remove () {
			this.$emit('remove');
		},
		genContent () {
			return this.$createElement('span', { staticClass: `${CLASS_PREFIX}__name` }, [ this.$slots.default ]);
		},
		genRemove () {
			if (!this.removable) {
				return null;
			}

			return this.$createElement('span', { staticClass: `${CLASS_PREFIX}__icon` }, [
				this.$createElement(uiIcon, {
					props: { name: 'close' },
					on: { click: this.remove },
					nativeOn: { click: this.remove }
				})
			]);
		}
	},
	render (h) {
		let { tag, data } = this.generateRouteLink();

		data.staticClass = CLASS_PREFIX;

		return h(tag, data, [
			this.genPrependSlot(),
			this.genContent(),
			this.genRemove(),
			this.genAppendSlot()
		]);
	}
}
