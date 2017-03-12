window.jui = {};

(function (tools, window) {
	var textWidthElement;
	var id = 0;

	tools.empty = function(value) {
		if(typeof value === "undefined" || value === undefined) {
            return true;
        }

		if(value === null) {
			return true;
		}

		if(value === '') {
            return true;
        }

		if(Array.isArray(value) && value.length <= 0) {
			return true;
		}

		if(value === 'null') {
			return true;
		}

		if(value === 'undefined') {
            return true;
        }

        return false;
	};

	tools.getHtmlId = function() {
		id++;
		return 'jui_id_' + id;
	};

	tools.isFunction = function(obj) {
		return !!(obj && obj.constructor && obj.call && obj.apply); // Thanks to: http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
	};

	tools.isObject = function(obj) {
		return obj !== null && typeof obj === 'object';
	};

	tools.isArray = function(obj) {
		if(!Array.isArray) {
			return Object.prototype.toString.call(obj) === "[object Array]";
		} else {
			return Array.isArray(obj);
		}
	};

	tools.inArray = function (needle, haystack) {
		if(!tools.isArray(haystack)) {
			return false;
		}

		if(haystack.indexOf(needle) > -1) {
			return true;
		}

		return false;
	};

	tools.isInteger = function(value) {
		return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
	};

	tools.isNumeric = function(value) {
		return tools.isInteger(value) || parseInt(value) != null;
	};

	tools.isString = function(obj) {
		return typeof obj === 'string' || obj instanceof String;
	};

	tools.isBoolean = function(obj) {
		return typeof obj === 'boolean' || 
          (typeof obj === 'object' && typeof obj.valueOf() === 'boolean');  // Thanks to: http://stackoverflow.com/questions/28814585/how-to-check-if-type-is-boolean
	};

	tools.getDaysInMonth = function(year, month) {
		return [31, (tools.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	};

	tools.isLeapYear = function(year) {
		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	};

	tools.getMonthName = function(month) {
		return window.jui.lang.get('month_names')[month];
	};

	tools.parseJSON = function(data) {
		try {
			return JSON.parse(data);
		} catch(error) {
			console.warn('Error while parsing JSON', error);

			return null;
		}
	};

	tools.parseJuiJSON = function(data) {
		if(data == '') {
			return [{
					type: 'heading',
					value: 'Der Server hat eine leere Antwort gesendet',
					color: '#FF0000'
				}
			];
		}

		var json = tools.parseJSON(data);

		if(json != null) {
			return json;
		} else {
			return [{
					type: 'heading',
					value: 'Error while parsing JSON',
					color: '#FF0000'
				},{
					type: 'text',
					value: data
				}
			];
		}
	};

	tools.requestSite = function(url, postData, headers, callback) {
		var xhr = new XMLHttpRequest();

		if(!tools.empty(postData)) {
			xhr.open('POST', url, true);
		} else {
			xhr.open('GET', url, true);
		}

		if(tools.empty(headers)) {
			headers = window.jui.getHeaders();
		}

		if(!tools.empty(headers) && tools.isArray(headers))
		for(var i = 0, x = headers.length; i < x; i++) {
			var header = headers[i];

			if(!tools.empty(header.name) && !tools.empty(header.value)) {
				var name = header.name;
				var value = header.value;

				xhr.setRequestHeader(name, value);
			}
		}

		xhr.onload = function(e) {
			if(!tools.empty(callback) && tools.isFunction(callback)) {
				callback.call(window, this.response, this.status);
			}
		};

		if(!tools.empty(postData)) {
			xhr.send(postData);
		} else {
			xhr.send();
		}
	};

	tools.convertHex = function (hex){
		var length = hex.length;

		if(hex.indexOf('#') == 0) {
			if(length == 4 || length == 7) {
				return hex;
			} else if(length == 8 || length == 9) {
				hex = hex.replace('#','');
				var opacity = parseInt(hex.substring(0,2), 16);
				var r = parseInt(hex.substring(2,4), 16);
				var g = parseInt(hex.substring(4,6), 16);
				var b = parseInt(hex.substring(6,8), 16);

				return 'rgba('+r+','+g+','+b+','+opacity/255+')';
			}
		} else if(length == 3 || length == 6) {
			return '#' + hex;
		}

		return '#000000';
	};

	tools.getTextWidth = function(element, text, font, fontSize, fontWeight) {
		if(textWidthElement == null) {
			textWidthElement = document.createElement('span');
			textWidthElement.style.display = 'none';
			document.querySelector('body').appendChild(textWidthElement);
		}

		textWidthElement.innerHTML = (text || element.value || element.innerHTML);
		textWidthElement.style.font = (font || element.style.font);
		textWidthElement.style.fontSize = (element.style.fontSize || fontSize);
		textWidthElement.style.fontWeight = (fontWeight || element.style.fontWeight);

		textWidthElement.style.display = 'inline';
		var width = textWidthElement.getBoundingClientRect().width;
		textWidthElement.style.display = 'none';


		return width;

		/* Thanks to http://jsfiddle.net/philfreo/MqM76/ */
		/*$.fn.textWidth = function(text, font) {
			if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
			$.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));

			return $.fn.textWidth.fakeEl.width();
		};*/
	};

	tools.objToFormData = function(obj) {
		var formData = new FormData();

		for(var key in obj) {
			if(obj.hasOwnProperty(key)) formData.append(key, obj);
		}

		return formData;
	};


	var randomNumbers = {};

	tools.getUniqueId = function(name, digits) {
		if(!randomNumbers[name]) randomNumbers[name] = [];
		if(!digits || digits < 1) digits = 16;
		var max = Math.pow(10, digits);


        if(randomNumbers[name].length >= max) return false;

		var random = Math.round( Math.random() * max );

		if(randomNumbers[name].indexOf(random) === -1) {
            randomNumbers[name].push(random);
			return random;
		} else {
			return tools.getUniqueId(name, digits);
		}
	};
})(window.jui.tools = {}, window);