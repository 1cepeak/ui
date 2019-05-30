import uiChip from './uiChip';

uiChip.install = function install (Vue) {
	Vue.component(uiChip.name, uiChip);
};

export default uiChip;