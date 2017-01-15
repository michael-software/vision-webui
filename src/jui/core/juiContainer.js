window.jui.views.container = (function (jsonObject) {
    var value = '';
    var properties = [];
    var click, longclick;

    var _this = window.jui.views.table;
    var _tools = window.jui.tools;
	var _shorthands = window.jui.views.shorthands;

    var parse = function (jsonObject) {
        if (!_tools.empty(jsonObject['value'] || jsonObject[_shorthands.keys.value])) {
            _this.setValue(jsonObject['value'] || jsonObject[_shorthands.keys.value]);

            properties = jsonObject;
        }

        return _this;
    };

    _this.setValue = function (pValue) {
        if(_tools.isArray(pValue)) {
            value = pValue;
        }
    };


    _this.getDomElement = function () {
        if(!_tools.empty(value) && _tools.isArray(value)) {

            var retval = document.createElement('div');
            retval.className = 'jui__container';

			var el = window.jui.parse(value, true, true);
            
            if(el != null) {
                retval.appendChild(el);
			}

            window.jui.views.view.addProperties(retval, properties);

            return retval;
        }

        return null;
    };

    return parse(jsonObject);
});