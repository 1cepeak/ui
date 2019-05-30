import uiCatalog from './uiCatalog';

uiCatalog.install = function install (Vue) {
	Vue.component(uiCatalog.name, uiCatalog);
};

export default uiCatalog;