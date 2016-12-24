window.jui.views.file = (function (jsonObject) {
    var multiple = false;
    var name = '';
    var properties = [];

    var _this = window.jui.views.file;
    var _tools = window.jui.tools;

    var parse = function (jsonObject) {
        if (!_tools.empty(jsonObject['name'])) {
            _this.setName(jsonObject['name']);

            if(!_tools.empty(jsonObject['multiple'])) {
                _this.setMultiple(jsonObject['multiple']);
            }

            properties = jsonObject;
        }

        return _this;
    };

    _this.setName = function (pName) {
        name = pName;
    };

     _this.setMultiple = function (isMultiple) {
         if(typeof isMultiple === 'boolean' && isMultiple) {
             multiple = true;
         } else {
             multiple = false;
         }
    };

    _this.getDomElement = function () {
        if(!_tools.empty(name)) {

            var retval = document.createElement('input');
            retval.type = 'file';
            retval.className = 'jui__file';

            window.jui.registerSubmitElement(name, retval);

            if(multiple) {
                retval.multiple = 'multiple';
            }

            window.jui.views.view.addProperties(retval, properties);

            return retval;
        }

        return null;
    };

    return parse(jsonObject);
});