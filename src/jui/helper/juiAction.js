(function (action, window) {

    var actions = [];

	action.call = function(action) {
        var name = action.replace(/((?:.?)*)\(((?:.?)*)\)/, '$1').toLowerCase(); //(?<!\\)(?:\\{2})*\K"

/*
        values = action.replace(/((?:.?)*)\(((?:.?)*)\)/, '$2');
        values = values.replace(/ ,/g, ',').replace(/, /g, ',');

        //values = (' ' + values).replace(/([^(\\)])""/g, '$1');
        //values = (' ' + values).replace(/([^(\\)])"/g, '$1');  // RegEx: /(?<!\\)(?:\\{2})*\K"/g

        values = (' ' + values).replace(/([^(\\)])''/g, '$1');
        values = (' ' + values).replace(/([^(\\)])'/g, '$1');
        values = values.replace(/(^\s*')|('\s*$)/g, '');
        //values = values.replace(/,/g, '$1');
        values = values.trim();
        values = values.split(',');*/



        var values = action.replace(/((?:.?)*)\(((?:.?)*)\)/, '$2'); // removes name
        values = values.replace(/ ,/g, ',').replace(/, /g, ','); // deletes whitespace

        values = values.trim();


        if(values.charAt(0) === '\'')
            values = values.slice(1);
            
        if(values.charAt(values.length-1) === '\'')
            values = values.slice(0, values.length-1);

        values = values.split("','");

        console.log(name, values);

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
})(window.jui.action = {}, window);