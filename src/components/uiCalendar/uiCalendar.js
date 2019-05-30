// import uiTooltip from '../uiTooltip';
import uiButton from '../uiButton';
import uiIcon from '../uiIcon';

import moment from 'moment';
import { consoleError } from '../../utils/console';

export const CLASS_PREFIX = 'ag-calendar';
export const DEFAULT_FORMAT = 'DD.MM.YYYY';

export default {
	name: 'ui-calendar',
	props: {
		value: {
			type: [String, Array],
			required: true
		},
		format: {
			type: String,
			default: DEFAULT_FORMAT
		},
		min: String,
		max: String,
		multiple: Boolean,
		range: Boolean,
		tag: {
			type: String,
			default: 'div'
		}
	},
	data: () => ({
		/**
		 * @type {Moment | null}
		 */
		currentDate: null
	}),
	computed: {
		caption() {
			let date = moment(this.currentDate, this.format).format('MMMM YYYY');

			return date.charAt(0).toUpperCase() + date.slice(1);
		},
		days() {
			return (Array.apply(null, new Array(7))).map((day, index) => {
				return moment().weekday(index).format('ddd');
			});
		},
		start() {
			const month = moment(this.currentDate, this.format).startOf('month');
			const week = moment(month, this.format).startOf('week');
			const offset = month.diff(week, 'days');
			const count = week.daysInMonth();

			return {
				date: week,
				offset: count - offset + 1,
				count
			};
		},
		end() {
			const month = moment(this.currentDate, this.format).endOf('month');
			const week = moment(month, this.format).endOf('week');

			return {
				date: week,
				offset: week.diff(month, 'days')
			};
		},
		dates() {
			let result = [];

			const makeDate = (date, i, prev = false) => {
				let timestamp = date.date(i).format(this.format);

				return {
					timestamp,
					date: i,
					disabled: this.isDisabled(timestamp),
					selected: this.isSelected(timestamp),
					inRange: this.isInRange(timestamp),
					first: this.isFirst(timestamp),
					last: this.isLast(timestamp),
					prev
				};
			};

			const start = this.start.date;

			for (let i = this.start.offset; i <= this.start.count; i++) {
				result.push(makeDate(start, i, true));
			}

			const date = moment(this.currentDate, this.format);

			for (let i = 1; i <= date.daysInMonth(); i++) {
				result.push(makeDate(date, i));
			}

			const end = this.end.date;

			for (let i = 1; i <= this.end.offset; i++) {
				result.push(makeDate(end, i, true));
			}

			return result;
		},
		weeksCount() {
			return this.dates.length / 7;
		}
	},
	watch: {
		value(value) {
			if (value.length === 0) {
				return;
			}

			this.setDate({ value });
		},
		format() {
			if (this.value.length === 0) {
				return;
			}

			this.setDate({ value: this.value });
		}
	},
	methods: {
		setDate({ value, months = 0 }) {
			if (Array.isArray(value)) {
				if (value.length === 0) {
					value = moment().format(this.format);
				} else {
					value = value[0];
				}
			}

			value = months === 0
				? value
				: moment(value, this.format).add(months, 'months').format(this.format);

			this.currentDate = value;
		},
		nextDate() {
			this.setDate({ value: this.currentDate, months: 1 });
		},
		prevDate() {
			this.setDate({ value: this.currentDate, months: -1 });
		},
		isDisabled(timestamp) {
			if (!this.min && !this.max) {
				return false;
			}

			timestamp = moment(timestamp, this.format);

			let beforeMin = timestamp.isBefore(moment(this.min, this.format));
			let afterMax = timestamp.isAfter(moment(this.max, this.format));

			return beforeMin || afterMax;
		},
		isSelected(timestamp) {
			if (this.multiple || this.range) {
				return this.value.includes(timestamp);
			}

			return this.value === timestamp;
		},
		isInRange(timestamp) {
			if (!this.range || [0, 1].includes(this.value.length)) {
				return false;
			}

			const start = moment(this.value[0], this.format);
			const end = moment(this.value[1], this.format);

			return moment(timestamp, this.format).isBetween(start, end) || this.value.includes(timestamp);
		},
		isFirst(timestamp) {
			if (!this.range) {
				return false;
			}

			return this.value.indexOf(timestamp) === 0;
		},
		isLast(timestamp) {
			if (!this.range) {
				return false;
			}

			return this.value.indexOf(timestamp) === 1;
		},
		select(date) {
			if (this.isDisabled(date)) {
				return;
			}

			this.isSelected(date) ? this.remove(date) : this.add(date);
		},
		add(timestamp) {
			let value = timestamp;

			if (this.multiple) {
				value = this.value.length > 0
					? [].concat(this.value, [timestamp])
					: [timestamp];
			}

			if (this.range) {
				value = [0, 2].includes(this.value.length)
					? [timestamp]
					: [].concat(this.value, [timestamp]).sort((a, b) => {
						return moment(a, this.format).unix() - moment(b, this.format).unix();
					});
			}

			this.emitValue(value);
		},
		remove(timestamp) {
			let value = this.multiple || this.range
				? this.value.filter((row) => row !== timestamp)
				: '';

			this.emitValue(value);
		},
		emitValue(value) {
			this.$emit('input', value);
			this.$emit('change', value);
		},

		// --------- Template ---------

		genHead() {
			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__head` }, [
				this.genHeadButton(this.prevDate, 180),
				this.$createElement('div', { staticClass: `${CLASS_PREFIX}__caption` }, [this.caption]),
				this.genHeadButton(this.nextDate)
			]);
		},
		genHeadButton(click, rotate) {
			return this.$createElement(uiButton, {
				props: {
					small: true
				},
				on: {
					click
				}
			}, [
				this.$createElement(uiIcon, { props: { name: 'arrowhead', rotate } })
			]);
		},
		genContent() {
			const content = [this.genWeekDays()].concat(this.genDates());

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__dates` }, content);
		},
		genRow(content, head = false) {
			return this.$createElement('div', {
				class: {
					'row': true,
					'-head': head
				}
			}, content);
		},
		genDate(date, timestamp, options) {
			let on = {};

			if (timestamp) {
				on = {
					click: () => this.select(timestamp)
				};
			}

			let classes = {};

			if (options) {
				classes = {
					'-range': options.inRange,
					'-left': options.first,
					'-right': options.last,
					'-selected': options.selected,
					'-disabled': options.disabled,
					'-prev': options.prev
				};
			}

			return this.$createElement('div', { class: classes, on }, [
				this.$createElement('span', { attrs: { title: timestamp } }, [date])
			]);
		},
		genWeekDays() {
			return this.genRow(this.days.map((row) => this.genDate(row)), true);
		},
		genDates() {
			const offset = 7;

			let dates = this.dates.map(({ date, timestamp, ...options }) => this.genDate(date, timestamp, options));
			let result = [];

			for (let i = 0; i < this.weeksCount; i++) {
				const start = i * offset;
				const end = start + offset;

				result.push(this.genRow(dates.slice(start, end)));
			}

			return result;
		},
		genActionsSlot() {
			if (!this.$slots.actions) {
				return null;
			}

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__actions` }, this.$slots.actions);
		}
	},
	created() {
		if ((this.range || this.multiple) && !Array.isArray(this.value)) {
			consoleError('The prop "value" must be type of array', this);
		}

		moment.locale(this.$uikit.locale || 'ru');

		let value = this.value;

		if (this.value.length === 0) {
			value = moment().format(this.format);

			if (this.multiple) {
				value = [value];
			}

			if (this.range) {
				value = [value, value];
			}
		}

		this.setDate({ value });
	},
	render(h) {
		return h(this.tag, { staticClass: CLASS_PREFIX }, [
			this.genHead(),
			this.genContent(),
			this.genActionsSlot()
		]);
	}
}
