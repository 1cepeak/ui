import ClickOutside from './vClickOutside';

ClickOutside.install = function(Vue) {
	Vue.directive(ClickOutside.name, ClickOutside);
};

export default ClickOutside;
