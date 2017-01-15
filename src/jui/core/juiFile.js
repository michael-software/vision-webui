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

			// === File Input ===
			var input = document.createElement('input');
			input.type = 'file';
			input.style.display = 'none';
			if(multiple) {
				input.multiple = 'multiple';
			}

			input.addEventListener('change', function(event) {
				let value = window.jui.lang.get('select_file');
				if(multiple) {
					value = window.jui.lang.get('select_files');
				}

				if(input.files.length > 1) {
					value = window.jui.lang.get('selected_files').replace(/##count##/g, input.files.length);
				} else if(input.files.length === 1) {
					value = window.jui.lang.get('selected_file');
				}

				el.value = value;
			});


			// === Button ===
			let value = window.jui.lang.get('select_file');
			if(multiple) {
				value = window.jui.lang.get('select_files');
			}

			var el = new window.jui.views.button({
                value: value
            }).getDomElement();

			el.addEventListener('click', function() {
				input.click();
			});

			// === Return Container ===
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