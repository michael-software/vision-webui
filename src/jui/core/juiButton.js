window.jui.views.button = (function (jsonObject) {
    var value = '';
    var properties = [];

    var click = '';
    var longclick = '';

    var _this = window.jui.views.button;
    var _tools = window.jui.tools;

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
            var retval = document.createElement('input');
            retval.type = 'button';

            retval.value = value;

            if(!_tools.empty(click)) {
                retval.addEventListener('click', function () {
                    window.jui.action.call(click);
                }, false);
            }

            if(!_tools.empty(longclick)) {
                retval.addEventListener('dblclick', function () {
                    window.jui.action.call(longclick);
                }, false);
            }

            window.jui.views.view.addProperties(retval, properties);

            return retval;
        }

        return null;
    };

    return parse(jsonObject);
});