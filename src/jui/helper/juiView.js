(function (view) {
	var _tools = window.jui.tools;
	var _shortKeys = window.jui.views.shorthands.keys;

	view.addProperties = function(retval, properties) {
		var style = properties[_shortKeys.style] || properties;
		if(!style) return;

		if(style[_shortKeys.width] || style.width) {
			retval.style.width = style[_shortKeys.width] || style.width;
		}
		
		if(style[_shortKeys.height] || style.height) {
			retval.style.height = style[_shortKeys.height] || properties.height;
		}

		if(style[_shortKeys.color] || style.color) {
			retval.style.color = _tools.convertHex(style[_shortKeys.color] || style.color);
		}

		if(style[_shortKeys.background] || style.background) {
			retval.style.background = _tools.convertHex(style[_shortKeys.background] || style.background);
		}

		if(style.visibility === 'away' || style.visible === 'away') {
			retval.style.display = 'none';
		}

		if(style.visibility === 'invisible' || style.visible === 'invisible') {
			retval.style.visibility = 'hidden';
		}

		/* MARGIN */
		var margin = style[_shortKeys.margin] || style.margin;
		if(margin) addSpaces(retval, 'margin', margin);

		/* PADDING */
		var padding = style[_shortKeys.padding] || style.padding;
		if(padding) addSpaces(retval, 'padding', padding);
	};

	var addSpaces = function(retval, type, style) {
		if(type !== 'padding' && type !== 'margin') { return; }

		const all 		= _shortKeys.all;
		const left 		= _shortKeys.left;
		const right 	= _shortKeys.right;
		const top 		= _shortKeys.top;
		const bottom 	= _shortKeys.bottom;

		const topKey 	= `${type}Top`;
		const leftKey 	= `${type}Left`;
		const rightKey	= `${type}Right`;
		const bottomKey = `${type}Bottom`;


		if(style && (style[all] || style[all] === 0)) {
			retval.style[type] = style[all];
		} else if(_tools.isNumeric(style)) {
			retval.style[type] = style;
		}

		if(style && (style[top] || style[top] === 0)) {
			retval.style[topKey] = style[top];
		} else if(_tools.isNumeric(style[topKey])) {
			retval.style[topKey] = style[topKey];
		}

		if(style && (style[left] || style[left] === 0)) {
			retval.style[leftKey] = style[left];
		} else if(_tools.isNumeric(style[leftKey])) {
			retval.style[leftKey] = style[leftKey];
		}

		if(style && (style[right] || style[right] === 0)) {
			retval.style[rightKey] = style[right];
		} else if(_tools.isNumeric(style[rightKey])) {
			retval.style[rightKey] = style[rightKey];
		}

		if(style && (style[bottom] || style[bottom] === 0)) {
			retval.style[bottomKey] = style[bottom];
		} else if(_tools.isNumeric(style[bottomKey])) {
			retval.style[bottomKey] = style[bottomKey];
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

		if(!_tools.empty(properties['label'] || properties[_shortKeys.label])) {
			var newRetval = document.createElement('label');

			if(retval.tagName.toLowerCase() === 'input' && retval.type.toLowerCase() === 'checkbox') {
				newRetval.appendChild(retval);
				newRetval.appendChild( document.createTextNode(properties['label'] || properties[_shortKeys.label]) );
			} else {
				newRetval.appendChild( document.createTextNode(properties['label'] || properties[_shortKeys.label]) );
				newRetval.appendChild(retval);
			}

			return newRetval;
		}

		return retval;
	};
})(window.jui.views.view = {});