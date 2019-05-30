import Toggleable from '../../mixins/toggleable';
import Mountable from '../../mixins/mountable';

import { appendElement } from '../../utils/helpers';

import { CLASS_PREFIX } from "../uiSelect/uiSelect";

export default {
    name: 'ui-dropdown',
    mixins: [
        Toggleable,
		Mountable
    ],
    props: {
        positionX: {
            type: Number,
            default: 0
        },
        positionY: {
            type: Number,
            default: 0
        },
        width: {
            type: Number,
            default: 0
        },
		/**
		 * @deprecated используйте mountElement
		 */
        appendSelector: String,
        sticked: Boolean
    },
    data () {
        return {
            up: false,
            down: false,
			useDelay: true
        };
    },
    computed: {
        classes () {
            return {
                shown: this.isActive,
				hidden: this.isHidden
            };
        },
        styles () {
            return {
                minWidth: `${this.width}px`,
                maxWidth: `${this.width + 100}px`
            };
        },
        transform () {
            return `translate3d(${this.positionX.toFixed(0)}px, ${this.positionY.toFixed(0)}px, 0px)`;
        }
    },
    methods: {
        genContent () {
            return this.$createElement('div', {
                ref: 'dropdown',
                staticClass: `${CLASS_PREFIX}__window`,
                style: this.styles
            }, [
                this.genArrow(),
                this.genScrollerUp(),
                this.$slots.default,
                this.genScrollerDown()
            ]);
        },
        genArrow () {
            return this.$createElement('span', {
                staticClass: `${CLASS_PREFIX}__window-arrow`,
                style: {
                    left: `${this.width / 2 - 8}px`
                }
            });
        },
        genScroller (direction, value) {
            return this.$createElement('span', {
                staticClass: `${CLASS_PREFIX}__scroller-${direction}`,
                class: {
                    hide: !value
                }
            });
        },
        genScrollerUp () {
            return this.genScroller('up', this.up);
        },
        genScrollerDown () {
            return this.genScroller('down', this.down);
        },
        scrollHandler () {
            if (!this.$slots.default) {
                return;
            }

            const {
                offsetHeight,
                scrollTop,
                scrollHeight
            } = this.$slots.default[0].elm;

            this.down = offsetHeight + scrollTop < scrollHeight;
            this.up = scrollTop > 0;
        },
    },
    mounted () {
        if (!this.disableMounting) {
			appendElement(this.$el, this.appendSelector);
		}

        this.scrollHandler();

        this.$el.addEventListener('scroll', this.scrollHandler, true);
    },
    beforeDestroy () {
        this.$el.removeEventListener('scroll', this.scrollHandler);
        this.$el.remove();
    },
    render (h) {
        return h('div', {
            staticClass: `${CLASS_PREFIX}__hint`,
            class: this.classes,
            style: {
                transform: this.transform,
                position: this.sticked ? 'fixed' : null
            }
        }, [this.genContent()]);
    }
}
