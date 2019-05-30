import uiFormGroupConnector from './uiFromGroupConnector';

uiFormGroupConnector.install = function install (Vue) {
	Vue.component(uiFormGroupConnector.name, uiFormGroupConnector);
};

export default uiFormGroupConnector;