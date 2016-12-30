import './music.scss';


window.ui = window.ui || {};

(function(audioPlayer) {
    let audioContainer = null;
    let audioControls = null;
    let audioElement = null;
    let audioPlay = null;
    let audioRange = null;
    let audioVolume = null;
    let audioTitle = null;
    let audioTime = null;
    let updateTime = true;
    let durationString = '';
    let currentTimeString = '0:00';

    audioPlayer.init = function() {
        if(!audioContainer) {
            audioContainer = document.createElement('div');
            audioContainer.className = 'audio--container';
        }

        if(!audioControls) {
            if(document.querySelector('.audio--controls')) {
                audioControls = document.querySelector('.audio--controls');
            } else {
                audioControls = document.createElement('div');
                audioControls.className = 'audio--controls';
                audioContainer.appendChild(audioControls);
            }
        }

        if(!audioElement) {
            if(document.querySelector('.audio--player')) {
                audioElement = document.querySelector('.audio--player');
            } else {
                audioElement = document.createElement('audio');
                audioElement.className = 'audio--player';
                audioElement.style.display = 'none';
                document.body.appendChild(audioElement);
            }

            audioElement.ontimeupdate = updateRange;
            audioElement.onloadedmetadata = updateDuration;
        }

        if(!audioPlay) {
            if(audioContainer.querySelector('.audio--play')) {
                audioPlay = document.querySelector('.audio--play');
            } else {
                audioPlay = document.createElement('div');
                audioPlay.className = 'audio--play fa fa-play';
                audioControls.appendChild(audioPlay);
            }

            audioPlay.onclick = function(event) {
                audioPlayer.toggle();
            }
        }

        if(!audioRange) {
            if(audioContainer.querySelector('.audio--range')) {
                audioRange = document.querySelector('.audio--range');
            } else {
                audioRange = document.createElement('input');
                audioRange.setAttribute('type', 'range');
                audioRange.className = 'audio--range';
                audioRange.min = 0;
                audioContainer.appendChild(audioRange);
            }

            audioRange.onmousedown = rangeSelectStart;
            audioRange.onmouseup = rangeSelectEnd;
        }


        if(!audioTitle) {
            if(audioContainer.querySelector('.audio--title')) {
                audioTitle = document.querySelector('.audio--title');
            } else {
                audioTitle = document.createElement('div');
                audioTitle.className = 'audio--title';
                audioControls.appendChild(audioTitle);
            }
        }

        if(!audioVolume) {
            if(audioContainer.querySelector('.audio--volume')) {
                audioVolume = document.querySelector('.audio--volume');
            } else {
                audioVolume = document.createElement('input');
                audioVolume.setAttribute('type', 'range');
                audioVolume.className = 'audio--volume';
                audioVolume.min = 0;
                audioVolume.max = 100;
                audioControls.appendChild(audioVolume);
            }

            audioVolume.onmousemove = function(event) {
                if(audioElement.volume != event.target.value/100)
                    audioPlayer.setVolume(event.target.value);
            }
        }

        if(!audioTime) {
            if(audioContainer.querySelector('.audio--time')) {
                audioTime = document.querySelector('.audio--time');
            } else {
                audioTime = document.createElement('div');
                audioTime.className = 'audio--time';
                audioContainer.appendChild(audioTime);
            }
        }
    };

    function rangeSelectStart(event) {
        updateTime = false;
    }

    function rangeSelectEnd(event) {
        audioPlayer.setCurrentTime(audioRange.value);
        audioPlayer.play();

        updateTime = true;
    }

    function updateDuration() {
        audioRange.max = Math.floor(audioElement.duration);

        durationString = getTime( Math.floor(audioElement.duration) );
        updateTimeString();
    }

    function updateRange(event) {
        if(updateTime)
            audioRange.value = Math.floor(event.target.currentTime);

        currentTimeString = getTime(Math.floor(event.target.currentTime));
        updateTimeString();
    }

    function updateTimeString() {
        audioTime.innerHTML = currentTimeString + '/' + durationString;
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

    audioPlayer.toggle = function(event) {
        if(audioElement.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    };

    audioPlayer.getUi = function (){
        audioPlayer.init();

        if(audioContainer)
            return audioContainer;

        return null;
    };

    audioPlayer.start = function(url) {
        audioPlayer.init();

        currentTimeString = '0:00';
        audioRange.value = 0;
        audioElement.src = url;
        audioVolume.value = Math.floor(audioElement.volume*100);
        audioPlayer.setTitle(url);

        audioPlayer.play();
    };

    audioPlayer.play = function() {
        audioElement.play();

        audioPlay.classList.add('fa-pause');
        audioPlay.classList.remove('fa-play');
    };

    audioPlayer.pause = function() {
        audioElement.pause();

        audioPlay.classList.add('fa-play');
        audioPlay.classList.remove('fa-pause');
    };

    audioPlayer.setCurrentTime = function(value) {
        if(value && Math.floor(value) < audioElement.duration) {
            audioElement.currentTime = Math.floor(value);
        }
    };

    audioPlayer.setVolume = function(value) {
        if(value && value < 100 && value >= 0) {
            audioElement.volume = value/100;
        }
    };

    audioPlayer.setTitle = function(title) {
        audioTitle.innerHTML = title;
    };
})(window.ui.audioPlayer = window.ui.audioPlayer || {});