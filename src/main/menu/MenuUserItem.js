import MenuItem from './MenuItem';

export default class MenuUserItem extends MenuItem {
	constructor() {
		let config = {
			id: 'plg_user',
			icon: 'fa-user',
			name: window.user.username
		};

		super(config);


		this._item.classList.add('menu__item--user');
	}
}