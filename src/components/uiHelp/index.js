import uiHelp from './uiHelp';

uiHelp.install = function install (Vue) {
	Vue.component(uiHelp.name, uiHelp);
};

export default uiHelp;