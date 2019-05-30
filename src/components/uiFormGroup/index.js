import uiFormGroup from './uiFormGroup';

uiFormGroup.install = function install (Vue) {
	Vue.component(uiFormGroup.name, uiFormGroup);
};

export default uiFormGroup;