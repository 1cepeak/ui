import { consoleWarn } from '../utils/console';

function generateWarning (child, parent) {
	return () => consoleWarn(`The ${child} component must be used inside a ${parent}`);
}

export function inject (namespace, child, parent) {
	const defaultImpl = child && parent ? {
		register: generateWarning(child, parent),
		unregister: generateWarning(child, parent)
	} : null;

	return {
		inject: {
			[namespace]: {
				default: defaultImpl
			}
		}
	};
}

export function provide (namespace) {
	return {
		methods: {
			register: null,
			unregister: null
		},
		provide () {
			return {
				[namespace]: {
					register: this.register,
					unregister: this.unregister
				}
			};
		}
	};
}