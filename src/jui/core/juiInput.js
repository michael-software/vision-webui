window.jui.views.input = (function (jsonObject) {
    var value = '';
    var preset = 0;
    var hint = '';
    var name = '';
    var properties = [];

    var _this = window.jui.views.input;
    var _tools = window.jui.tools;
	var _shorthands = window.jui.views.shorthands;

    var parse = function (jsonObject) {
        if (!_tools.empty(jsonObject['name'] || jsonObject[_shorthands.keys.name])) {
            _this.setName(jsonObject['name'] || jsonObject[_shorthands.keys.name]);

            if(!_tools.empty(jsonObject['value'] || jsonObject[_shorthands.keys.value])) {
                _this.setValue(jsonObject['value'] || jsonObject[_shorthands.keys.value]);
            }

            if (!_tools.empty(jsonObject['preset'] || jsonObject[_shorthands.keys.preset])) {
                _this.setPreset(jsonObject['preset'] || jsonObject[_shorthands.keys.preset]);
            }

            if (!_tools.empty(jsonObject['hint'] || jsonObject['placeholder'] || jsonObject[_shorthands.keys.placeholder])) {
                _this.setHint(jsonObject['hint'] || jsonObject['placeholder'] || jsonObject[_shorthands.keys.placeholder]);
            }

            properties = jsonObject;
        }

        return _this;
    };

    _this.setValue = function (pValue) {
        value = pValue;
    };

    _this.setHint = function (pHint) {
        hint = pHint;
    };

    _this.setName = function (pName) {
        name = pName;
    };

    _this.setPreset = function (pPreset) {
        if (pPreset == _shorthands.values.preset.textarea || String(pPreset).toUpperCase() == 'TEXTAREA') {
            preset = 1;
        } else if (pPreset == _shorthands.values.preset.password || String(pPreset).toUpperCase() == 'PASSWORD') {
            preset = 2;
        } else if (pPreset == _shorthands.values.preset.number || String(pPreset).toUpperCase() == 'NUMBER') {
            preset = 3;
        } else if (pPreset == _shorthands.values.preset.date || String(pPreset).toUpperCase() == 'DATE') {
            preset = 4;
        } else if (pPreset == _shorthands.values.preset.color || String(pPreset).toUpperCase() == 'COLOR') {
            preset = 5;
        } else {
            preset = 0;
        }
    };

    _this.getDomElement = function () {
        if(!_tools.empty(name)) {

            if(preset === 1) {
                var retval = document.createElement('textarea');
                retval.className = 'jui__textarea';
            } else if(preset === 2) {
                var retval = document.createElement('input');
                retval.setAttribute('type', 'password');
                retval.className = 'jui__password';
            } else if(preset === 3) {
                var retval = document.createElement('input');
                retval.setAttribute('type', 'number');
                retval.className = 'jui__number';
            } else if(preset === 4) {
                var retval = _this.date();
                retval.className = 'jui__date';
            } else if(preset === 5) {
                var retval = document.createElement('input');
                retval.setAttribute('type', 'color');
                retval.className = 'jui__color';
            } else {
                var retval = document.createElement('input');
                retval.setAttribute('type', 'text');
            }

            retval.classList.add('jui__input');

            window.jui.registerSubmitElement(name, retval);
            
            if(!_tools.empty(value)) {
                if(preset === 1) {
                    retval.innerHTML = value;
                } else if(preset === 4) {
                    retval.dataset.value = value;
                    retval.value = value;
                } else {
                    retval.value = value;
                }
            }

            if(!_tools.empty(hint)) {
                retval.placeholder = hint;
            }

            window.jui.views.view.addProperties(retval, properties);

            return window.jui.views.view.addInputProperties(retval, properties);
        }

        return null;
    };

    return parse(jsonObject);
});


window.jui.views.input.date = (function () {
    var _this = window.jui.views.input.date;
    var _tools = window.jui.tools;

    var init = function() {
        var button = document.createElement('input');
        button.type = 'button';
        button.className = 'dateButton';
        button.value = 'Datum auswählen';

        button.addEventListener('click', _this.openDatePicker, false);

        return button;
    };

    _this.openDatePicker = function(event) {
        var target = event.target;

        window.jui.ui.datePicker.init(function(data) {
            target.dataset.value = data;
        });

        if(_tools.empty(target.dataset) || _tools.empty(target.dataset.value)) {
            var value = Math.round(new Date().getTime()/1000)
        } else {
            var value = target.dataset.value;
        }

        window.jui.ui.datePicker.setDate(value);
    };

    

    return init();
});