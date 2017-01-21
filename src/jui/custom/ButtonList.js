import './FontAwesome';

import './ButtonList.scss';

window.buttonlist = (function (jsonObject) {
	var value = '';
	var properties = [];

	var click = '';
	var longclick = '';

	var _this = window.buttonlist;
	var _tools = window.jui.tools;
	var _shorthands = window.jui.views.shorthands;

	var placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

	var parse = function (jsonObject) {
		console.log('render', jsonObject);
		if (!_tools.empty(jsonObject['value'] || jsonObject[_shorthands.keys.value])) {
			_this.setValue(jsonObject['value'] || jsonObject[_shorthands.keys.value]);

			if(!_tools.empty(jsonObject['click'] || jsonObject[_shorthands.keys.click])) {
				_this.setClick(jsonObject['click'] || jsonObject[_shorthands.keys.click]);
			}

			if(!_tools.empty(jsonObject['longclick'] || jsonObject[_shorthands.keys.longclick])) {
				_this.setLongClick(jsonObject['longclick'] || jsonObject[_shorthands.keys.longclick]);
			}

			properties = jsonObject;
		}

		return _this;
	};

	_this.setValue = function (pValue) {
		value = pValue;
	};

	_this.setClick = function (pAction) {
		click = pAction;
	};

	_this.setLongClick = function (pAction) {
		longclick = pAction;
	};

	_this.getDomElement = function () {
		if(!_tools.empty(value)) {
			var div = document.createElement('div');
			div.className = 'jui__buttonlist';

			for(var i = 0; i < value.length; i++) {
				var image   = value[i]['value'][0];
				var textVal = value[i]['value'][1];

				var tile = document.createElement('div');

				if(_tools.empty(image)) image = placeholder;

				if(String(image).startsWith('fa')) {
					var faElement = window.fontAwesomeImage(String(image), 130, 130, 20);
					faElement.className = 'fa--image';
					tile.appendChild( faElement );
				} else {
					var img = document.createElement('img');
					img.src = image;
					tile.appendChild(img);
				}


				var name = document.createElement('p');
				name.appendChild( document.createTextNode(textVal) );
				tile.appendChild(name);


				if( !_tools.empty(value[i]['click']) ) {
					tile.style.cursor = 'pointer';
					tile.addEventListener('click', window.jui.action.caller(value[i]['click']), false);
				} else {
					tile.style.cursor = 'default';
				}

				if(value[i]['longclick'] != null && value[i]['longclick'][i] != null && value[i]['longclick'][i] != "") {
					tile.addEventListener('contextmenu', function(e) {
						window.jui.action.call(value[i]['longclick']);

						e.stopPropagation();
						e.preventDefault();
					}, false);
				}

				div.appendChild(tile);
			}

			window.jui.views.view.addProperties(div, properties);

			return div;
		}
	};

	return parse(jsonObject);
});