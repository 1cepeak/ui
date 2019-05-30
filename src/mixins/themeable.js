import { consoleError } from '../utils/console';

import { CLASS_PREFIX } from './colorable';

export function factory(classPrefix, customThemes = []) {
	if (!classPrefix) {
		consoleError('The argument "classPrefix" is not defined');

		return;
	}

	const themes = [
		'primary',
		'secondary',
		'danger',
		'success',
		'warning',
		'info'
	].concat(customThemes);

	let props = {};

	themes.forEach((theme) => {
		props[theme] = Boolean;
	});

	return {
		props: Object.assign({ theme: String }, props),
		computed: {
			themesClasses() {
				let classes = {};

				themes.forEach((theme) => {
					classes[`${classPrefix}--${theme} -${theme}`] = this[theme] || this.theme === theme;
				});

				return classes;
			}
		}
	};
}

export default factory(CLASS_PREFIX);
