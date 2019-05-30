import uiTag from './uiTag';

uiTag.install = function install (Vue) {
	Vue.component(uiTag.name, uiTag);
};

export default uiTag;