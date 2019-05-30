/**
 * @type {string}
 */
export const appSelector = '#app';

/**
 * @param selector
 * @return {HTMLElement}
 */
export function getApp(selector) {
	return document.querySelector(selector || appSelector) || document.body;
}

/**
 * @param {HTMLElement} el
 * @param {?string} customSelector
 */
export function appendElement(el, customSelector = null) {
	const app = getApp(customSelector);

	app.appendChild(el);
}

/**
 *
 * @param {string} c
 * @param {string} el
 * @param {string} name
 * @return {object}
 */
export function createSimpleFunctional(c, el = 'div', name) {
	name = name || c.replace(/__/g, '-');
	name = name.split('-')[0] === 'ui' ? name : `ui-${name}`;

	return {
		name,
		functional: true,
		render(h, { data, children }) {
			data.staticClass = (`${c} ${data.staticClass || ''}`).trim();

			return h(el, data, children);
		}
	}
}

/**
 * @param {string} name
 * @param {string} origin
 * @param {string} mode
 * @return {object}
 */
export function createSimpleTransition(name, origin = 'top center 0', mode) {
	return {
		name,
		functional: true,
		props: {
			origin: {
				type: String,
				default: origin
			}
		},
		render(h, context) {
			context.data = context.data || {};
			context.data.props = { name };
			context.data.on = context.data.on || {};

			if (!Object.isExtensible(context.data.on)) {
				context.data.on = Object.assign({}, context.data.on);
			}

			if (mode) {
				context.data.props.mode = mode;
			}

			context.data.on.beforeEnter = (el) => {
				el.style.transformOrigin = el.style.webkitTransformOrigin = context.props.origin;
			};

			return h('transition', context.data, context.children);
		}
	};
}

/**
 * Коды клавиш
 * @type {Readonly<{enter: number, tab: number, delete: number, esc: number, space: number, up: number, down: number, left: number, right: number, end: number, home: number, del: number, backspace: number, insert: number, pageUp: number, pageDown: number}>}
 */
export const keyCodes = Object.freeze({
	enter: 13,
	tab: 9,
	delete: 46,
	esc: 27,
	space: 32,
	up: 38,
	down: 40,
	left: 37,
	right: 39,
	end: 35,
	home: 36,
	del: 46,
	backspace: 8,
	insert: 45,
	pageUp: 33,
	pageDown: 34
});

/**
 * Брейкпоинты для сетки
 * @type {Readonly<{xss: number, xs: number, xsm: number, sm: number, md: number, lg: number, xl: number}>}
 */
export const gridBreakpoints = Object.freeze({
	xss: 0,
	xs: 450,
	xsm: 620,
	sm: 768,
	md: 980,
	lg: 1200,
	xl: 1440
});

/**
 * Цвета
 * @type {ReadonlyArray<string>}
 */
export const colors = Object.freeze([
	'alabaster',
	'gallery',
	'alto',
	'solitude',
	'link-water',
	'mystic',
	'alto-dark',
	'silver',
	'cadet-blue',
	'silver-chalice',
	'gull-gray',
	'blue-rock',
	'nepal',
	'regent-gray',
	'manatee',
	'gray',
	'dove-gray',
	'river-bed',
	'malibu',
	'cornflower-blue',
	'blue-ribbon',
	'governor-blue',
	'cloud-burst',
	'martinique',
	'crimson',
	'salmon',
	'tango',
	'texas-rose',
	'jungle-green',
	'forest-green',
	'black',
	'white',
	'disabled',
	'link',
	'secondary',
	'secondary-dark',
	'secondary-light',
	'primary',
	'primary-dark',
	'danger',
	'danger-dark',
	'warning',
	'warning-dark',
	'success',
	'success-dark',
	'info',
	'info-dark',
	'shadow',
	'shadow-dark',
	'soft-light',
	'soft-dark',
	'soft-info',
	'notify-primary',
	'notify-warning',
	'notify-danger',
	'notify-success',
	'blocks-border',
	'drophint-dark',
	'drophint-dark-border',
	'instagram',
	'vk',
	'youtube',
	'twitter',
	'facebook',
	'ok'
]);

/**
 * Иконки
 * @type {ReadonlyArray<string>}
 */
