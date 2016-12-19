
window.externalEditor = function(domElement) {
	var messageQueue = [];
	var _this = this;
	var loaded = false;
	var _iframe = null;
	var autosync = false;
	var value = '';

	this.init = function(domElement) {
		_iframe = document.createElement('iframe');
		_iframe.src = document.location.origin + '/editor/index.html';
		_iframe.style.height = '500px';
		_iframe.style.width = '100%';
		_iframe.style.border = 'none';
		_iframe.style.outline = 'none';

		if(domElement && {}.toString.call(domElement.appendChild) === '[object Function]') {
			domElement.appendChild(_iframe);
		}

		_iframe.addEventListener('load', function() {
			loaded = true;

			for(var i = 0, x = messageQueue.length; i < x; i++) {
				_this.postMessage(messageQueue[i]);
			}
		}, false);

		window.addEventListener("message", function (event) {
			if (event.origin === "http://example.com:8080") // TODO
				return;

			try {
				var data = JSON.parse(event.data);

				switch(data.action) {
					case 'save':
						value = data.value || '';
						//console.log(data.value);
						break;
					case 'setHeight':
						console.log(data.value);
						_iframe.style.height = data.value + 'px';
						//console.log(data.value);
						break;
					default:
						console.warn('action not found');
						break;
				}
			} catch(ex) {
				console.warn('Error while parsing message', ex);
			}
		});
	};

	this.postMessage = function(data) {
		if(loaded) {
			if(_iframe) {
				_iframe.contentWindow.postMessage(JSON.stringify(data), window.location.origin);
			}
		} else {
			messageQueue.push(data);
		}
	};

	this.disableFiles = function() {
		this.postMessage({
			action: 'updateConfig',
			value: {
				menu: {
					file: false
				}
			}
		});
	};

	this.getContent = function(callback) {
		if(autosync) {
			return value;
		} else {

		}
	};

	this.setContent = function(data, type) {
		this.postMessage({
			action: 'load',
			value: data,
			mime: type
		});

		value = data;
	};

	this.enableAutosync = function(data, type) {
		this.postMessage({
			action: 'enableAutosync',
			value: true
		});

		autosync = true;
	};

	this.enableAutoresize = function() {
		this.postMessage({
			action: 'autoResize',
			value: true
		});
	};

	this.init(domElement);
};


window.editor = (function(pJson) {
	var _this = window.editor;

	var outer = document.createElement('div');
	outer.className = 'editor';

	var control = document.createElement('div');
	control.className = 'control';

	var contentArea = document.createElement('div');
	contentArea.name = pJson['name'];
	contentArea.className = 'html';


	var container = document.createElement('div');
	var editor = new window.externalEditor(container);
	editor.disableFiles();
	editor.setContent('<h1>Test</h1>Hallo', 'text/html');
	editor.enableAutosync();
	editor.enableAutoresize();

	var Editor = function(pJson) {
		//createControls();
		editor.setContent(pJson['value'] || '', 'text/html');
		//createContentArea(pJson);

		return {
			getDomElement: function() {
				var element = container;
				//element.appendChild(control);
				//element.appendChild(contentArea);

				window.jui.views.view.addProperties(element, pJson);

				element.style.height = 'auto';

				window.jui.registerSubmitCallback(pJson['name'], function() {

					return editor.getContent();
				});

				return window.jui.views.view.addInputProperties(element, pJson);
			}
		};
	};

	return Editor(pJson);
});