import uiHeading from './uiHeading';

uiHeading.install = function install (Vue) {
	Vue.component(uiHeading.name, uiHeading);
};

export default uiHeading;