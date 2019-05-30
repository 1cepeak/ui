import uiMenuItem from './uiMenuItem';

uiMenuItem.install = function install (Vue) {
	Vue.component(uiMenuItem.name, uiMenuItem);
};

export default uiMenuItem;