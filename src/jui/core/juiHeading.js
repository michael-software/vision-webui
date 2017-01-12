window.jui.views.heading = (function (jsonObject) {
    var value = '';
    var size = 1;
	var align = 'left';
    var properties = [];
    var shadow = null;

    var _this = window.jui.views.heading;
    var _tools = window.jui.tools;
	var _shorthands = window.jui.views.shorthands;

    var parse = function (jsonObject) {
        if (!_tools.empty(jsonObject['value'] || jsonObject[_shorthands.keys.value])) {
            _this.setValue(jsonObject['value'] || jsonObject[_shorthands.keys.value]);

            if(!_tools.empty(jsonObject['size'] || jsonObject[_shorthands.keys.size])) {
                _this.setSize(jsonObject['size'] || jsonObject[_shorthands.keys.size])
            }

			if (!_tools.empty(jsonObject['align']) || jsonObject[_shorthands.keys.align]) {
				_this.setAlign(jsonObject['align'] || jsonObject[_shorthands.keys.align]);
			}

            if(!_tools.empty(jsonObject['shadow'] || jsonObject[_shorthands.keys.shadow])) {
                _this.setShadow(jsonObject['shadow'] || jsonObject[_shorthands.keys.shadow])
            }

            properties = jsonObject;
        }

        return _this;
    };

    _this.setValue = function (pValue) {
        value = pValue.replace("/&lt;br \/&gt;/g", "<br />").replace("/&lt;br\/&gt;/g", "<br />").replace("/&lt;br&gt;/g", "<br />");
        value = value.replace(/(?:\r\n|\r|\n)/g, '<br />');
        value = value.replace("/<br \/> /g", "<br />").replace("/ <br \/>/g", "<br />");
    };

	_this.setAlign = function (pAlign) {
		if (pAlign === _shorthands.values.align.right || String(pAlign).toLowerCase() == 'right') {
			align = 'right';
		} else if (pAlign === _shorthands.values.align.center || String(pAlign).toLowerCase() == 'center') {
			align = 'center';
		} else {
			align = 'left';
		}
	};

    _this.setShadow = function (pShadow) {
        var color = '#000000';
        if(!_tools.empty(pShadow.color)) {
            color = pShadow.color;
        }

        var scale = '1px';
        if(!_tools.empty(pShadow.scale)) {
            scale = pShadow.scale + 'px';
        }

        var x = '1px';
        if(!_tools.empty(pShadow.x)) {
            x = pShadow.x + 'px';
        }

        var y = '1px';
        if(!_tools.empty(pShadow.y)) {
            y = pShadow.y + 'px';
        }

        shadow = {
            color: color,
            scale: scale,
            x: x,
            y: y
        };
    };

    _this.getDomElement = function () {
        if(!_tools.empty(value)) {
            if(size === 0) {
                var retval = document.createElement('h3');
            } else {
                var retval = document.createElement('h2');
            }
            retval.className = 'jui__headline';
			retval.style.textAlign = align;

            if(shadow != null) {
                retval.style.textShadow = shadow.x + ' ' + shadow.y + ' ' + shadow.scale + ' ' + shadow.color;
            }

            retval.appendChild( document.createTextNode(value) );

            window.jui.views.view.addProperties(retval, properties);

            return retval;
        }

        return null;
    };

    _this.setSize = function(pSize) {
        if(pSize === _shorthands.values.size.small || String(pSize).toUpperCase() === "SMALL") {
            size = 0;
        } else {
            size = 1;
        }
    };

    return parse(jsonObject);
});