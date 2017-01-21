import MenuItem from './MenuItem';
import Clock from '../clock/Clock';

import './floatingMenu.scss';

window.ui = window.ui || {};

(function (floatingMenu) {
	let overlayElement;
	let clock;
	let appBar;
	let widgets;

	function initTop() {
		let topFlex = document.createElement('div');
		topFlex.className = 'menu--overlay__top';

		let flexTopLeft = document.createElement('div');
		flexTopLeft.className = 'menu--overlay__top--left';
		topFlex.appendChild(flexTopLeft);

		let flexTopCenter = document.createElement('div');
		flexTopCenter.className = 'menu--overlay__top--center';
		topFlex.appendChild(flexTopCenter);

		let flexTopRight = document.createElement('div');
		flexTopRight.className = 'menu--overlay__top--right';
		topFlex.appendChild(flexTopRight);

			let clockElement = document.createElement('div');
				clockElement.className = 'menu--overlay__clock';
				clock = new Clock(clockElement);
			flexTopCenter.appendChild(clockElement);

			let userIconContainer = document.createElement('div');
			userIconContainer.className = 'menu--overlay__user';
				let userIcon = document.createElement('i');
					userIcon.className = 'fa fa-user';
				userIconContainer.appendChild(userIcon);
				userIconContainer.onclick = function() {
					window.actions.openPlugin('plg_user');
				};
			flexTopRight.appendChild(userIconContainer);
		overlayElement.appendChild(topFlex);
	}

	floatingMenu.init = function() {
        if(!overlayElement) {
            overlayElement = document.createElement('div');
            overlayElement.className = 'menu--overlay';

            initTop();

			appBar = document.createElement('div');
			appBar.className = 'menu--overlay__apps';
			overlayElement.appendChild(appBar);

			widgets = document.createElement('div');
			widgets.className = 'menu--overlay__widgets';
			overlayElement.appendChild(widgets);
        }

        widgets.innerHTML = '';
        let musicUi = window.ui.audioPlayer.getUi();
        musicUi.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
		widgets.appendChild(musicUi);
	};

	floatingMenu.show = function() {
        floatingMenu.init();
		clock.start();

        window.overlay.show(floatingMenu.hide, {
        	content: overlayElement
		});
	};

	floatingMenu.hide = function() {
		clock.stop();

		window.overlay.hide();
	};
})(window.ui.floatingMenu = window.ui.floatingMenu || {});

export default class MenuMoreItem extends MenuItem {
	constructor() {
		let config = {
			id: 'plg_user',
			icon: 'fa-plus',
			name: window.user.username,
			onclick: MenuMoreItem.openCentral,
			ontouchstart: MenuMoreItem.openCentral
		};

		super(config);


		this._item.classList.add('menu__item--more');
	}

	static openCentral() {
		window.ui.floatingMenu.show();

		return false;
	}
}