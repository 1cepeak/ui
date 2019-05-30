import { factory as ButtonIconFactory } from '../../mixins/button-icon';

export default {
	name: 'ui-button-like',
	mixins: [
		ButtonIconFactory('like', 'like-filled', 'liked')
	]
}