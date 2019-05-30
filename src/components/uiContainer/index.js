import uiContainer from './uiContainer';

uiContainer.install = function install (Vue) {
	Vue.component(uiContainer.name, uiContainer);
};

export default uiContainer;