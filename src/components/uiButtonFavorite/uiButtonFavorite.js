import { factory as ButtonIconFactory } from '../../mixins/button-icon';

export default {
	name: 'ui-button-favorite',
	mixins: [
		ButtonIconFactory('star', 'star-filled', 'favorite')
	]
}