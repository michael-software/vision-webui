window.jui.views.image = (function (jsonObject) {
    var value = '';
    var properties = [];

    var _this = window.jui.views.image;
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
        value = pValue;
    };

    _this.getDomElement = function () {
        if(!_tools.empty(value)) {
            var retval = document.createElement('img');
            retval.className = 'jui__image';

            retval.src = value;

            window.jui.views.view.addProperties(retval, properties);

            return retval;
        }

        return null;
    };

    return parse(jsonObject);
});