export default function addHeadElement(pSrc, pScript, pFunction) {
	var head = document.getElementsByTagName("head")[0] || document.documentElement;

	if(pScript != null && pScript == 'JS') {
		var script = document.createElement("script");
		script.src = pSrc;

		var done = false;

		script.onload = script.onreadystatechange = function() {
			if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
				pFunction();
				// Handle memory leak in IE
				script.onload = script.onreadystatechange = null;
				if ( head && script.parentNode ) {
					head.removeChild( script );
				}
			}
		};

		head.insertBefore(script, head.firstChild);
	} else if(pScript != null && pScript == 'CSS') {
		var link = document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = pSrc;

		link.onload = link.onreadystatechange = function() {
			if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
				pFunction();
			}
		};

		document.getElementsByTagName("head")[0].appendChild(link);
	}
};