export default {
    props: {
        value: [String, Number, Object, Array],
        options: {
            type: Array,
            default: () => ([])
        },
        multiple: Boolean,
		mandatory: Boolean,
        itemValue: {
            type: String,
            default: 'id'
        },
        itemLabel: {
            type: String,
            default: 'name'
        },
        itemHint: {
            type: String,
            default: 'hint'
        },
        itemDisabled: {
            type: String,
            default: 'disabled'
        }
    },
    data: () => ({
		positionX: 0,
		positionY: 0,
		width: 200,
		height: 60,
	}),
    computed: {
        selectHandlers() {
            const handlers = {
                select: this.selectHandler.bind(this),
                remove: this.removeHandler.bind(this)
            };

            return {
                on: handlers,
                nativeOn: handlers
            };
        }
    },
    methods: {
        getItemValue(item) {
            return item[this.itemValue] || null;
        },
        getItemLabel(item) {
            return item[this.itemLabel] || '';
        },
        getItemHint(item) {
            return item[this.itemHint] || '';
        },
        getItemDisabled(item) {
            return item[this.itemDisabled] || false;
        },
        getPosition(el, {
            includeLeftScroll = true,
            includeTopScroll = true
        } = {}) {
            const rect = el.getBoundingClientRect();

            let scrollLeft = includeLeftScroll ? window.pageXOffset || document.documentElement.scrollLeft : 0;
            let scrollTop = includeTopScroll ? window.pageYOffset || document.documentElement.scrollTop : 0;

            this.positionX = rect.left + scrollLeft;
            this.positionY = rect.top + rect.height + scrollTop;
            this.width = rect.width;
            this.height = rect.height;
        },
        selectHandler(value) {
            this.$emit('select', value);
        },
        removeHandler(value) {
            this.$emit('select', value);
        }
    }
}
