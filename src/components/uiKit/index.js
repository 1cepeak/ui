import application from './mixins/application';

const UIKit = {
	install(Vue, opts = {}) {
		if (this.installed) {
			return;
		}

		this.installed = true;

		Vue.prototype.$uikit = new Vue({
			data: {
				application
			}
		});

		if (opts.components) {
			Object.values(opts.components).forEach(component => {
				Vue.use(component);
			});
		}

		if (opts.directives) {
			Object.values(opts.directives).forEach(directive => {
				Vue.use(directive);
			});
		}
	}
};

export default UIKit;
