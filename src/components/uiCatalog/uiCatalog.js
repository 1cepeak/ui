import Mountable from '../../mixins/mountable';

import uiModal from '../uiModal';
import uiLoader from '../uiLoader';
import uiInput from '../uiInput';
import uiButton from '../uiButton';
import uiFormGroup from '../uiFormGroup';
import uiFormField from '../uiFormField';
import uiGrid from '../uiGrid';
import uiRow from '../uiRow';
import uiColumn from '../uiColumn';
import uiChip from '../uiChip';
import uiIcon from "../uiIcon";
import uiBreadcrumbs from '../uiBreadcrumbs';
import uiBreadcrumb from '../uiBreadcrumb';

export const CLASS_PREFIX = 'ag-catalog';

// @todo: Отрефакторить (много говна)

export default {
	name: 'ui-catalog',
	mixins: [
		Mountable
	],
	props: {
		value: {
			type: Array,
			required: true,
			default: () => ([]),
		},
		show: Boolean,
		loading: Boolean,
		saving: Boolean,
		multiple: Boolean,
		standalone: Boolean,
		options: {
			type: Array,
			required: true,
			default: () => ([]),
		},
		caption: String,
		placeholder: {
			type: String,
			default: 'Поиск'
		},
		searchText: {
			type: String,
			default: 'Найти'
		},
		saveText: {
			type: String,
			default: 'Выбрать'
		},
		clearText: {
			type: String,
			default: 'Очистить'
		},
		scrollText: {
			type: String,
			default: 'Наверх'
		},
		itemKey: {
			type: String,
			default: 'id'
		},
		itemName: {
			type: String,
			default: 'name'
		},
		itemDisabled: {
			type: String,
			default: 'disabled'
		},
		itemOptions: {
			type: String,
			default: 'items'
		},
		itemChildren: {
			type: String,
			default: 'children'
		},
		itemParent: {
			type: String,
			default: 'parent_id'
		}
	},
	data () {
		return {
			search: '',
			selected: null,
			scrollOffset: 0,
			currentWidth: 0,
			asideWidth: false
		};
	},
	computed: {
		filteredOptions () {
			let result = [];

			if (!this.selected) {
				result = this.options;
			} else {
				let children = this.getCategoryChildren(this.selected);
				let items = this.getCategoriesOptions([this.selected].concat(children));

				result = [].concat(children, items);
			}

			return result.filter(row => this.getName(row).toLowerCase().indexOf(this.search.toLowerCase()) > -1);
		},
		chars () {
			return this.filteredOptions.map(row => this.getFirstChar(row)).filter((value, index, self) => {
				return self.indexOf(value) === index;
			}).sort();
		},
		categories () {
			return this.options.filter(row => this.isCategory(row));
		},
		items () {
			return this.options.filter(row => !this.isCategory(row));
		},
		breadcrumbs () {
			let selected = this.selected;

			if (!selected) {
				return [];
			}

			let result = [selected];

			while (selected != null) {
				let parent = this.getParentCategory(selected);

				if (parent) {
					result.push(parent);
				}

				selected = parent ? Object.assign({}, parent) : null;
			}

			return result.reverse();
		},
		asideStyles () {
			return {
				width: `${this.asideWidth}px`
			};
		}
	},
	methods: {
		toggleHandler (value) {
			this.$emit('toggle', value);
		},
		scrollHandler (event) {
			const { scrollTop } = event.target;

			this.scrollOffset = scrollTop;
		},
		updatePositions () {
			if (!this.show || this.loading) {
				return;
			}

			const { aside } = this.$refs;

			const asidePadding = Number(window.getComputedStyle(aside.$el).getPropertyValue('padding-left').replace('px', ''));

			this.currentWidth = document.body.clientWidth;
			this.asideWidth = aside.$el.clientWidth - (asidePadding * 2);
		},
		scrollToSection (ref) {
			const el = this.$refs[ref];

			if (el && el.scrollIntoView) {
				el.scrollIntoView();
			}
		},
		getKey (item) {
			return item[this.itemKey];
		},
		getName (item) {
			return item[this.itemName];
		},
		getFirstChar (item) {
			return this.getName(item).trim().charAt(0);
		},
		getDisabled (item) {
			return item[this.itemDisabled];
		},
		getOptions (item) {
			return item[this.itemOptions];
		},
		getParentId (item) {
			return item[this.itemParent];
		},
		getChildren (item) {
			return item[this.itemChildren];
		},
		getParentCategory (category) {
			let result = this.categories.filter(row => this.getKey(row) == this.getParentId(category));

			return result.length > 0 ? result[0] : null;
		},
		getCategoryChildren (category) {
			let result = [];
			let children = this.getChildren(category);

			if (!!children && children.length > 0) {
				children = children.map(this.getKey);

				let categories = this.categories.filter(row => children.includes(this.getKey(row)));

				result = [].concat(categories);

				for (let i = 0; i < categories.length; i++) {
					result = [].concat(result, this.getCategoryChildren(categories[i]));
				}
			}

			return result;
		},
		getCategoryOptions (category) {
			let result = [];
			let options = this.getOptions(category);

			if (!!options && options.length > 0) {
				options = options.map(row => this.getKey(row));

				let items = this.items.filter(row => options.includes(this.getKey(row)));

				result = [].concat(items);
			}

			return result;
		},
		getCategoriesOptions (categories) {
			let result = [];

			categories.forEach(row => {
				result = [].concat(result, this.getCategoryOptions(row));
			});

			return result.filter((value, index, self) => self.indexOf(value) === index);
		},
		getItemsByChar (char) {
			return this.filteredOptions.filter(row => this.getFirstChar(row) === char).sort((a, b) => this.getName(a).localeCompare(this.getName(b)));
		},
		isCategory (item) {
			return !!this.getOptions(item);
		},
		isSelected (item) {
			let value = [].concat(this.value).map(row => this.getKey(row));

			return value.includes(this.getKey(item));
		},
		isDisabled (item) {
			return this.getDisabled(item);
		},
		click (item) {
			if (!this.isCategory(item)) {
				this.select(item);
				this.$emit('item-click', item);

				return;
			}

			this.search = '';
			this.selected = item;

			this.$emit('category-click', item);
		},
		select (item) {
			if (this.isDisabled(item) || this.isSelected(item)) {
				return;
			}

			let value = this.multiple ? [].concat(this.value) : [];

			value.push(item);

			this.$emit('input', value);
			this.$emit('change', value);
			this.$emit('select', item);
		},
		remove (item) {
			let value = [].concat(this.value).filter(row => this.getKey(row) != this.getKey(item));

			this.$emit('input', value);
			this.$emit('change', value);
			this.$emit('remove', item);
		},
		save () {
			this.$emit('save', this.value);
		},
		reset () {
			this.$emit('clear');
			this.$emit('input', []);
			this.$emit('change', []);
		},
		hide () {
			this.toggleHandler(false);
		},

		// -------- Template ----------

		genHeader () {
			return this.$createElement('div', {
				slot: 'info',
				ref: 'header',
				staticClass: `${CLASS_PREFIX}__header`,
				class: {
					sticky: this.scrollOffset > 0
				}
			}, [
				this.genSearch(),
				this.genBreadcrumbs(),
				this.genNavigation()
			]);
		},
		genSearch () {
			return this.$createElement(uiFormField, {}, [
				this.$createElement(uiFormGroup, { props: { join: true, stretch: true } }, [
					this.$createElement(uiInput, {
						props: {
							value: this.search,
							placeholder: this.placeholder,
							stretch: true,
							clearable: true
						},
						on: {
							input: value => this.search = value,
							clear: () => this.search = ''
						}
					}),
					this.$createElement(uiButton, {
						props: {
							primary: true,
							disabled: this.search.length == 0,
							icon: 'search'
						}
					}, [this.searchText])
				])
			]);
		},
		genBreadcrumbs () {
			if (this.breadcrumbs.length === 0 || this.loading) {
				return null;
			}

			const click = (item, last) => {
				if (last) {
					return;
				}

				this.selected = item;
			};

			let breadcrumbs = [
				this.$createElement(uiBreadcrumb, {
					props: { tag: 'a' },
					on: { click: click.bind(this, null, false) }
				}, [this.caption]),
			];

			this.breadcrumbs.forEach((row, index) => {
				const isLast = index === this.breadcrumbs.length - 1;

				breadcrumbs.push(this.$createElement(uiBreadcrumb, {
					props: { tag: 'a', active: isLast },
					on: { click: click.bind(this, row, isLast) }
				}, [this.getName(row)]));
			});

			return this.$createElement(uiBreadcrumbs, { staticClass: `${CLASS_PREFIX}__breadcrumbs` }, breadcrumbs);
		},
		genNavigation () {
			if (this.loading) {
				return null;
			}

			let buttons = [];

			this.chars.forEach(char => {
				buttons.push(this.$createElement(uiButton, {
					staticClass: `${CLASS_PREFIX}__navigation-item`,
					on: {
						click: this.scrollToSection.bind(this, `char${char}`),
					},
					props: {
						rounded: true
					}
				}, [char.toUpperCase()]));
			});

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__navigation` }, buttons);
		},
		genLoader () {
			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__loader` }, [
				this.$createElement(uiLoader)
			]);
		},
		genLoadableContent () {
			if (this.loading) {
				return this.genLoader();
			}

			return this.genContent();
		},
		genContent () {
			return this.$createElement(uiGrid, {
				staticClass: `${CLASS_PREFIX}__content`
			}, [
				this.$createElement(uiRow, {}, [
					this.genList(),
					this.genAside()
				])
			]);
		},
		genList () {
			let list = [];

			this.chars.forEach(char => {
				list.push(this.genSection(char));
			});

			return this.$createElement(uiColumn, { props: { md: 6 } }, list);
		},
		genSection (char) {
			let items = this.getItemsByChar(char);
			let item = null;
			let list = [];

			items.forEach(row => {
				const label = this.getName(row);

				if (this.isCategory(row)) {
					item = this.$createElement('div', {
						staticClass: `${CLASS_PREFIX}__section-item`,
						on: {
							click: this.click.bind(this, row)
						}
					}, [
						this.$createElement(uiIcon, { props: { name: 'arrowhead' } }),
						this.$createElement('b', {}, [label])
					]);
				}
				else if (this.isSelected(row)) {
					item = this.$createElement(uiChip, {
						props: {
							removable: true
						},
						on: {
							remove: this.remove.bind(this, row)
						}
					}, [label]);
				}
				else {
					item = this.$createElement('div', {
						staticClass: `${CLASS_PREFIX}__section-item`,
						on: {
							click: this.click.bind(this, row)
						}
					}, [label])
				}

				list.push(this.$createElement(uiColumn, { props: { xs: 6 } }, [item]));
			});

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__section` }, [
				this.$createElement('div', {
					ref: `char${char}`,
					staticClass: `${CLASS_PREFIX}__section-title`
				}, [char.toUpperCase()]),

				this.$createElement(uiGrid, {}, [
					this.$createElement(uiRow, {}, list)
				])
			]);
		},
		genAside () {
			return this.$createElement(uiColumn, {
				ref: 'aside',
				props: {
					md: 6
				}
			}, [
				this.$createElement('div', {
					staticClass: `${CLASS_PREFIX}__aside`,
					class: {
						active: this.value.length > 0
					},
					style: this.asideStyles
				}, [
					this.genTitleSlot(),
					this.genItems(),
					this.genControls()
				])
			]);
		},
		genTitleSlot () {
			if (!this.$slots.title) {
				return null;
			}

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__aside-title` }, [this.$slots.title]);
		},
		genItems () {
			let items = [];

			this.value.forEach(row => {
				items.push(this.$createElement(uiChip, {
					props: {
						removable: true
					},
					on: {
						remove: this.remove.bind(this, row)
					}
				}, [this.getName(row)]));
			});

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__aside-items` }, items);
		},
		genControls () {
			if (this.value.length === 0) {
				return null;
			}

			return this.$createElement('div', { staticClass: `${CLASS_PREFIX}__aside-controls` }, [
				this.$createElement(uiButton, {
					on: { click: this.reset.bind(this) }
				}, [this.clearText]),
				this.$createElement(uiButton, {
					props: {
						loading: this.saving,
						primary: true
					},
					on: { click: this.save.bind(this) }
				}, [this.saveText])
			]);
		},
		genScrollTopButton () {
			if (this.scrollOffset < 200) {
				return null;
			}

			return this.$createElement(uiButton, {
				slot: 'actions',
				props: {
					stretch: true
				},
				on: {
					click: () => this.$refs.modal.$refs.body.scrollTop = 0
				}
			}, [
				this.$createElement(uiIcon, { props: { name: 'arrow', rotate: 270 } }),
				this.$createElement('span', {}, [this.scrollText])
			]);
		}
	},
	mounted () {
		this.updatePositions();

		this.$nextTick(this.updatePositions);

		window.addEventListener('resize', this.updatePositions);
	},
	updated () {
		this.updatePositions();
	},
	beforeDestroy () {
		window.removeEventListener('resize', this.updatePositions);
	},
	render (h) {
		// @todo: Сделать так чтобы компонент мог рендериться не только в модалке

		return h(uiModal, {
			ref: 'modal',
			staticClass: `${CLASS_PREFIX}__modal`,
			props: {
				caption: this.caption,
				show: this.show,
				stretch: true,
				mountElement: this.mountElement
			},
			on: {
				toggle: this.toggleHandler,
				scroll: this.scrollHandler
			}
		}, [
			this.genHeader(),
			this.genLoadableContent(),
			this.genScrollTopButton()
		]);
	}
}
