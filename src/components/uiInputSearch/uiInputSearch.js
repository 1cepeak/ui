import Stateable from '../../mixins/stateable';
import Labelable from '../../mixins/labelable';
import Inputable from '../../mixins/inputable';
import Selectable from '../../mixins/selectable';
import { factory as SizeFactory } from '../../mixins/sizeable';
import { factory as IconFactory } from '../../mixins/iconable';

import uiInput from '../uiInput';
import uiDropdown from '../uiDropdown';
import uiMenu from '../uiMenu';

import { CLASS_PREFIX } from '../uiInput/uiInput';

export default {
	name: 'ui-input-search',
	mixins: [
		Stateable,
		Labelable,
		Selectable,
		Inputable,
		SizeFactory(CLASS_PREFIX),
		IconFactory(CLASS_PREFIX)
	],
	methods: {
		genDropdown() {
			return this.$createElement(uiDropdown, {
				slot: 'dropdown',
				props: {
					value: this.options.length > 0 ? this.isFocused : false,
					positionX: this.positionX,
					positionY: this.positionY,
					width: this.width
				}
			}, [
				this.genMenu()
			]);
		},
		genMenu() {
			return this.$createElement(uiMenu, Object.assign({
				props: Object.assign({}, this.$props)
			}, this.selectHandlers));
		},
		resizeHandler() {
			if (this.$refs.input) {
				this.getPosition(this.$refs.input.$el);
			}
		}
	},
	mounted() {
		this.resizeHandler();

		window.addEventListener('resize', this.resizeHandler, true);

		this.$nextTick(this.resizeHandler);
	},
	updated() {
		this.resizeHandler();
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeHandler);
	},
	render(h) {
		return h(uiInput, Object.assign({
			ref: 'input',
			props: Object.assign({}, this.$props)
		}, this.inputHandlers), [
			this.$slots.default,
			this.genDropdown()
		]);
	}
}
