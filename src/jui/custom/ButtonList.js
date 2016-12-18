
window.buttonlist = (function (jsonObject) {
	var value = '';
	var properties = [];

	var click = '';
	var longclick = '';

	var _this = window.buttonlist;
	var _tools = window.jui.tools;

	var placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

	var parse = function (jsonObject) {
		if (!_tools.empty(jsonObject['value'])) {
			_this.setValue(jsonObject['value']);

			if(!_tools.empty(jsonObject['click'])) {
				_this.setClick(jsonObject['click']);
			}

			if(!_tools.empty(jsonObject['longclick'])) {
				_this.setLongClick(jsonObject['longclick']);
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
			div.className = 'buttonlist';

			for(var i = 0; i < value.length; i++) {
				var image   = value[i]['value'][0];
				var textVal = value[i]['value'][1];

				var tile = document.createElement('div');

				if(_tools.empty(image)) image = placeholder;

				var img = document.createElement('img');
				img.src = image;
				tile.appendChild(img);


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