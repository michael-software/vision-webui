window.jui.views.range = (function (jsonObject) {
    var value = 0;
    var max = 2, min = 0;
    var name = '';
    var properties = [];

    var _this = window.jui.views.range;
    var _tools = window.jui.tools;
    var _shorthands = window.jui.views.shorthands;

    var parse = function (jsonObject) {
        if (!_tools.empty(jsonObject['name'] || jsonObject[_shorthands.keys.name])) {
            _this.setName(jsonObject['name'] || jsonObject[_shorthands.keys.name]);

            if(!_tools.empty(jsonObject['value'] || jsonObject[_shorthands.keys.value])) {
                _this.setValue(jsonObject['value'] || jsonObject[_shorthands.keys.value]);
            }

            if (!_tools.empty(jsonObject['min'] || jsonObject[_shorthands.keys.min])) {
                _this.setMin(jsonObject['min'] || jsonObject[_shorthands.keys.min]);
            }

            if (!_tools.empty(jsonObject['max'] || jsonObject[_shorthands.keys.max])) {
                _this.setMax(jsonObject['max'] || jsonObject[_shorthands.keys.max]);
            }

            properties = jsonObject;
        }

        return _this;
    };

    _this.setValue = function (pValue) {
        value = pValue;
    };

    _this.setMin = function (pMin) {
        min = pMin;
    };

    _this.setMax = function (pMax) {
        max = pMax;
    };

    _this.setName = function (pName) {
        name = pName;
    };

    _this.getDomElement = function () {
        if(!_tools.empty(name)) {

            var retval = document.createElement('input');
            retval.type = 'range';
            retval.className = 'jui__range';

            window.jui.registerSubmitElement(name, retval);
            
            if(!_tools.empty(value)) {
                retval.value = value;
            }

            if(!_tools.empty(min)) {
                retval.setAttribute('min', min);
            }

            if(!_tools.empty(max)) {
                retval.setAttribute('max', max);
            }

            window.jui.views.view.addProperties(retval, properties);

            return window.jui.views.view.addInputProperties(retval, properties);
        }

        return null;
    };

    return parse(jsonObject);
});