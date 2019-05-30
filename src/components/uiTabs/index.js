import uiTabs from './uiTabs';

uiTabs.install = function install (Vue) {
	Vue.component(uiTabs.name, uiTabs);
};

export default uiTabs;