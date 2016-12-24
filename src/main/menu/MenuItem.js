export default class MenuItem {
	constructor(config) {
		this._item 		= document.createElement('div');
			this._item.className = 'menu__item';

		this._itemIcon 	= document.createElement('div');
			this._itemIcon.className = 'menu__item--icon';
		this._itemName 	= document.createElement('div');
			this._itemName.className = 'menu__item--name';

		this._item.appendChild(this._itemIcon);
		this._item.appendChild(this._itemName);


		if(!config || !config.id) {
			this._item = null;
			return;
		}

		this._item.addEventListener('click', () => {
			window.actions.openPlugin(config.id);
		});

		if(config.icon) {
			this.setIcon(config.icon);
		}

		this.setName(config.name || config.id);
	}

	setName(name) {
		this._itemName.appendChild(document.createTextNode(name));
	}

	setIcon(icon) {
		if(icon) {
			if(icon.startsWith('fa-')) {
				this._itemIcon.classList.add('menu__item--fa');

				let i = document.createElement('i');
				i.classList.add('fa');
				i.classList.add(icon);

				this._itemIcon.appendChild(i);
			} else {
                this._itemIcon.style.backgroundImage = `url('${window.user.server}/${icon}')`;
			}
        }
	}

	getNode() {
		return this._item;
	}
}