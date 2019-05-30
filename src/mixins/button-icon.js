import Routable from './routable';
import Stateable from './stateable';
import Colorable from './colorable';
import { factory as ThemeFactory } from './themeable';
import { factory as SizeFactory } from './sizeable';

import uiButton from '../components/uiButton';
import { CLASS_PREFIX } from "../components/uiButton/uiButton";

export function factory (primary, secondary, activeClass = 'active') {
	return {
		props: {
			value: Boolean
		},
		mixins: [
			Routable,
			Stateable,
			Colorable,
			ThemeFactory(CLASS_PREFIX, ['accent', 'promo', 'black']),
			SizeFactory(CLASS_PREFIX),
		],
		computed: {
			clearedProps () {
				let props = this.$props;
				let propsToRemove = ['icon', 'rounded'];

				propsToRemove.forEach(prop => {
					delete props[prop];
				});

				return props;
			},
			icon () {
				return this.value ? secondary : primary;
			},
			classes () {
				return {
					[`${CLASS_PREFIX}--${secondary}`]: this.value,
					[activeClass]: this.value
				};
			}
		},
		methods: {
			toggle (e) {
				this.$emit('input', !this.value);
				this.$emit('click', e);
			},
		},
		render (h) {
			return h(uiButton, {
				class: this.classes,
				props: Object.assign(this.clearedProps, {
					icon: this.icon,
					rounded: true
				}),
				on: {
					click: this.toggle
				},
			}, []);
		}
	};
}

const Factory = factory();

export default Factory;
