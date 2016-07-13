var	stopWatch = function() {
	// Private vars
	var	startAt	= 0;	// Time of last start / resume. (0 if not running)
	var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds

	var	now	= function() {
		return (new Date()).getTime();
	};

	this.stopWatchMinute = document.querySelector('.watch__body-stopwatch-m');
	this.stopWatchSecond = document.querySelector('.watch__body-stopwatch-s');
	this.stopWatchMS = document.querySelector('.watch__body-stopwatch-ms');
	this.stopWatch = document.querySelector('.watch__body-stopwatch');

	// Public methods
	// Start or resume
	this.start = function() {
		startAt	= startAt ? startAt : now();
	};

	// Stop or pause
	this.stop = function() {
		// If running, update elapsed time otherwise keep it
		lapTime	= startAt ? lapTime + now() - startAt : lapTime;
		startAt	= 0; // Paused
	};

	// Reset
	this.reset = function() {
		lapTime = startAt = 0;
	};

	// Duration
	this.time = function() {
		return lapTime + (startAt ? now() - startAt : 0);
	};
};

var x = new stopWatch();
var clocktimer;

function pad(num, size) {
	var s = '0000' + num;
	return s.substr(s.length - size);
}

function updateTime() {
	var time = x.time();
	var m = Math.floor( time / (60 * 1000) );
	var time = time % (60 * 1000);
	var s = Math.floor( time / 1000 );
	var ms = time % 1000;

	x.stopWatchMinute.textContent = pad(m, 2);
	x.stopWatchSecond.textContent = pad(s, 2);
	x.stopWatchMS.textContent = pad(ms, 2);
}

function start() {
	clocktimer = setInterval(updateTime, 1);
	x.stopWatch.classList.add('js-running');
	x.start();
}

function stop() {
	x.stop();
	clearInterval(clocktimer);
	x.stopWatch.classList.remove('js-running');
}

function reset() {
	stop();
	x.reset();
	updateTime();
}
