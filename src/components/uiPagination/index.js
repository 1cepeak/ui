import uiPagination from './uiPagination';

uiPagination.install = function install(Vue) {
	Vue.component(uiPagination.name, uiPagination);
};

export default uiPagination;
