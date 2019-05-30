import uiApp from './uiApp';

uiApp.install = function install(Vue) {
	Vue.component(uiApp.name, uiApp);
};

export default uiApp;
