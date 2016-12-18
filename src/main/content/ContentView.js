import CallbackHelper from '../../utils/CallbackHelper';

import '../../jui/custom/AutoInput';
import '../../jui/custom/ButtonList';
import '../../jui/custom/Editor';

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

		window.jui.init(this._content);
		window.jui.clean();

		window.jui.registerCustomElement('buttonlist', window.buttonlist,'bl');
		window.jui.registerCustomElement('editor', window.editor,'ed');
		window.jui.registerCustomElement('autoinput', window.autoinput,'ai');

		window.jui.setSubmitCallback(function(formData, name, element) {
			if(element.classList.contains('editor') && element.querySelector('.html') != null) {
				if(!window.jui.tools.empty(element.querySelector('.html').innerHTML)) {
					formData.append(name, element.querySelector('.html').innerHTML);
				}
			}
		});

		window.jui.action.addAction('openPlugin', window.actions.openPlugin);

		window.socket.on('plugin', this.parse.bind(this));
	}

	parseState(state) {
		if (state == null) {
			this.openHome();
		} else {
			this.loadPlugin();
		}
	}

	parse(data) {
		console.log('data', data.request, data.response);
		this._content.innerHTML = '';
		window.jui.parse(data.response, null, true);

		clearTimeout(this._timeout);
		window.loadingIndicator.hide('plugin');
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
		this._timeout = window.setTimeout(() => {
			window.loadingIndicator.show('plugin');
		}, 200);

		window.socket.emit('plugin', {
			name: name,
			view: view,
			param: param
		});
	}
}