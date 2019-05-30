import Routable from '../../mixins/routable';
import Stateable from '../../mixins/stateable';
import Loadable from '../../mixins/loadable';
import Colorable from '../../mixins/colorable';
import Formable from '../../mixins/formable';
import { factory as ThemeFactory } from '../../mixins/themeable';
import { factory as SizeFactory } from '../../mixins/sizeable';
import { factory as ToggleFactory } from '../../mixins/toggleable';
import { inject as RegistrableInject } from '../../mixins/registrable';

import uiIcon from '../uiIcon';
import uiFormField from '../uiFormField';

export const CLASS_PREFIX = 'ag-button';

export default {
	name: 'ui-button',
	mixins: [
		Routable,
		Stateable,
		Loadable,
		Colorable,
		Formable,
		ThemeFactory(CLASS_PREFIX, ['dark']),
		SizeFactory(CLASS_PREFIX),
		ToggleFactory('inputValue'),
		RegistrableInject('buttonGroup'),
		RegistrableInject('formGroup')
	],
	components: {
		uiIcon,
		uiFormField
	},
	props: {
		activeClass: {
			type: String,
			default: 'active'
		},
		rounded: Boolean,
		outline: Boolean,
		loading: Boolean,
		super: Boolean,
		wide: Boolean,
		ghost: Boolean,
		link: Boolean,
		tag: {
			type: String,
			default: 'button'
		},
		type: {
			type: String,
			default: 'button'
		},
		icon: String,
		value: null
	},
	computed: {
		groupClasses() {
			return this.buttonGroup || this.formGroup ? {
				'ag-group__item': true,
				'-selected toggle': this.isActive // @todo Убрать класс toggle когда обновим дизайн на проде
			} : {};
		},
		classes() {
			return Object.assign({
				[CLASS_PREFIX]: true,
				[this.activeClass]: this.isActive,
				'-round': this.rounded,
				'-outline': this.outline,
				'-super': this.super,
				'-wide': this.wide,
				'-ghost': this.ghost,
				'-link': this.link,
				'-icon': (this.icon && !this.$slots.default) || this.$slots.icon
			}, this.sizeClasses, this.themesClasses, this.colorClasses, this.stateClasses, this.groupClasses);
		},
	},
	methods: {
		click(e) {
			e.detail && this.$el.blur();

			this.$emit('click', e);
		},
		genContent() {
			let content = this.genDefaultSlot();
			let icon = this.genIconSlot();

			if (icon && content) {
				content = this.$createElement('span', [content]);
			}

			return [icon, content];
		},
		genIconSlot() {
			if (this.$slots.icon) {
				return this.$slots.icon;
			}

			if (this.icon) {
				return this.genIcon();
			}

			return null;
		},
		genIcon() {
			return this.$createElement(uiIcon, { props: { name: this.icon } });
		}
	},
	mounted() {
		if (this.buttonGroup) {
			this.buttonGroup.register(this);
		}

		if (this.formGroup) {
			this.formGroup.register(this);
		}
	},
	beforeDestroy() {
		if (this.buttonGroup) {
			this.buttonGroup.unregister(this);
		}

		if (this.formGroup) {
			this.formGroup.unregister(this);
		}
	},
	render(h) {
		const { tag, data } = this.generateRouteLink();

		if (tag === 'button') {
			data.attrs.type = this.type
		}

		data.style = this.colorStyles;
		data.attrs.value = ['string', 'number'].includes(typeof this.value)
			? this.value
			: JSON.stringify(this.value);

		return this.genWrapper([
			h(tag, data, this.genContent())
		]);
	}
}
