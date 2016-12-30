import CallbackHelper from '../../utils/CallbackHelper';
import SocketHelper from '../../utils/SocketHelper';

import '../../jui/custom/AutoInput';
import '../../jui/custom/ButtonList';
import '../../jui/custom/Editor';

import '../actions/gallery';

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

		CallbackHelper.register('reloadContent', this.reloadContent.bind(this));

		window.addEventListener('hashchange', () => {
			this.hashChanged(this.getHash());
		});

		this.hashChanged(this.getHash());

		window.jui.init(this._content);
		window.jui.clean();

		window.jui.registerCustomElement('buttonlist', window.buttonlist,'bl');
		window.jui.registerCustomElement('editor', window.editor,'ed');
		window.jui.registerCustomElement('autoinput', window.autoinput,'ai');

		window.jui.addOnBeforeParseListener(this._beforeParse.bind(this));

		window.jui.setSubmitCallback(function(formData, name, element) {
			if(element.classList.contains('editor') && element.querySelector('.html') != null) {
				if(!window.jui.tools.empty(element.querySelector('.html').innerHTML)) {
					formData[name] = element.querySelector('.html').innerHTML;
				}
			}
		});

		window.jui.setHeadCallback(this.parseHead.bind(this));

		window.jui.action.addAction('openPlugin', window.actions.openPlugin);
        window.jui.action.addAction('openMedia', window.actions.openMedia);
		window.jui.action.addAction('openGallery', (gallery, index) => {
			var header = this._juiHead;

			if(gallery && header && header[gallery]) {
				console.log('openGallery', header[gallery]);
				window.gallery.open(header[gallery], index);
			}
		});

		window.jui.addEventListener('submit', this.postCallback.bind(this));

		window.socket.on('plugin', this.parse.bind(this));
	}

    postCallback(formObj) {
		let array = {};

		console.log(formObj);

		for(let key in formObj) {
			if(!formObj.hasOwnProperty(key)) continue;

			let value = formObj[key];

			if(value instanceof FileList) {
				let fileValue = {type: 'filelist'};

				for(let i = 0, z = value.length; i < z; i++) {
					let fileId = null;

                    fileId = SocketHelper.uploadFile(window.socket, value[i]);

                    if(fileId !== null) {
                        fileValue[i] = fileId;
                    }
				}

				value = fileValue;
			}

            array[key] = value;
		}


        window.loadingIndicator.show('plugin');

        window.socket.emit('plugin', {
            name: this.plugin,
            view: this.view,
            param: this.param,
			formData: array
        });

		return false;
	}

	_beforeParse(result, parent) {
		if(!window.jui.tools.empty(parent)) {
			return true;
		}

		if(result.redirect) { // handles redirect requests
			var red1 = result.redirect[0];
			var red2 = result.redirect[1];
			var red3 = result.redirect[2];

			window.actions.openPlugin(red1, red2, red3, true);

			return false;
		}

        clearTimeout(this._timeout);
        window.loadingIndicator.hide('plugin');
	}

	parseHead(head) {
		this._juiHead = head;

		CallbackHelper.call('parseHead', head);

		if (head['bgcolor'] != null) {
			this._content.style.backgroundColor = head['bgcolor'];
		}
	}

	parseState(state) {
		if (state == null) {
			this.openHome();
		} else {
			this.loadPlugin();
		}
	}

	parse(data) {
		window.jui.parse(data.response, null, true);
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
            this.plugin = null;
            this.view = null;
            this.param = null;

			this.openHome();
		} else if(hash.length < 3) {
            this.plugin = hash[0];
            this.view = hash[1];
            this.param = null;

			this.loadPlugin(this.plugin, this.view);
		} else {
			this.plugin = hash[0];
			this.view = hash[1];

			hash.splice(0,2);

            this.param = hash.join('/');

			this.loadPlugin(this.plugin, this.view, this.param);
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

    reloadContent() {
        this.hashChanged(this.getHash());
	}
}