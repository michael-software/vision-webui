window.jui.views.select = (function (jsonObject) {
    var value = '';
    var name = '';
    var properties = [];

    var _this = window.jui.views.select;
    var _tools = window.jui.tools;

    var parse = function (jsonObject) {
        if (!_tools.empty(jsonObject['name'])) {
            _this.setName(jsonObject['name']);

            if(!_tools.empty(jsonObject['value'])) {
                _this.setValue(jsonObject['value']);
            }

            properties = jsonObject;
        }

        return _this;
    };

    _this.setName = function (pName) {
        name = pName;
    };

     _this.setValue = function (pValue) {
        value = pValue;
    };

    _this.getDomElement = function () {
        if(!_tools.empty(name)) {

            var retval = document.createElement('select');

            window.jui.registerSubmitElement(name, retval);

            if(!_tools.empty(value)) {
                for(var i = 0, x = value.length; i < x; i++) {

                    if(_tools.isArray(value[i])) {
                        var valueText = value[i][0];
                        var valueValue = value[i][1];
                    } else {
                        var valueText = value[i];
                    }

                    if(_tools.empty(valueValue)) {
                        valueValue = valueText;
                    }

                    var option = document.createElement('option');
                    option.appendChild(document.createTextNode(valueText));
                    option.setAttribute('value', valueValue);

                    retval.appendChild(option);
                }
            }

            window.jui.views.view.addProperties(retval, properties);
            
            return window.jui.views.view.addInputProperties(retval, properties);
        }

        return null;
    };

    return parse(jsonObject);
});