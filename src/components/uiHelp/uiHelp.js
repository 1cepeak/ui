import { factory as ToggleFactory } from '../../mixins/toggleable';

import uiIcon from '../uiIcon';

export const CLASS_PREFIX = 'ag-help';

export default {
	name: 'ui-help',
	mixins: [
		ToggleFactory('showValue', 'toggle')
	],
	props: {
		autoPlay: Boolean,
		playSpeed: {
			type: Number,
			default: 5000
		},
		content: [String, Array],
		title: String,
		caption: {
			type: String,
			default: 'Справка'
		},
	},
	data () {
		return {
			activeIndex: 0
		};
	},
	computed: {
		classes () {
			return {
				[CLASS_PREFIX]: true,
				active: this.isActive
			};
		},
		text () {
			if (Array.isArray(this.content)) {
				return this.content[this.activeIndex] || '';
			}

			return this.content;
		},
		controlsCount () {
			if (Array.isArray(this.content)) {
				return this.content.length;
			}

			return 0;
		}
	},
	methods: {
		show () {
			this.isActive = true;
		},
		hide () {
			this.isActive = false;
		},
		next (i) {
			if (this.controlsCount <= 1 || this.controlsCount < i) {
				return;
			}

			this.activeIndex = i;
		},
		play () {
			this.next(this.activeIndex === this.controlsCount - 1 ? 0 : this.activeIndex + 1);

			setTimeout(this.play, this.playSpeed);
		},
		genCaption () {
			return this.$createElement('div', {
				staticClass: `${CLASS_PREFIX}__caption`,
				click: {
					click: this.show
				},
				nativeOn: {
					click: this.show
				}
			}, [
				this.genCaptionIcon(),
				this.genCaptionTitle(),
				this.genCaptionClose()
			]);
		},
		genCaptionIcon () {
			return this.$createElement(uiIcon, {
				staticClass: `${CLASS_PREFIX}__caption-icon`,
				props: { name: 'info-circled' },
				click: {
					click: this.show
				},
				nativeOn: {
					click: this.show
				}
			});
		},
		genCaptionTitle () {
			const content = this.$slots.caption || this.caption || null;

			return this.$createElement('span', {
				staticClass: `${CLASS_PREFIX}__caption-title`,
				click: {
					click: this.show
				},
				nativeOn: {
					click: this.show
				}
			}, [content]);
		},
		genCaptionClose () {
			if (!this.isActive) {
				return null;
			}

			return this.$createElement(uiIcon, {
				staticClass: `${CLASS_PREFIX}__caption__close-btn`,
				props: {
					name: 'cross-circled'
				},
				nativeOn: {
					click: this.hide
				}
			});
		},
		genContent () {
			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__content` }, [
				this.genContentTitle(),
				this.genContentText()
			]);
		},
		genContentTitle () {
			const content = this.$slots.title || this.title || null;

			if (!content) {
				return null;
			}

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__content-title` }, [ content ]);
		},
		genContentText () {
			return this.$createElement('div', {
				staticClass: `${CLASS_PREFIX}__content-text`,
				domProps: {
					innerHTML: this.text
				}
			});
		},
		genNavigation () {
			if (this.controlsCount <= 1) {
				return null;
			}

			let controls = [];

			for (let i = 0; i < this.controlsCount; i++) {
				let button = this.$createElement('div', {
					staticClass: `${CLASS_PREFIX}__navigation-button`,
					class: { active: i === this.activeIndex },
					on: {
						click: this.next.bind(this, i)
					},
					nativeOn: {
						click: this.next.bind(this, i)
					},
				});

				controls.push(button);
			}

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__navigation` }, controls);
		}
	},
	mounted () {
		if (this.autoPlay && this.controlsCount > 1) {
			this.activeIndex = -1;

			this.play();
		}
	},
	render (h) {
		let content = [
			this.genCaption()
		];

		if (this.isActive) {
			content.push(this.genContent(), this.genNavigation());
		}

		return h('div', { class: this.classes }, content);
	}
}
