import { consoleError } from "../utils/console";

import uiIcon from "../components/uiIcon";

export function factory (classPrefix = null) {
	return {
		props: {
			appendIcon: [String, Boolean],
			/**
			 * @param appendIconCb
			 * @deprecated Use appendCb
			 */
			appendIconCb: Function,
			appendCb: Function,
			/**
			 * @param appendIconSeparate
			 * @deprecated Use appendSeparate
			 */
			appendIconSeparate: Boolean,
			appendSeparate: Boolean,
			prependIcon: [String, Boolean],
			/**
			 * @param prependIconCb
			 * @deprecated Use prependCb
			 */
			prependIconCb: Function,
			prependCb: Function,
			/**
			 * @param prependIconSeparate
			 * @deprecated Use prependSeparate
			 */
			prependIconSeparate: Boolean,
			prependSeparate: Boolean,
		},
		methods: {
			genIcon (content, cb, separate = false, right = false) {
				let prefix = `${classPrefix}__icon`;
				let classes = {
					[prefix]: true,
					[`${prefix}__${right ? 'append' : 'prepend'}`]: true,
					[`${prefix}--separate`]: separate,
					[`${prefix}--right`]: right
				};
				let handlers = {};

				if (cb) {
					handlers['click'] = e => {
						e.preventDefault();
						e.stopPropagation();

						cb(e);
					};
				}

				if (typeof content === 'string') {
					content = [this.$createElement(uiIcon, { props: { name: content } })];
				}

				return this.$createElement('div', { class: classes, on: handlers }, content);
			},
			genAppendIcon (content) {
				if (!content) {
					consoleError('To generate icon in input the prop appendIcon must be a string');
				}

				return this.genIcon(content, this.appendCb, this.appendSeparate, true);
			},
			genPrependIcon (content) {
				if (!content) {
					consoleError('To generate icon in input the prop prependIcon must be a string');
				}

				return this.genIcon(content, this.prependCb, this.prependSeparate);
			},
			genAppendSlot () {
				let content = this.appendIcon || this.$slots['append-icon'] || this.$slots['append'] || null;

				if (!content) {
					return null;
				}

				return this.genAppendIcon(content);
			},
			genPrependSlot () {
				let content = this.prependIcon || this.$slots['prepend-icon'] || this.$slots['prepend'] || null;

				if (!content) {
					return null;
				}

				return this.genPrependIcon(content);
			},
		}
	};
}

const Factory = factory();

export default Factory;
