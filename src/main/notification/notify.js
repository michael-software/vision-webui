(function(notify) {
	function createNotification(notificationConfig) {
		var notification = new Notification(notificationConfig.title, notificationConfig);

		if(notificationConfig.onClick) {
			notification.onclick = notificationConfig.onClick;
		}

		if(notificationConfig.icon) {
			notification.icon = notificationConfig.icon;
		}

		if(notification.timeout !== -1)
		window.setTimeout(function() {
			notification.close();
		}, notification.timeout || 2000);

		return notification;
	}

	notify.send = function(notificationConfig) {
		if(notificationConfig.title) {
			var notification = null;

			// Let's check if the browser supports notifications
			if (!("Notification" in window)) {
				alert("This browser does not support desktop notification");
			}

			// Let's check whether notification permissions have alredy been granted
			else if (Notification.permission === "granted") {
				// If it's okay let's create a notification
				notification = createNotification(notificationConfig);
			}

			// Otherwise, we need to ask the user for permission
			else if (Notification.permission !== 'denied') {
				Notification.requestPermission(function (permission) {
					// If the user accepts, let's create a notification
					if (permission === "granted") {
						notification = createNotification(notificationConfig);
					}
				});

				notification = undefined;
			}

			// At last, if the user has denied notifications, and you
			// want to be respectful there is no need to bother them any more.

			return notification;
		}
	};
})(window.notify = {});