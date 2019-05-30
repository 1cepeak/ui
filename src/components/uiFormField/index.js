import uiFormField from './uiFormField';

uiFormField.install = function install (Vue) {
	Vue.component(uiFormField.name, uiFormField);
};

export default uiFormField;