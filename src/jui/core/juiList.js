window.jui.views.list = (function (jsonObject) {
    var value = '';
    var properties = [];
    var click, longclick;

    var _this = window.jui.views.list;
    var _tools = window.jui.tools;
    var _shorthands = window.jui.views.shorthands;

    var parse = function (jsonObject) {
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

    _this.setClick = function (pClick) {
        click = pClick;
    };

    _this.setLongClick = function (pLongClick) {
        longclick = pLongClick;
    };


    _this.getDomElement = function () {
        if(!_tools.empty(value) && _tools.isArray(value)) {

            var retval = document.createElement('ul');
            retval.classList.add('jui__list');

            for(var i = 0, x = value.length; i < x; i++) {
                var li = document.createElement('li');
                li.appendChild(document.createTextNode(value[i]));

                if(!_tools.empty(click) && !_tools.empty(click[i])) {
                    li.addEventListener('click', window.jui.action.caller(click[i]), false);
                }

                if(!_tools.empty(longclick) && !_tools.empty(longclick[i])) {
                    li.addEventListener('contextmenu', window.jui.action.caller(longclick[i]), false);
                }

                retval.appendChild(li);
            }

            window.jui.views.view.addProperties(retval, properties);

            return retval;
        }

        return null;
    };

    return parse(jsonObject);
});