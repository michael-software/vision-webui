export default class Clock {
	constructor(node) {
		if(node.innerHTML !== undefined)
		this.clock = node;
	}

	stop() {
		clearInterval(this.interval);
	}

	start() {
		this.stop();
		this.interval = window.setInterval(this.updateClock.bind(this), 1000);
		this.updateClock();
	}

	updateClock() {
		this.clock.innerHTML = this.getTimeString( new Date(Date.now()) );
	};


	getTimeString(dateTime) {
		let retval = '';

		retval += dateTime.getHours() + ':';

		if(dateTime.getMinutes() < 10) {
			retval += '0';
		}
		retval += dateTime.getMinutes() + ':';

		if(dateTime.getSeconds() < 10) {
			retval += '0';
		}
		retval += dateTime.getSeconds();

		return retval;
	}
}