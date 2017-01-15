(function (jui, _tools) {
	var root = document.querySelector('body');
	var parseHeadCallback = null, submitCallback = null, postCallback = null;
	var customSingleLineElements = [], customElements = [];

	var lastLoaded = window.location.href;

	var sendElements = [];
	var beforeParseCallback = null;

	var headers = null;
	
	jui.views = {
		shorthands: require('./shorthands')
	};

	var _shorthands = jui.views.shorthands;

	jui.padding;
	jui.paddingLeft;
	
	jui.init = function(pRoot) {
		if(pRoot === null || pRoot === undefined) {
			root = document.querySelector('body');
		} else {
			root = pRoot;
		}
	};

	jui.clean = function() {
		root.innerHTML = '';
		root.style.padding = jui.padding;
		root.style.paddingLeft = jui.paddingLeft;
		root.style.marginTop = 0;

		window.jui.ui.datePicker.abort();

		//document.querySelector('body').style.backgroundColor = 'transparent';
	};

	jui.parse = function(jsonObject, parentElement, allElements) {

		if(_tools.isString(jsonObject)) {
			jsonObject = _tools.parseJuiJSON(jsonObject);
		} else {
			console.log(JSON.stringify(jsonObject));
		}

        var returnedBool = false;
		if(!_tools.empty(beforeParseCallback) && _tools.isFunction(beforeParseCallback)) {
			returnedBool = beforeParseCallback(jsonObject, parentElement);
		}
		
		if(!_tools.isBoolean(returnedBool) || returnedBool) {
			if(jsonObject['head'] !== null && jsonObject['head'] !== undefined) {
				parseHead(jsonObject['head']);
				var data = jsonObject['data'];
			} else if( !_tools.empty(jsonObject['data']) ) {
				var data = jsonObject['data'];
			} else {
				var data = jsonObject;
			}

			var fragment = document.createDocumentFragment();

			if(!_tools.empty(data)) {
				if(_tools.empty(parentElement)) {
					sendElements = [];
				}

				for(var i = 0, x = data.length; i < x; i++) {
					var el = parseElement(data[i], allElements);

					if(!_tools.empty(el)) {
						el = el.getDomElement();
					}

					if(!_tools.empty(el)) {
						if(data[i]['id'] !== null && data[i]['id'] !== undefined) {
							el.id = data[i]['id'];
						}

						fragment.appendChild(el);
					}
				}
			}


			if(parentElement === true) {
				return fragment;
			} else if(!_tools.empty(parentElement)) {
				parentElement.appendChild(fragment);
			} else {
				this.clean();
				root.appendChild(fragment);
			}
		}
	};

	jui.addEventListener = function(type, callback) {
        if(!_tools.empty(callback) && _tools.isFunction(callback)) {
            switch(type) {
				case 'submit':
					postCallback = callback;
					break;

				default: break;
            }
        }
	};

	jui.setHeadCallback = function(callback) {
		if(!_tools.empty(callback) && _tools.isFunction(callback)) {
			parseHeadCallback = callback;
		}
	};

	jui.setSubmitCallback = function(callback) {
		if(!_tools.empty(callback) && _tools.isFunction(callback)) {
			submitCallback = callback;
		}
	};

	jui.registerSubmitElement = function (name, element) {
		sendElements.push({
			name: name,
			element: element
		});
	};

	jui.registerSubmitCallback = function (name, callback) {
		sendElements.push({
			name: name,
			element: callback
		});
	};

	jui.addOnBeforeParseListener = function(callback) {
		if(!_tools.empty(callback) && _tools.isFunction(callback)) {
			beforeParseCallback = callback;
		}
	};

	jui.registerCustomSingleLineElement = function (type, constructClass, shType) {
		if(_tools.empty(shType)) shType = type;

		customSingleLineElements.push({
			type: type,
			construct: constructClass,
			shType: shType
		})
	};

	jui.registerCustomElement = function (type, constructClass, shType) {
		if(_tools.empty(shType)) shType = type;

		customElements.push({
			type: type,
			construct: constructClass,
			shType: shType
		})
	};

	var parseHead = function(jsonObject) {
		if (jsonObject['bgcolor'] != null) {
			//document.querySelector('body').style.backgroundColor = jsonObject['bgcolor'];
		}

		if(parseHeadCallback !== null) {
			parseHeadCallback(jsonObject);
		}
	};

	var parseElement = function(jsonObject, allElements) {
		if(_tools.empty(allElements)) allElements = true;

		if(_tools.empty(jsonObject)) return null;
		if(jsonObject['type'] === null) return null;

		var el = parseSingleLineElements(jsonObject);
		var type = jsonObject['type'] || jsonObject[_shorthands.keys.type];

		if(allElements) {
			switch(type) {
				case 'list':
				case _shorthands.values.type.list:
					el = new window.jui.views.list(jsonObject);
					break;
				case 'select':
				case _shorthands.values.type.select:
					el = new window.jui.views.select(jsonObject);
					break;
				case 'table':
				case _shorthands.values.type.table:
					el = new window.jui.views.table(jsonObject, this);
					break;
				case 'frame':
				case _shorthands.values.type.frame:
					el = new window.jui.views.frame(jsonObject);
					break;
				case 'range':
				case _shorthands.values.type.range:
					el = new window.jui.views.range(jsonObject);
					break;
				case 'container':
				case _shorthands.values.type.container:
					el = new window.jui.views.container(jsonObject);
					break;
				default:
					if(!_tools.empty(customElements)) {
						for(var i = 0, x = customElements.length; i < x; i++) {
							var customElement = customElements[i];

							if(String(customElement.type).toLowerCase() == String(jsonObject['type']).toLowerCase() ||
								String(customElement.shType).toLowerCase() == String(jsonObject['type']).toLowerCase()) {

								el = new customElement.construct(jsonObject);

								if(!_tools.empty(el)) {
									return el;
								}
							}
						}
					}
					break;
			}

		}

		return el;
	};

	var parseSingleLineElements = function(jsonObject) {
		var el = null;
		var type = jsonObject['type'] || jsonObject[_shorthands.keys.type];

		switch(type) {
			case 'text':
			case _shorthands.values.type.text:
				el = new window.jui.views.text(jsonObject);
				break;
			case 'heading':
			case 'headline':
			case _shorthands.values.type.headline:
				el = new window.jui.views.heading(jsonObject);
				break;
			case 'nl':
			case _shorthands.values.type.nline:
				el = new window.jui.views.newline();
				break;
			case 'hline':
			case _shorthands.values.type.hline:
				el = new window.jui.views.horizontalline();
				break;
			case 'input':
			case _shorthands.values.type.input:
				el = new window.jui.views.input(jsonObject);
				break;
			case 'button':
			case _shorthands.values.type.button:
				el = new window.jui.views.button(jsonObject);
				break;
			case 'checkbox':
			case _shorthands.values.type.checkbox:
				el = new window.jui.views.checkbox(jsonObject);
				break;
			case 'file':
			case _shorthands.values.type.file:
				el = new window.jui.views.file(jsonObject);
				break;
			case _shorthands.values.type.image:
			case 'image':
				el = new window.jui.views.image(jsonObject);
				break;
			case 'link':
				el = new window.jui.views.link(jsonObject);
				break;
			default:
				if(!_tools.empty(customSingleLineElements)) {
					for(var i = 0, x = customSingleLineElements.length; i < x; i++) {
						var customSingleLineElement = customSingleLineElements[i];

						if(String(customSingleLineElement.type).toLowerCase() == String(type).toLowerCase() ||
							String(customSingleLineElement.shType).toLowerCase() == String(type).toLowerCase()) {

							el = new customSingleLineElement.construct(jsonObject);

							if(!_tools.empty(el)) {
								return el;
							}
						}
					}
				}
				break;
		}

		return el;
	};

	jui.requestParse = function(url, data, pHeaders, callback) {
		if(_tools.empty(pHeaders)) {
			pHeaders = headers;
		}

		window.jui.tools.requestSite(url, null, pHeaders, function(content, status) {
			if(status === 200) {
				var tmpContent = window.jui.tools.parseJuiJSON(content);
				window.jui.parse(tmpContent);

				lastLoaded = url;
			}

			if(!_tools.empty(callback) && _tools.isFunction(callback)) {
				callback.call(window, content, status);
			}
		});
	};

	jui.setDefaultHeaders = function(pHeaders) {
		headers = pHeaders
	};

	jui.getSubmitElements = function() {
		return sendElements;
	};

	jui.getHeaders = function() {
		return headers;
	};

	jui.submit = function(url) {
		var data = {};

		for(var i = 0, x = sendElements.length; i < x; i++) {

			var name = sendElements[i].name;
			var element = sendElements[i].element;
			var tagName = element.tagName;

			if(_tools.isFunction(element)) {
				var result = element(jui);

				if(result !== undefined && result !== null) {
                    data[name] = result;
				}
			} else if(tagName && tagName.toLowerCase() == "input" &&
					(element.type.toLowerCase() == "text" ||
					element.type.toLowerCase() == "password" ||
					element.type.toLowerCase() == "number" ||
					element.type.toLowerCase() == "range" ||
					element.type.toLowerCase() == "color" ||
					element.type.toLowerCase() == "date")) {


					if(!_tools.empty(element.value)) {
                        data[name] = element.value;
					}
			} else if(tagName && tagName.toLowerCase() == "select") {
				if( !_tools.empty(element.options) && !_tools.empty(element.options[element.selectedIndex]) && !_tools.empty(element.options[element.selectedIndex].value) )
                    data[name] = element.options[element.selectedIndex].value;
			} else if(tagName && tagName.toLowerCase() == "input" &&
				element.type.toLowerCase() == "checkbox") {

				if(element.checked)  data[name] = 1;
			} else if(tagName && tagName.toLowerCase() == "input" &&
				element.type.toLowerCase() == "file") {

                data[name + '[]'] = element.files;
				// for(var j = 0, k = element.files.length; j < k; j++) {
				// 	console.log(element.files[0].name);
                 //    ; /* TODO: formData converts file to ArrayBuffer */
				// }
			} else if(tagName && tagName.toLowerCase() == "textarea") {
				if(!_tools.empty(element.value)) {
                    data[name] = element.value;
				}
			} else if(element.classList.contains('dateButton') && element.dataset != undefined) {
                data[name] = element.dataset.value || '0';
			} else {
				if(!_tools.empty(submitCallback)) {
					submitCallback(data, name, element);
				}
			}

		}

		if(postCallback) {
			var send = postCallback(data);
		}

		if(send !== false) {
			var formData = window.jui.tools.objToFormData(data);

            window.jui.tools.requestSite(lastLoaded, formData, headers, function (content, status) {
                if (status === 200) {
                    content = JSON.parse(content);
                    window.jui.parse(content);

                    if (!_tools.empty(url))
                        lastLoaded = url;
                }
            });
        }
	};
})(window.jui, window.jui.tools);
