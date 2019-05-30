import uiTab from './uiTab';

uiTab.install = function install (Vue) {
	Vue.component(uiTab.name, uiTab);
};

export default uiTab;