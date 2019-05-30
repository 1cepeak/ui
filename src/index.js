import * as components from './components';
import * as transitions from './transitions';
import * as directives from './directives';

function UIKit (Vue, args) {
    const UIKit = components.UIKit;

	UIKit.version = process.env.UIKIT_VERSION;

    Vue.use(UIKit, Object.assign({
		components: Object.assign({}, components, transitions),
		directives
	}, args));
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(UIKit);
}

export default UIKit;
