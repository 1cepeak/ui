import uiModal from './uiModal';

uiModal.install = function install (Vue) {
	Vue.component(uiModal.name, uiModal);
};

export default uiModal;