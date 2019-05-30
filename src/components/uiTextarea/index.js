import uiTextarea from './uiTextarea';

uiTextarea.install = function install (Vue) {
	Vue.component(uiTextarea.name, uiTextarea);
};

export default uiTextarea;