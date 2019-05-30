import uiButton from './uiButton';

uiButton.install = function install (Vue) {
	Vue.component(uiButton.name, uiButton);
};

export default uiButton;