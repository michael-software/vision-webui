(function (view) {
	var _tools = window.jui.tools;
	var _shorthands = window.jui.views.shorthands;

	view.addProperties = function(retval, properties) {
		var style = properties[_shorthands.keys.style] || properties;

		if(style.width) {
			retval.style.width = style.width;
		}
		
		if(style.height) {
			retval.style.height = properties.height;
		}

		if(style.color) {
			retval.style.color = _tools.convertHex(style.color);
		}

		if(style.background) {
			retval.style.background = _tools.convertHex(style.background);
		}

		if(style.visibility === 'away' || style.visible === 'away') {
			retval.style.display = 'none';
		}

		if(style.visibility === 'invisible' || style.visible === 'invisible') {
			retval.style.visibility = 'hidden';
		}


		/* MARGIN */
		addSpaces(retval, 'margin', style);

		/* PADDING */
		addSpaces(retval, 'padding', style);
	};

	var addSpaces = function(retval, type, style) {
		if(type !== 'padding' && type !== 'margin') { return; }

		let paddingTopKey = `${type}Top`;
		let paddingLeftKey = `${type}Left`;
		let paddingRightKey = `${type}Right`;
		let paddingBottomKey = `${type}Bottom`;


		if(style[type] && style[type].all) {
			retval.style[type] = style[type].all;
		} else if(_tools.isNumeric(style[type])) {
			retval.style[type] = style[type];
		}

		if(style[type] && style[type].top) {
			retval.style[paddingTopKey] = style[type].top;
		} else if(_tools.isNumeric(style[paddingTopKey])) {
			retval.style[paddingTopKey] = style[paddingTopKey];
		}

		if(style[type] && style[type].left) {
			retval.style[paddingLeftKey] = style[type].left;
		} else if(_tools.isNumeric(style[paddingLeftKey])) {
			retval.style[paddingLeftKey] = style[paddingLeftKey];
		}

		if(style[type] && style[type].right) {
			retval.style[paddingRightKey] = style[type].right;
		} else if(_tools.isNumeric(style[paddingRightKey])) {
			retval.style[paddingRightKey] = style[paddingRightKey];
		}

		if(style[type] && style[type].bottom) {
			retval.style[paddingBottomKey] = style[type].bottom;
		} else if(_tools.isNumeric(style[paddingBottomKey])) {
			retval.style[paddingBottomKey] = style[paddingBottomKey];
		}
	};

	view.addInputProperties = function(retval, properties) {
		if(!_tools.empty(properties['change'])) {
			retval.addEventListener('change', function(event) {

				var change = properties['change'];
				if(event.target != null && event.target.value != null) {
					change = properties['change'].replace('this.value', event.target.value);
				}

				window.jui.action.call(change);
			}, false);
		}

		if(!_tools.empty(properties['label'] || properties[_shorthands.keys.label])) {
			var newRetval = document.createElement('label');

			if(retval.tagName.toLowerCase() === 'input' && retval.type.toLowerCase() === 'checkbox') {
				newRetval.appendChild(retval);
				newRetval.appendChild( document.createTextNode(properties['label'] || properties[_shorthands.keys.label]) );
			} else {
				newRetval.appendChild( document.createTextNode(properties['label'] || properties[_shorthands.keys.label]) );
				newRetval.appendChild(retval);
			}

			return newRetval;
		}

		return retval;
	};
})(window.jui.views.view = {});