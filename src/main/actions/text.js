import './text.scss';

(function(actions) {

    var editorFrame;

    actions.openText = (type, value) => {
        let fileUrl = window.user.server + '/api/file.php?file='+encodeURIComponent(value)+'&jwt=' + encodeURIComponent(window.user.token);

        let mime = 'text/plain';
        if(type == 'html') {
            mime = 'text/html';
        }

        var obj = {
            'action': 'open',
            'value': fileUrl,
            'mime': mime
        };

        if(!editorFrame) {
            editorFrame = document.querySelector(".editor-frame");
            if(!editorFrame) {
                editorFrame = document.createElement('iframe');
                editorFrame.className = 'editor-frame';
                document.body.appendChild(editorFrame);
            }

            editorFrame.src = window.user.server + '/editor/index.html';

            editorFrame.onload = function () {
                editorFrame.contentWindow.postMessage(JSON.stringify(obj), "*");
                editorFrame.focus();
            };

            window.addEventListener('resize', function() {
                let clientHeight = document.body.clientHeight;
                let clientWidth = document.body.clientWidth;

                editorFrame.style.width = clientWidth + 'px';
                editorFrame.style.height = (clientHeight-window.dimension.getMenu('bottom')) + 'px';

                editorFrame.focus();
            }, false);

            editorFrame.style.width = document.body.clientWidth + 'px';
            editorFrame.style.height = (document.body.clientHeight-window.dimension.getMenu('bottom')) + 'px';
        } else {
            editorFrame.focus();
            editorFrame.contentWindow.postMessage(JSON.stringify(obj), "*");
        }


        window.onmessage = function receiveMessage(event) {
            // Do we trust the sender of this message?
            if (event.origin === "http://example.com:8080")
                return;

            try {
                let data = JSON.parse(event.data);

                switch (data.action) {
                    case 'save':
                        window.actions.saveText(value, data.value);
                        break;
                    default:
                        console.error('action not found', data.action);
                        break;
                }
            } catch(ex) {
                console.error('Error while parsing message', ex);
            }
        };

        document.body.style.overflow = 'hidden';
        editorFrame.style.display = 'block';


    };

    actions.saveText = (url, value) => {
        let fileUrl = window.user.server + '/api/file.php?file='+encodeURIComponent(url);

        window.loadingIndicator.show('save-text');

        let xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                closeEditor();
            }

            window.loadingIndicator.hide('save-text');
        });

        xhr.open("PUT", fileUrl);
        xhr.setRequestHeader("authorization", "bearer " + window.user.token);

        xhr.send(value);
    };

    function closeEditor() {
        if(editorFrame) {
            document.body.style.overflow = 'auto';
            editorFrame.style.display = 'none';
        }
    }

})(window.actions = window.actions || {});