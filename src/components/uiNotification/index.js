import uiNotification from './uiNotification';

uiNotification.install = function install (Vue) {
	Vue.component(uiNotification.name, uiNotification);
};

export default uiNotification;