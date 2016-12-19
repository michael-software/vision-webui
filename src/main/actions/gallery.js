import './gallery.scss';

(function(gallery) {
	var galleryIndex = 0;
	var galleryArray = [];

	gallery.open = function(gallery, index) {
		console.log(gallery, index);

		if (window.jui.tools.isArray(gallery) && gallery.length > 0) {

			if (!window.jui.tools.isNumeric(index)) {
				index = 0;
			} else {
				index = parseInt(index);
			}

			if (!gallery[index]) {
				index = 0;
			}

			galleryArray = gallery;
			galleryIndex = index;


			var pUrl = gallery[index];

			var imageBox = document.createElement('div');
			imageBox.className = 'image-box';

			var image = document.createElement('img');
			image.src = window.user.server + '/api/file.php?file=' + encodeURIComponent(pUrl) + '&jwt=' + encodeURIComponent(window.user.token);
			image.style.maxWidth = '100%';
			image.style.maxHeight = '100%';

			imageBox.appendChild(image);


			var next = document.createElement('div');
			next.className = 'image-box__next fa fa-chevron-right';

			imageBox.appendChild(next);


			var last = document.createElement('div');
			last.className = 'image-box__last fa fa-chevron-left';

			imageBox.appendChild(last);


			next.onclick = function () {
				galleryNext(galleryArray, image, next, last);
			};

			last.onclick = function () {
				galleryLast(galleryArray, image, next, last);
			};

			imageBox.onclick = function(event) {
				event.preventDefault();
				event.stopPropagation();

				return false;
			};


			window.overlay.show(window.overlay.hide, {
				content: imageBox,
				centerContent: true
			});
		}
	};

	function galleryLast(galleryArray, image, next, last) {
		if (galleryIndex - 1 < 0) {
			galleryIndex = galleryArray.length;
		}

		galleryIndex--;

		console.log(galleryIndex);

		var pUrl = galleryArray[galleryIndex];

		image.src = window.user.server + '/api/file.php?file=' + encodeURIComponent(pUrl) + '&jwt=' + encodeURIComponent(window.user.token);
	}

	function galleryNext(galleryArray, image, next, last) {
		if (galleryIndex + 1 >= galleryArray.length) {
			galleryIndex = -1;
		}

		galleryIndex++;

		var pUrl = galleryArray[galleryIndex];

		image.src = window.user.server + '/api/file.php?file=' + encodeURIComponent(pUrl) + '&jwt=' + encodeURIComponent(window.user.token);
	}
})(window.gallery = {});