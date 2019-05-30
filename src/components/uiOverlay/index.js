import uiOverlay from './uiOverlay';

uiOverlay.install = function install (Vue) {
	Vue.component(uiOverlay.name, uiOverlay);
};

export default uiOverlay;