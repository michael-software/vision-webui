window.jui.views.frame = (function (jsonObject) {
    var value = '';
    var zHtml = '';
    //var htmlChanged = true;
    var properties = [];

    var _this = window.jui.views.frame;
    var _tools = window.jui.tools;

    var parse = function (jsonObject) {
        if (!_tools.empty(jsonObject['value']) || !_tools.empty(jsonObject['html'])) {
            if(!_tools.empty(jsonObject['value'])) {
                _this.setValue(jsonObject['value']);
            } else {
                _this.setHtml(jsonObject['html']);
            }

            properties = jsonObject;
        }

        return _this;
    };

    _this.setValue = function (pValue) {
        value = pValue;
    };

    _this.setHtml = function (pHtml) {
        zHtml = pHtml;
    };

    _this.getDomElement = function () {
        if(!_tools.empty(value) || !_tools.empty(zHtml)) {
            var retval = document.createElement('iframe');
            retval.style.border = 'none';

            if(!_tools.empty(value)) {
                retval.src = value;
            } else {
                var html = zHtml;
                retval.src = '';

                var htmlChanged = false;

                retval.addEventListener("load", function() {
                    if(!htmlChanged) {
                        htmlChanged = true;

                        retval.contentWindow.document.open();
                        retval.contentWindow.document.write(html);
                        retval.contentWindow.document.close();
                    }
                }, false);
                
            }

            window.jui.views.view.addProperties(retval, properties);

            return retval;
        }

        return null;
    };

    return parse(jsonObject);
});