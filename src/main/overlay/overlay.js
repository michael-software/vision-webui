import './overlay.scss';

(function(overlay) {

	let _overlay = null;
	let _overlayClose = null;

	let init = () => {
		if(!_overlay) {
			if(document.querySelector('.overlay')) {
				_overlay = document.querySelector('.overlay');
			} else {
				_overlay = document.createElement('div');
					_overlay.className = 'overlay';
				document.body.appendChild(_overlay);
			}
		}
	};

	overlay.show = (callback, config) => {
		init();

		clearTimeout(_overlayClose);
		_overlay.style.display = 'block';

		_overlay.onclick = function(event) {
			event.stopPropagation();
			event.preventDefault();

			if(callback && callback.call) {
				callback.call(event);
			}

			return false;
		};

		document.addEventListener('keydown', preventEvent, false);

		if(config) {
			if(config.color) {
				_overlay.style.backgroundColor = config.color;
			}

			if(config.opacity) {
				_overlay.style.opacity = config.opacity;
			}
		}

		_overlay.classList.remove('overlay--hide');
	};

	overlay.hide = () => {
		init();

		_overlay.onclick = null;
		_overlay.classList.add('overlay--hide');

		document.removeEventListener('keydown', preventEvent, false);

		_overlayClose = window.setTimeout(() => {
			_overlay.style.display = 'none';
		}, 500);
	};

	let preventEvent = function(event) {
		event.stopPropagation();
		event.preventDefault();

		return false;
	}

})(window.overlay = {});