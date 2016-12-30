import CallbackHelper from './utils/CallbackHelper';
import './main/actions/text.js';

(function(actions) {
	actions.openPlugin = (name, view, param, noHistory) => {

		let hash = name;
		if(view) hash += '/' + view;
		if(param) hash += '/' + param;

        if(location.hash == `#${hash}`) {
			CallbackHelper.call('reloadContent');
        }

		if(noHistory) {
			window.location.replace('#' + hash);
		} else {
			location.hash = hash;
		}

		//window.history.pushState({plugin: name}, name, url);
		//CallbackHelper.call('popstate', {plugin: name})
	};
})(window.actions = {});    actions.downloadFile = (value) => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let filename = "";
                    try {
                        let disposition = xhr.getResponseHeader('Content-Disposition');
                        if (disposition && disposition.indexOf('attachment') !== -1) {
                            let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                            let matches = filenameRegex.exec(disposition);
                            if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
                        }
                    } catch(error) {
						filename = value;
					}
                    let type = xhr.getResponseHeader('Content-Type');
					filename = filename || value;

                    console.log('filename', filename);

                    let blob = new Blob([this.response], { type: type });
                    if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                        window.navigator.msSaveBlob(blob, filename);
                    } else {
                        let URL = window.URL || window.webkitURL;
                        let downloadUrl = URL.createObjectURL(blob);

                        if (filename) {
                            // use HTML5 a[download] attribute to specify filename
                            let a = document.createElement("a");
                            // safari doesn't support this yet
                            if (typeof a.download === 'undefined') {
                                window.location = downloadUrl;
                            } else {
                                a.href = downloadUrl;
                                a.download = filename;
                                document.body.appendChild(a);
                                a.click();
                            }
                        } else {
                            window.location = downloadUrl;
                        }

                        setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
                    }
                }
            }
        });

        xhr.open('GET', window.user.server + '/api/file.php?file=' + encodeURIComponent(value));
        xhr.setRequestHeader('Authorization', 'bearer ' + window.user.token);

        xhr.send();
    }