import CallbackHelper from '../../utils/CallbackHelper';

import './ContentView.scss';

export default class ContentView {
	constructor() {
		this._content = document.createElement('div');
			this._content.className = 'content content--hide';
		document.body.appendChild(this._content);


		// window.addEventListener('popstate', (e) => {
		// 	var character = e.state;
		//
		// 	this.parseState(character);
		// });
		//
		// CallbackHelper.register('popstate', (data) => {
		// 	this.parseState(data);
		// }, true);

		window.addEventListener('hashchange', () => {
			this.hashChanged(this.getHash());
		});

		this.hashChanged(this.getHash());
	}

	parseState(state) {
		if (state == null) {
			this.openHome();
		} else {
			console.log(state);

			this.loadPlugin();
		}
	}

	show() {
		this._show = true;
		this._content.classList.remove('content--hide');
		this.hashChanged(this.getHash());
	}

	hide() {
		this._show = false;
		this._content.classList.add('content--hide');
		this.hashChanged(this.getHash());
	}

	hashChanged(pHash) {
		if(!this._show) return;

		let hash = pHash.split('/');

		let pluginId = 'Home';

		if(pHash == '') {
			this.openHome();
		} else if(hash.length < 3) {
			this.loadPlugin(hash[0], hash[1]);
		} else {
			let plugin = hash[0];
			let view = hash[1];

			hash.splice(0,2);

			let urlParam = hash.join('/');

			this.loadPlugin(plugin, view, urlParam);
		}
	}

	getHash()
	{
		var hash = location.hash; // get the hash

		if(hash.indexOf('#') == 0) // when a hash(#) is in front of the real hash
		{
			hash = hash.substr(1, hash.length); // delete the hash(#) in front of the hash
		}

		return hash;
	}

	openHome() {
		this._content.appendChild(document.createTextNode('Home'));
	}

	loadPlugin(name, view, param) {
		this._content.appendChild(document.createTextNode(name + ':' + view + ':' + param));
	}
}