import uiError from './uiError';

uiError.install = function install (Vue) {
	Vue.component(uiError.name, uiError);
};

export default uiError;