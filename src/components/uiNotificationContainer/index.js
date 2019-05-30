import uiNotificationContainer from './uiNotificationContainer';

uiNotificationContainer.install = function(Vue) {
	Vue.component(uiNotificationContainer.name, uiNotificationContainer);
};

export default uiNotificationContainer;
