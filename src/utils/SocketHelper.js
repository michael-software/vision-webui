export default class SocketHelper {
    static uploadFile(socket, file) {
        if(file instanceof File) {
            let uploadId = window.jui.tools.getUniqueId('upload');

            let fr = new FileReader();

            fr.addEventListener("loadend", function() {
                // send the file over web sockets
                socket.emit('upload', {
                    id: uploadId,
                    name: file.name,
                    data: fr.result
                });
            });

            fr.readAsArrayBuffer(file);

            return uploadId;
        }

        return null;
    }
}