import './notify';

export default class NotificationHelper {
	constructor(socket) {
		this.socket = socket;

		socket.on('notification', this.notify);
	}

	notify = (data) => {
		if(data.type === 'notification' && data.title) {
			let notificationObject = {
				title: data.title
			};

			if(data.message) {
				notificationObject.body = data.message;
			}

			notificationObject.icon = './images/vision_192.png';

			if(data.action) {
				notificationObject.onClick = window.jui.action.caller(data.action);
			}

			window.notify.send(notificationObject);
		}
	};
}