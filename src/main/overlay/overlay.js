import './overlay.scss';

(function(overlay) {

	let _overlay = null;
	let _overlayContent = null;
	let _overlayClose = null;

	let init = () => {
		if(!_overlay) {
			if(document.querySelector('.overlay')) {
				_overlay = document.querySelector('.overlay');
                _overlayContent = document.querySelector('.overlay__content');
			} else {
				_overlay = document.createElement('div');
					_overlay.className = 'overlay';
				document.body.appendChild(_overlay);

                _overlayContent = document.createElement('div');
                	_overlayContent.className = 'overlay__content';
                	_overlayContent.style.display = 'none';
                document.body.appendChild(_overlayContent);
			}
		}
	};

	overlay.show = (callback, config) => {
		init();

		if(config.content) {
			_overlayContent.innerHTML = '';
            _overlayContent.appendChild(config.content);

            if(config.centerContent) {
				_overlayContent.classList.add('overlay__content--center');
			}
		}

		clearTimeout(_overlayClose);
		_overlay.style.display = 'block';
        _overlayContent.style.display = 'block';

		_overlay.onclick = _overlayContent.onclick = function(event) {
			event.stopPropagation();
			event.preventDefault();

			if(callback && callback.call) {
				callback.call(event);
			}

			return false;
		};

		document.querySelector('.content').keydown = null;

		if(config) {
			if(config.color) {
				_overlay.style.backgroundColor = config.color;
			}

			if(config.opacity) {
				_overlay.style.opacity = config.opacity;
			}
		}

		_overlay.classList.remove('overlay--hide');
        _overlayContent.classList.remove('overlay__content--hide');
	};

	overlay.hide = () => {
		init();

		_overlay.onclick = null;
		_overlay.classList.add('overlay--hide');

        _overlayContent.classList.add('overlay__content--hide');
        _overlayContent.classList.remove('overlay__content--center');

		document.removeEventListener('keydown', preventEvent, false);

		_overlayClose = window.setTimeout(() => {
			_overlay.style.display = 'none';
            _overlayContent.style.display = 'none';
		}, 500);
	};

	let preventEvent = function(event) {
		event.stopPropagation();
		event.preventDefault();

		return false;
	}

})(window.overlay = {});