export const icons = Object.freeze([
	'add-record',
	'added-tax',
	'agro24',
	'app-auction',
	'app-deals',
	'app-more',
	'app-requests',
	'app-search',
	'arrow-angled',
	'arrow-circled',
	'arrow-dropdown',
	'arrow-long',
	'arrow-medium',
	'arrow-thin',
	'arrow',
	'arrowhead',
	'auction',
	'bank',
	'barcode',
	'bell',
	'binoculars',
	'box',
	'boxes-pack',
	'boxes-pallet',
	'boxes',
	'calculator',
	'calendar',
	'camcorder-filled',
	'camcorder',
	'cards',
	'cart-buy',
	'cart-purchases',
	'cart-sell',
	'cart',
	'certificate',
	'clock-ringing',
	'clock',
	'comment-bubble',
	'comment-typing',
	'comment',
	'comments',
	'computer',
	'contact-book',
	'cross-circled',
	'cross',
	'dashboard',
	'diagram-circle',
	'diagram-framed',
	'diagram-horizontal',
	'diagram',
	'diamond',
	'dots',
	'download',
	'draggable',
	'drop-box',
	'envelope',
	'facebook',
	'favorites-filled',
	'favorites',
	'field-hide',
	'field-show',
	'file-filled',
	'filters',
	'finances',
	'flag',
	'gear',
	'gift-hand',
	'gift-opened',
	'gift',
	'globe',
	'google-plus',
	'guarantee',
	'home',
	'hot',
	'hourglass',
	'info-circled',
	'instagram',
	'invoice',
	'key',
	'layers',
	'leader',
	'lifebuoy',
	'like-filled',
	'like',
	'linkedin',
	'list-view',
	'list',
	'lock-closed',
	'lock-filled',
	'lock-opened',
	'lock',
	'mail-ru',
	'man-add',
	'man',
	'minus-circled',
	'minus',
	'newspaper',
	'night-sky',
	'notifications',
	'ok',
	'one-circled',
	'open-link',
	'paper',
	'papers',
	'pause-circled',
	'payment-deferred',
	'payment',
	'pencil-filled',
	'pencil',
	'people',
	'percentages',
	'phone-ringing',
	'phone',
	'photo-camera',
	'play-circled',
	'play-outlined',
	'play-squared',
	'play',
	'plus-circled',
	'plus-dashed',
	'plus',
	'pointer-circled',
	'pointer-click',
	'pointer-framed',
	'pointer-position',
	'pointer',
	'pointers',
	'popup-message',
	'portfolio',
	'prepayment',
	'purse',
	'question-circled',
	'question-filled',
	'question',
	'quote',
	'recipe',
	'repeat',
	'search-alt',
	'search',
	'searching',
	'settings',
	'share-link',
	'share',
	'shipment',
	'shipping-include',
	'siren',
	'sort-desc',
	'sort',
	'star-circled',
	'star-filled',
	'star-glow',
	'star',
	'stop-circled',
	'table-view',
	'tag-star',
	'tag',
	'telephone',
	'thumb-up',
	'tick-circled',
	'tick',
	'ticket',
	'tiles-view',
	'time-left',
	'time-over',
	'timer',
	'trash',
	'truck-delivery',
	'truck',
	'twitter',
	'unfold',
	'up-n-down',
	'upload',
	'urgency',
	'verified',
	'views',
	'visual-view',
	'vk',
	'warning-circled',
	'warning',
	'wiki',
	'winner',
	'youtube'
]);

/**
 * Проверяет соответствует ли текущее разрешение экрана указанному брейкпойнту
 * @param {string} breakpoint
 * @return {boolean}
 */
export function matchMedia(breakpoint) {
	const width = gridBreakpoints[breakpoint];

	if (!width) {
		return false;
	}

	return window.matchMedia(`(max-width: ${width}px)`).matches;
}

/**
 * Проверяет userAgent устройства
 * @return {boolean}
 */
export function detectMobile() {
	const condition1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
	const condition2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;

	return condition1.test(userAgent) || condition2.test(userAgent.substr(0,4));
}

/**
 * @param {number} str
 * @param {* | string} unit
 * @return {string}
 */
export function convertToUnit(str, unit = 'px') {
	return isNaN(str) ? str : `${Number(str)}${unit}`;
}

/**
 * @param {string} str
 * @return {string}
 */
export function kebabCase(str) {
	return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 *
 * @type {string}
 */
export const overflowClass = '-overflow-hidden';

/**
 * Блокирует скрол страницы
 * @param {boolean} value
 */
export function scrollLock(value) {
	if (!document) {
		return;
	}

	if (value) {
		document.body.classList.add(overflowClass);
	} else {
		document.body.classList.remove(overflowClass);
	}
}

/**
 * Скрол уже заблокирован (да / нет)
 * @return {boolean}
 */
export function hasScrollAlreadyLocked() {
	if (!document) {
		return false;
	}

	return document.body.classList.contains(overflowClass)
}

/**
 * Генерирует рандомный хэш заданной длинны
 * @param {string | null} prefix
 * @param {number} length
 * @return {string}
 */
export function makeHash(prefix = null, length = 12) {
	const alpha = 'abcdefghikjlmnopqrstuvwxyz';
	const query = `123456789${alpha}` + alpha.toLocaleUpperCase();

	let result = prefix || '';

	for (let i = 0; i < length; i++) {
		result += query.charAt(Math.round(Math.random() * query.length));
	}

	return result;
}
