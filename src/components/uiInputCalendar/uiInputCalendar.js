import Inputable from '../../mixins/inputable';

import uiInput from '../uiInput';
import uiTooltip from '../uiTooltip';
import uiCalendar from '../uiCalendar';

import { DEFAULT_FORMAT } from '../uiCalendar/uiCalendar';

import moment from 'moment';

export default {
	name: 'ui-input-calendar',
	mixins: [
		Inputable
	],
	props: {
		/**
		 * @type {string}
		 */
		format: {
			type: String,
			default: DEFAULT_FORMAT
		},
		/**
		 * @type {string}
		 */
		outputFormat: {
			type: String,
			default: DEFAULT_FORMAT
		},
		min: String,
		max: String,
		multiple: Boolean,
		range: Boolean
	},
	data: () => ({
		isActive: false
	}),
	computed: {
		inputValue() {
			if (this.format === this.outputFormat) {
				return this.value;
			}

			return this.formatOutput(this.value);
		}
	},
	methods: {
		formatOutput(value) {
			if (typeof value === 'string') {
				return moment(value, this.format).format(this.outputFormat);
			}

			return this.value.map((row) => moment(row, this.format).format(this.outputFormat));
		},
		genInput() {
			return this.$createElement(uiInput, {
				slot: 'activator',
				props: {
					value: this.inputValue,
					appendIcon: 'calendar',
					appendSeparate: true
				},
				on: Object.assign({}, this.inputHandlers.on, {
					focus: (e) => {
						this.isActive = true;

						this.focusHandler(e);
					}
				})
			});
		},
		genCalendar() {
			let props = {};

			['value', 'format', 'min', 'max', 'multiple', 'range'].forEach((prop) => {
				props[prop] = this.$props[prop];
			});

			return this.$createElement(uiCalendar, {
				props,
				on: {
					input: this.inputHandler.bind(this)
				}
			});
		}
	},
	render(h) {
		return h(uiTooltip, {
			props: {
				opened: this.isActive,
				light: true,
				clickable: true,
				disabled: true,
				maxWidth: 'auto',
				maxHeight: 'auto'
			},
			on: {
				hide: () => this.isActive = false
			}
		}, [
			this.genInput(),
			this.genCalendar()
		]);
	}
}
