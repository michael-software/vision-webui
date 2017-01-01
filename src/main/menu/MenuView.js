import MenuItem from './MenuItem';
import MenuUserItem from './MenuMoreItem';
import './MenuView.scss';

export default class MenuView {
	constructor() {
	}

	initMenu() {
		if(!this._menuContainer && !document.querySelector('.menu--container')) {
			this._menuContainer = document.createElement('div');
				this._menuContainer.className = 'menu--container';
			this._menu = document.createElement('div');
				this._menu.className = 'menu';
			this._menuContainer.appendChild(this._menu);
			this._menuContainer.addEventListener("mousewheel", (event) => {
				event.preventDefault();
				this._menu.scrollLeft += event.deltaY;
			}, false);
			document.body.appendChild(this._menuContainer);
		} else if(document.querySelector('.menu--container')) {
			this._menuContainer = document.querySelector('.menu--container');
            this._menu = this._menuContainer.querySelector('.menu');

            this._menu.innerHTML = '';
		}
	}

	load() {
		this.loadPlugins();
	}

	loadPlugins() {
		window.socket.emit('plugins', 'true');

		window.socket.on('plugins', (data) => {
			this.initMenu();

            let menuItem = new MenuUserItem();
            this._menu.appendChild(menuItem.getNode());

			data.map((element) => {
				if(element.id != 'plg_order' && element.id != 'plg_user') {
					let menuItem = new MenuItem(element);
					this._menu.appendChild(menuItem.getNode());
				}
			})
		});
	}
}