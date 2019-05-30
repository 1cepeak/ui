import Stateable from '../../mixins/stateable';
import Selectable from '../../mixins/selectable';
import Toggleable from '../../mixins/toggleable';
import Colorable from '../../mixins/colorable';
import { factory as ThemeFactory } from '../../mixins/themeable';
import { factory as SizeFactory } from '../../mixins/sizeable';

import ClickOutside from '../../directives/ClickOutside';

import uiButton from '../uiButton';
import uiDrophint from '../uiDrophint';

export const CLASS_PREFIX = 'ag-drophint';

export default {
    name: 'ui-button-drophint',
    mixins: [
        Stateable,
        Selectable,
        Toggleable,
		Colorable,
		ThemeFactory(CLASS_PREFIX, ['black']),
        SizeFactory(CLASS_PREFIX),
    ],
    components: {
        uiButton,
        uiDrophint,
    },
    directives: {
        ClickOutside
    },
    props: {
        hintWidth: Number,
        hintPosition: String,
        appendSelector: String,
		icon: String,
		rounded: Boolean,
        sticked: Boolean
    },
    computed: {
        directives() {
            return [{
                name: 'click-outside',
                value: this.hide.bind(this),
                args: {
                    closeConditional: e => {
                        let content = this.$refs.drophint.$el;

                        if (!!content && content.contains(e.target)) {
                            return false;
                        }

                        return !!this.$el && !this.$el.contains(e.target) && e.target !== this.$el;
                    }
                }
            }];
        },
        clearedProps() {
            let props = Object.assign({}, this.$props);

            delete props.value;

            return props;
        }
    },
    methods: {
        toggle() {
            const value = !this.isActive;

            if (value) {
                const list = this.$refs.list;

                list && (list.scrollTop = 0);
            }

            this.isActive = value;
        },
        hide() {
            this.isActive = false;
        },
        genButton() {
            return this.$createElement(uiButton, {
                props: Object.assign(this.clearedProps, {
                    focused: this.isActive
                }),
                on: {
                    click: this.toggle
                },
            }, [
                this.$slots.caption,
            ]);
        },
        genDrophint() {
            return this.$createElement(uiDrophint, {
                ref: 'drophint',
                directives: this.directives,
                props: {
                    value: this.value,
                    position: this.hintPosition,
                    positionX: this.positionX,
                    positionY: this.positionY,
                    width: this.hintWidth || this.width,
                    parentWidth: this.width,
                    parentHeight: this.height,
                    appendSelector: this.appendSelector,
                    sticked: this.sticked,
                },
            }, [
                this.$slots.top,
                this.genList(),
                this.$slots.bottom,
            ]);
        },
        genList() {
            return this.$createElement('ul', {
                class: `${CLASS_PREFIX}__list`,
                ref: "list",
            }, [
                this.$slots.default,
            ]);
        },
        input(value) {
            this.$emit('input', value);
        },
        resizeHandler() {
            this.getPosition(this.$el, {
                includeTopScroll: !this.sticked
            });
        }
    },
    mounted() {
        this.resizeHandler();

        this.$nextTick(this.resizeHandler);

        window.addEventListener('resize', this.resizeHandler, true);
    },
    updated() {
        this.resizeHandler();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler);
    },
    render(h) {
        return h('div', {}, [
            this.genButton(),
            this.genDrophint(),
        ]);
    }
}
