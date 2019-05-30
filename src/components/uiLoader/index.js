import uiLoader from './uiLoader';

uiLoader.install = function install (Vue) {
	Vue.component(uiLoader.name, uiLoader);
};

export default uiLoader;