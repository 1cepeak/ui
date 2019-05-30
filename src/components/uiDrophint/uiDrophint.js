import Toggleable from '../../mixins/toggleable';

import { appendElement } from '../../utils/helpers';

const CLASS_PREFIX = 'ag-drophint';

const initialTransform = 'translate3d(-1000px, -1000px, 0px)';

export default {
    name: 'ui-drophint',
    mixins: [
        Toggleable
    ],
    props: {
        position: {
            type: String,
            default: 'bottom-right'
        },
        positionX: {
            type: Number,
            default: -1000
        },
        positionY: {
            type: Number,
            default: -1000
        },
        width: {
            type: Number,
            default: 0
        },
        parentHeight: {
            type: Number,
            default: 0
        },
        parentWidth: {
            type: Number,
            default: 0
        },
        appendSelector: String,
        sticked: Boolean
    },
    data () {
        return {
            up: false,
            down: false,
            defaultTransform: null
        };
    },
    computed: {
        classes () {
            return {
                shown: this.isActive
            };
        },
        styles () {
            return {
                minWidth: `${this.width}px`,
                maxWidth: `${this.width}px`
            };
        },
        opensToTop() {
            return this.position.includes('top');
        },
        opensToBottom() {
            return this.position.includes('bottom');
        },
        opensToLeft() {
            return this.position.includes('left');
        },
        opensToRight() {
            return this.position.includes('right');
        },
        opensToCenter() {
            return !this.opensToLeft && !this.opensToRight;
        },
        opensToSide() {
            return !this.opensToTop && !this.opensToBottom;
        },
        realPositionX() {
            if (this.opensToSide) {
                if (this.opensToLeft) {
                    return this.positionX;
                } else {
                    return this.positionX + this.parentWidth;
                }
            } else {
                if (this.opensToCenter) {
                    return this.positionX - (this.width / 2) + (this.parentWidth / 2);
                } else if (this.opensToLeft) {
                    return this.positionX - this.width + this.parentWidth;
                } else {
                    return this.positionX;
                }
            }
        },
        realPositionY() {
            if (this.opensToSide) {
                return this.positionY - this.parentHeight / 2;
            } else if (this.opensToTop) {
                return this.positionY - this.parentHeight;
            } else {
                return this.positionY;
            }
        },
        arrowLeftOffset() {
            const ARROW_HALF_WIDTH = 8;

            if (this.opensToSide) {
                if (this.opensToLeft) {
                    return this.width;
                } else {
                    return -15;
                }
            } else {
                if (this.opensToCenter) {
                    return this.width / 2 - ARROW_HALF_WIDTH;
                } else if (this.opensToLeft) {
                    return this.width - (this.parentWidth / 2) - ARROW_HALF_WIDTH;
                } else {
                    return this.parentWidth / 2 - ARROW_HALF_WIDTH;
                }
            }
        },
        transform () {
            let translateX = `${this.realPositionX}px`;
            let translateY;

            if (this.opensToSide) {
                translateY = `calc(${this.realPositionY + 10}px - 50%)`;

                if (this.opensToLeft) {
                    translateX = `calc(${this.realPositionX + 20}px - 100%)`;
                }
            } else if (this.opensToTop) {
                translateY = `calc(${this.realPositionY + 20}px - 100%)`;
            } else {
                translateY = `${this.realPositionY}px`;
            }

            return `translate3d(${translateX}, ${translateY}, 0px)`;
        },
    },
    watch: {
        isActive (value) {
            if (!value) {
                setTimeout(() => {
                    this.defaultTransform = initialTransform;
                }, 100);
            } else {
                this.defaultTransform = this.transform;
            }
        },
        transform () {
            if (!this.isActive) return;

            this.defaultTransform = this.transform;
        },
    },
    methods: {
        genContent () {
            return this.$createElement('div', {
                ref: 'dropdown',
                staticClass: `${CLASS_PREFIX}__window`,
                style: this.styles
            }, [
                this.genArrow(),
                this.$slots.default,
            ]);
        },
        genArrow () {
            return this.$createElement('span', {
                staticClass: `${CLASS_PREFIX}__arrow`,
                style: {
                    left: `${this.arrowLeftOffset}px`,
                    top: this.opensToSide ? `calc(50% - 8px)` : null,
                }
            });
        },
    },
    mounted () {
        this.defaultTransform = initialTransform;

        appendElement(this.$el, this.appendSelector);
    },
    beforeDestroy () {
        this.$el.remove();
    },
    render (h) {
        return h('div', {
            staticClass: `${CLASS_PREFIX}`,
            class: this.classes,
            style: {
                transform: this.defaultTransform,
                position: this.sticked ? 'fixed' : null
            },
            attrs: {
                'drophint-position': this.position
            }
        }, [
            this.genContent()
        ]);
    }
}