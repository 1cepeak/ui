import uiCalendar from './uiCalendar';

uiCalendar.install = function install(Vue) {
	Vue.component(uiCalendar.name, uiCalendar);
};

export default uiCalendar;
