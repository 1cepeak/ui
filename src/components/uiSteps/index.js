import uiSteps from './uiSteps';

uiSteps.install = function install(Vue) {
	Vue.component(uiSteps.name, uiSteps);
};

export default uiSteps;
