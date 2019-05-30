import uiGrid from './uiGrid';

uiGrid.install = function install (Vue) {
	Vue.component(uiGrid.name, uiGrid);
};

export default uiGrid;