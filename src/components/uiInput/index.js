import uiInput from './uiInput';

uiInput.install = function install (Vue) {
	Vue.component(uiInput.name, uiInput);
};

export default uiInput;