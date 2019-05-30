import uiTicket from './uiTicket';

uiTicket.install = function install(Vue) {
	Vue.component(uiTicket.name, uiTicket);
};

export default uiTicket;
