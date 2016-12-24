window.jui.views.table = (function (jsonObject) {
    var value = '';
    var properties = [];
    var click, longclick;

    var _this = window.jui.views.table;
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

    _this.setClick = function (pClick) {
        click = pClick;
    };

    _this.setLongClick = function (pLongClick) {
        longclick = pLongClick;
    };


    _this.getDomElement = function () {
        if(!_tools.empty(value) && _tools.isArray(value)) {

            var retval = document.createElement('table');
            retval.className = 'jui__table';

            for(var i = 0, x = value.length; i < x; i++) {
                var tr = document.createElement('tr');
                var valueTr = value[i];

                for(var j = 0, k = valueTr.length; j < k; j++) {
                    var td = document.createElement('td');
                    var valueTd = valueTr[j]

                    if(_tools.isArray(valueTd)) {
				        var el = window.jui.parse(valueTd, true, false);

				        if(el != null) {
							td.appendChild(el);
						}
                    } else {
                        td.appendChild(document.createTextNode(valueTd));
                    }

                    tr.appendChild(td);
                }

                if(!_tools.empty(click) && !_tools.empty(click[i])) {
                    tr.addEventListener('click', window.jui.action.caller(click[i]), false);
                }

                if(!_tools.empty(longclick) && !_tools.empty(longclick[i])) {
                    tr.addEventListener('contextmenu', window.jui.action.caller(longclick[i]), false);
                }

                retval.appendChild(tr);
            }

            window.jui.views.view.addProperties(retval, properties);

            return retval;
        }

        return null;
    };

    return parse(jsonObject);
});