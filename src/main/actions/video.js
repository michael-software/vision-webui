import './video.scss';


window.ui = window.ui || {};

(function(videoPlayer) {
    let videoContainer = null;
    let videoElement = null;
	let videoControls = null;
	let videoPlay = null;
	let videoRange = null;
	let videoTime = null;
	let videoClose = null;

	let updateTime = true;
	let durationString = '';
	let currentTimeString = '0:00';

	let moveTimeout = null;
	let onEndedListener = null;

	videoPlayer.init = function() {
		if(!videoContainer) {
			videoContainer = document.createElement('div');
			videoContainer.className = 'video--container';
			videoContainer.style.display = 'none';

			videoContainer.oncontextmenu = function(event) {
			    event.preventDefault();

			    return false;
            };
			videoContainer.onmousemove = mouseMove;
			videoContainer.onclick = videoPlayer.toggle;
		}

		if(!videoElement) {
			if(document.querySelector('.video--player')) {
				videoElement = document.querySelector('.video--player');
			} else {
				videoElement = document.createElement('video');
				videoElement.className = 'video--player';
				videoElement.style.display = 'none';
				videoElement.style.maxWidth = '100%';
				videoContainer.appendChild(videoElement);
			}


			videoElement.ontimeupdate = updateRange;
			videoElement.onloadedmetadata = updateDuration;
			videoElement.onended = videoPlayer.stop;

			window.dimension.onResize(function() {
                videoElement.style.maxHeight = window.innerHeight + 'px';
            });
		}

		if(!videoControls) {
			videoControls = document.createElement('div');
			videoControls.className = 'video--controls';
			videoContainer.appendChild(videoControls);
        }

		if(!videoPlay) {
			videoPlay = document.createElement('div');
			videoPlay.className = 'video--play fa fa-play';
			videoControls.appendChild(videoPlay);

			videoPlay.onclick = function(event) {
			    event.stopPropagation();

				videoPlayer.toggle();
			}
		}

		if(!videoRange) {
			videoRange = document.createElement('input');
			videoRange.setAttribute('type', 'range');
			videoRange.min = 0;
			videoRange.value = 0;
			videoRange.className = 'video--range';
			videoControls.appendChild(videoRange);


			videoRange.onclick = function(event) {
			    event.stopPropagation();
            };
			videoRange.onmousedown = rangeSelectStart;
			videoRange.ontouchstart = rangeSelectStart;
			videoRange.onmouseup = rangeSelectEnd;
			videoRange.ontouchend = rangeSelectEnd;
		}

		if(!videoTime) {
			videoTime = document.createElement('div');
			videoTime.className = 'video--time';
			videoControls.appendChild(videoTime);
		}

		if(!videoClose) {
			videoClose = document.createElement('div');
			videoClose.className = 'video--close fa fa-close';
			videoContainer.appendChild(videoClose);

			videoClose.onclick = function(event) {
			    event.stopPropagation();

			    videoPlayer.stop();
			    window.overlay.hide();
            }
        }
    };


	videoPlayer.start = function(url) {
		videoPlayer.init();
		videoPlayer.stop();

		videoRange.value = 0;
		videoElement.src = url;
		videoContainer.style.display = 'block';
		videoElement.style.display = 'block';

		videoElement.oncanplay = function() {
			videoPlayer.play();
		};

		document.addEventListener('keyup', keyUp, false);
	};


	videoPlayer.play = function() {
		videoElement.play();

		videoPlay.classList.add('fa-pause');
		videoPlay.classList.remove('fa-play');
	};

	videoPlayer.pause = function() {
		videoElement.pause();

		videoPlay.classList.add('fa-play');
		videoPlay.classList.remove('fa-pause');
	};

	videoPlayer.stop = function() {
		videoPlayer.pause();

		if(onEndedListener) onEndedListener();
		onEndedListener = null;

		document.removeEventListener('keyup', keyUp, false);
    };

	videoPlayer.toggle = function(event) {
		if(videoElement.paused) {
			videoPlayer.play();
		} else {
			videoPlayer.pause();
		}
	};

	videoPlayer.getUi = function() {
	    videoPlayer.init();

		return videoContainer;
    };

	videoPlayer.setCurrentTime = function(value) {
		if(value && Math.floor(value) < videoElement.duration) {
			videoElement.currentTime = Math.floor(value);
		}
	};

	videoPlayer.showOverlay = function(value) {
		videoContainer.classList.remove('controls--hidden');
	};

	videoPlayer.hideOverlay = function(value) {
		videoContainer.classList.add('controls--hidden');
	};

	videoPlayer.onEnded = function(callback) {
	    if(callback && window.jui.tools.isFunction(callback)) {
			onEndedListener = callback;
        }

		if(callback === null) {
			onEndedListener = null;
		}
    };



	function keyUp(event) {
	    if(event.keyCode == 32) {
	        videoPlayer.toggle();
        }
    }

	function mouseMove(event) {
		clearTimeout(moveTimeout);

		videoPlayer.showOverlay();

		moveTimeout = window.setTimeout(function() {
			videoPlayer.hideOverlay();
        }, 5000);
    }

	function updateDuration() {
		videoRange.max = Math.floor(videoElement.duration);

		durationString = getTime( Math.floor(videoElement.duration) );
		updateTimeString();
	}

	function updateRange(event) {
		if(updateTime)
			videoRange.value = Math.floor(event.target.currentTime);

		currentTimeString = getTime(Math.floor(event.target.currentTime));
		updateTimeString();
	}

	function updateTimeString() {
		videoTime.innerHTML = currentTimeString + '/' + durationString;
	}

	function getTime(time) {
		let retval = '';
		let days = Math.floor(time/86400);
		let hours = Math.floor((time-days*86400)/3600);
		let minutes = Math.floor((time-days*86400-hours*3600)/60);
		let seconds = time - days*86400 - hours*3600 - minutes*60;

		if(days) {
			retval += days + ':';

			if(hours < 10) {
				retval += '0';
			}
		}

		if(hours) {
			retval += hours + ':';

			if(minutes < 10) {
				retval += '0';
			}
		}

		retval += (0 || minutes) + ':';

		if(seconds < 10) {
			retval += '0';
		}
		retval += (0 || seconds);

		return retval;
	}

	function rangeSelectStart(event) {
	    event.stopPropagation();

		updateTime = false;
	}

	function rangeSelectEnd(event) {
		event.stopPropagation();

		videoPlayer.setCurrentTime(videoRange.value);
		videoPlayer.play();

		updateTime = true;
	}

})(window.ui.videoPlayer = window.ui.videoPlayer || {});