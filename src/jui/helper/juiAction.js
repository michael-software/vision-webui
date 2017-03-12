(function (action, window) {

    var actions = [];
    var _tools = window.jui.tools;

	action.call = function(pAction) {
		var name = null;
		var values = null;

	    if(_tools.isArray(pAction)) {
	    	action.map((singleAction) => {
				action.call(singleAction);
			});
		} else if(_tools.isObject(pAction)) {

	    	if(!pAction[action.shorthands.FUNCTION_NAME]) return;

			name = pAction[action.shorthands.FUNCTION_NAME].toLowerCase();

	    	values = pAction[action.shorthands.FUNCTION_PARAMETER] || [];


		} else {
			name = pAction.replace(/((?:.?)*)\(((?:.?)*)\)/, '$1').toLowerCase(); //(?<!\\)(?:\\{2})*\K"


			values = pAction.replace(/((?:.?)*)\(((?:.?)*)\)/, '$2'); // removes name
			values = values.replace(/ ,/g, ',').replace(/, /g, ','); // deletes whitespace

			values = values.trim();


			if (values.charAt(0) === '\'')
				values = values.slice(1);

			if (values.charAt(values.length - 1) === '\'')
				values = values.slice(0, values.length - 1);

			values = values.split("','");
		}

        if(!window.jui.tools.empty(actions))
        for(var i = 0, x = actions.length; i < x; i++) {
            if(actions[i].name === name) {
                actions[i].callback.apply(window, values);
                break;
            }
        }
	};

    action.caller = function(action) {
        return function (event) {
            event.preventDefault();

            window.jui.action.call(action);
        }
    };

    action.addAction = function(name, callback) {
        if(window.jui.tools.isFunction(callback)) {
            actions.push({
                name: name.toLowerCase(),
                callback: callback
            });
        }
    };

    action.addAction("openUrl", function(url) {
         var win = window.open(url, '_blank');
         win.focus();
    });

    action.addAction("submit", function() {
         window.jui.submit();
    });

    action.addAction('parseUrl', function(url) {
        window.jui.requestParse(url);
    })
})(window.jui.action = window.jui.action || {}, window);