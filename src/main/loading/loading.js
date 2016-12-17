import './loading.scss';

(function(loader) {

	let _loader = null;
	let _queue = [];

	let init = () => {
		if(!_loader) {
			if(document.querySelector('.loadingIndicator--container')) {
				_loader = document.querySelector('loadingIndicator--container');
			} else {
				_loader = document.createElement('div');
					_loader.className = 'loadingIndicator--container';
					let loader = document.createElement('div');
						loader.className = 'loadingIndicator';
					_loader.appendChild(loader);
				document.body.appendChild(_loader);
			}
		}
	};

	let showLoader = () => {
		init();
		_loader.classList.remove('loadingIndicator--hide');

		window.overlay.show(null, {
			color: '#666666',
			opacity: 0.8
		});
	};

	let hideLoader = () => {
		init();
		_loader.classList.add('loadingIndicator--hide');

		window.overlay.hide();
	};

	loader.show = (key) => {
		if(key) {
			if(_queue.indexOf(key) === -1) {
				_queue.push(key);
				showLoader();
			}
		} else {
			showLoader();
		}
	};

	loader.hide = (key) => {
		if(key) {
			let index = _queue.indexOf(key);
			if(index !== -1) {
				_queue.splice(index, 1);
			}

			if(_queue.length == 0) {
				hideLoader();
			}
		} else {
			hideLoader();
		}
	}

})(window.loadingIndicator = {});