window.jui.views.file = (function (jsonObject) {
    var multiple = false;
    var name = '';
    var properties = [];

    var _this = window.jui.views.file;
    var _tools = window.jui.tools;
	var _shorthands = window.jui.views.shorthands;

    var parse = function (jsonObject) {
        if (!_tools.empty(jsonObject['name']) || jsonObject[_shorthands.keys.name]) {
            _this.setName(jsonObject['name'] || jsonObject[_shorthands.keys.name]);

            if(!_tools.empty(jsonObject['multiple']) || jsonObject[_shorthands.keys.multiple]) {
                _this.setMultiple(jsonObject['multiple'] || jsonObject[_shorthands.keys.multiple]);
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

			var el = new window.jui.views.button({
                value: 'Upload'
            }).getDomElement();

            var input = document.createElement('input');
			input.type = 'file';
			input.style.display = 'none';
			if(multiple) {
				input.multiple = 'multiple';
			}

			el.addEventListener('click', function() {
			    input.click();
            });

			var retval = document.createElement('div');
			retval.style.display = 'inline-block';
			retval.className = 'jui__file';
			retval.appendChild(el);
			retval.appendChild(input);

            window.jui.registerSubmitElement(name, input);

            window.jui.views.view.addProperties(retval, properties);

            return retval;
        }

        return null;
    };

    return parse(jsonObject);
});