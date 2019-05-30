import { getApp } from '../../utils/helpers';

function closeConditional () {
	return false;
}

function directive (e, el, binding) {
	binding.args = binding.args || {};

	const isActive = (binding.args.closeConditional || closeConditional);

	if (!e || isActive(e) === false) {
		return;
	}

	if (('isTrusted' in e && !e.isTrusted) || ('pointerType' in e && !e.pointerType)) {
		return;
	}

	const elements = (binding.args.include || (() => []))();

	elements.push(el);

	binding.value(e);

	!clickedInEls(e, elements) && isActive(e) && binding.value(e);
}

function clickedInEls (e, elements) {
	const { clientX: x, clientY: y } = e;

	for (const el of elements) {
		if (clickedInEl(el, x, y)) return true;
	}

	return false;
}

function clickedInEl (el, x, y) {
	const rect = el.getBoundingClientRect();

	return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

export default {
	name: 'click-outside',
	inserted (el, binding) {
		const onClick = e => directive(e, el, binding);

		const app = getApp('body');

		app.addEventListener('click', onClick, true);

		el._clickOutside = onClick;
	},
	unbind (el) {
		const app = getApp('body');

		app && app.removeEventListener('click', el._clickOutside, true);

		delete el._clickOutside;
	}
}
