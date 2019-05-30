import { scrollLock, hasScrollAlreadyLocked } from '../utils/helpers';
import { consoleError } from '../utils/console';

export function factory(watchProp) {
	if (typeof watchProp !== 'string') {
		consoleError('The argument "watchProp" must be type of string');
	}

	return {
		data: () => ({
			disableScrollLock: false
		}),
		watch: {
			[watchProp](value) {
				if (!this.disableScrollLock) {
					scrollLock(value);
				}
			}
		},
		created() {
			if (!this.hasOwnProperty(watchProp)) {
				consoleError(`The data attribute "${watchProp}" in not exists`, this);
			}
		},
		mounted() {
			if (hasScrollAlreadyLocked()) {
				this.disableScrollLock = true;
			} else {
				scrollLock(this[watchProp]);
			}
		}
	};
}

export default factory('isActive');
