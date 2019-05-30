import uiMenu from './uiMenu';

uiMenu.install = function install (Vue) {
	Vue.component(uiMenu.name, uiMenu);
};

export default uiMenu;