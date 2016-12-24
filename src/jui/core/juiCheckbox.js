window.jui.views.checkbox = (function (jsonObject) {
    var value = '';
    var checked = false;
    var name = '';
    var properties = [];

    var _this = window.jui.views.checkbox;
    var _tools = window.jui.tools;

    var parse = function (jsonObject) {
        if (!_tools.empty(jsonObject['name'])) {
            _this.setName(jsonObject['name']);

            if(!_tools.empty(jsonObject['checked'])) {
                _this.setChecked(jsonObject['checked']);
            }

            properties = jsonObject;
        }

        return _this;
    };

    _this.setName = function (pName) {
        name = pName;
    };

     _this.setChecked = function (isChecked) {
         if(typeof isChecked === 'boolean' && isChecked) {
            checked = true;
         } else {
             checked = false;
         }
    };

    _this.getDomElement = function () {
        if(!_tools.empty(name)) {

            var retval = document.createElement('input');
            retval.type = 'checkbox';
            retval.className = 'jui__checkbox';

            window.jui.registerSubmitElement(name, retval);

            if(checked) {
                retval.checked = 'checked';
            }

            window.jui.views.view.addProperties(retval, properties);

            return window.jui.views.view.addInputProperties(retval, properties);
        }

        return null;
    };

    return parse(jsonObject);
});