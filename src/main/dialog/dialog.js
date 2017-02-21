import './dialog.scss';

(function(dialog) {

	dialog.alert = function(value) {
		var dialog = document.createElement('div');
		dialog.className = 'dialog';
		dialog.appendChild(document.createTextNode(value));
		dialog.addEventListener('click', function(event) {
			event.stopPropagation();
			event.preventDefault();

			return false;
		});

		var buttonOk = document.createElement('button');
		buttonOk.innerText = 'OK';
		buttonOk.addEventListener('click', function() {
			window.overlay.hide();
		});

		dialog.appendChild(buttonOk);

		window.overlay.show(function() {
			window.overlay.hide();
		}, {
			color: '#666666',
			opacity: 0.8,
			content: dialog,
			centerContent: true
		});
	};

})(window.dialog = {});