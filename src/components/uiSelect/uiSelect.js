import Mountable from '../../mixins/mountable';
import Stateable from '../../mixins/stateable';
import Labelable from '../../mixins/labelable';
import Selectable from '../../mixins/selectable';
import Formable from '../../mixins/formable';
import { factory as SizeFactory, SIZE_STRETCH_CLASS } from '../../mixins/sizeable';
import { inject as RegistrableInject } from '../../mixins/registrable';

import uiIcon from '../uiIcon';
import uiDropdown from '../uiDropdown';
import uiMenu from '../uiMenu';

import ClickOutside from '../../directives/ClickOutside';

export const CLASS_PREFIX = 'ag-select';

// @todo Переделать с использованием uiTooltip вместо uiDropdown

export default {
    name: 'ui-select',
    mixins: [
    	Mountable,
        Stateable,
        Labelable,
        Selectable,
		Formable,
        SizeFactory(CLASS_PREFIX),
        RegistrableInject('formGroup')
    ],
    directives: {
        ClickOutside
    },
    props: {
        placeholder: {
            type: String,
            default: 'Выберите вариант'
        },
        noAutoClose: Boolean,
        appendSelector: String,
        sticked: Boolean
    },
    computed: {
        classes() {
            return Object.assign({
				[CLASS_PREFIX]: true,
				[`${CLASS_PREFIX}__field`]: true,
				closed: !this.isFocused,
				selected: this.selected.length > 0
			}, this.stateClasses, this.sizeClasses);
        },
        directives() {
            return [{
                name: 'click-outside',
                value: this.hide.bind(this),
                args: {
                    closeConditional: (e) => {
                        let content = this.$refs.dropdown.$el;

                        if (!!content && content.contains(e.target)) {
                            return !this.noAutoClose && !this.multiple;
                        }

                        return !!this.$el && !this.$el.contains(e.target) && e.target !== this.$el;
                    }
                }
            }];
        },
		mountElementAttributes() {
			return {
				classes: {
					[SIZE_STRETCH_CLASS]: this.stretch
				}
			};
		},
        caption() {
            return this.selected.length > 0 ? this.selected.join(', ') : this.placeholder;
        },
        selected() {
            return this.options.filter((item) => {
                item = this.getItemValue(item);

                return this.multiple ? this.value.includes(item) : this.value == item;
            }).map(item => this.getItemLabel(item));
        },
        clearedProps() {
            let props = Object.assign({}, this.$props);

            delete props.value;

            return props;
        }
    },
    methods: {
        toggle() {
            this.isFocused = !this.isFocused;
        },
        hide() {
            this.isFocused = false;
        },
        genContent() {
            return this.$createElement('div', {
                class: this.classes,
                directives: this.directives,
                on: {
                    click: this.toggle
                },
                nativeOn: {
                    click: this.toggle
                }
            }, [
                this.genCaption(),
                this.genArrow(),
                this.genDropdown()
            ]);
        },
        genCaption() {
            return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__value` }, [this.caption]);
        },
        genArrow() {
            return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__arrow` }, [
                this.$createElement(uiIcon, {
                    props: {
                        name: 'arrowhead',
                        rotate: 90
                    }
                })
            ]);
        },
        genDropdown() {
            return this.$createElement(uiDropdown, {
                ref: 'dropdown',
                props: {
                    value: this.isFocused,
                    positionX: this.positionX,
                    positionY: this.positionY,
                    width: this.width,
					mountElement: this.mountElement,
					disableMounting: this.disableMounting,
                    appendSelector: this.appendSelector,
                    sticked: this.sticked
                },
            }, [this.genDropdownSlot()]);
        },
		genDropdownSlot() {
        	return this.$slots.dropdown || this.genMenu();
		},
        genMenu() {
            return this.$createElement(uiMenu, {
                props: Object.assign({ value: this.value }, this.clearedProps),
				on: Object.assign({ input: this.input }, this.selectHandlers.on)
            });
        },
        input(value) {
            this.$emit('input', value);
        },
        resizeHandler() {
            this.getPosition(this.$el, { includeTopScroll: !this.sticked });
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
    render() {
		return this.genWrapper([
			this.genLabelSlot(),
			this.genContent(),
			this.genErrorSlot()
		]);
    }
}
