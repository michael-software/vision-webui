window.fontAwesomeImage = (function (faClass, width, height, padding) {
	if(faClass) {
		var retval = document.createElement('div');

		if(width) retval.style.width = width + 'px';
		if(height) retval.style.height = height + 'px';

		if(width || height) {
			retval.style.overflow = 'hidden';
		}
		retval.style.textAlign = 'center';

		var size = width;
		if(height > width) size = height;
		size -= padding;


		var faElement = document.createElement('i');
			faElement.className = 'fa ' + faClass;
			faElement.style.fontSize = size + 'px';
			faElement.style.lineHeight = size + padding + 'px';
		retval.appendChild(faElement);

		return retval;
	}

	return null;
});