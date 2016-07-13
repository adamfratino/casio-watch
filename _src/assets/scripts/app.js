(function (window, document, undefined) {

	function getElement(cssClass) {
		return document.querySelector(cssClass);
	}

	// variables for indiglo
	var buttonLight = getElement('.watch__buttons-light');
	var buttonMode = getElement('.watch__buttons-mode');

	// variables for stopwatch toggle
	var buttonStartStop = getElement('.watch__buttons-startStop');

	// variables for mode toggle
	var watchBody = getElement('.watch__body');
	var watchClock = getElement('.watch__body-time');
	var watchStopwatch = getElement('.watch__body-stopwatch');

	// variables for hours toggle
	var watchMeridien = getElement('.watch__body-clockType-meridien');
	var watchMilitary = getElement('.watch__body-clockType-military');

	// variables for setting date/time
	var watchHour = getElement('.watch__body-time-h');
	var watchMinute = getElement('.watch__body-time-m');
	var watchSecond = getElement('.watch__body-time-s');
	var watchDay = getElement('.watch__body-date-day');
	var watchDayNumber = getElement('.watch__body-date-number');

	// variables for stopwatch
	var stopwatchMinute = getElement('.watch__body-stopwatch-m');
	var stopwatchSecond = getElement('.watch__body-stopwatch-s');
	var stopwatchMS = getElement('.watch__body-stopwatch-ms');

	var stopWatchModeActive = false;
	var stopWatchRunning = false;
	var militaryClock = false;

	function indigloHandler(on) {
		if (on) {
			watchBody.classList.add('js-indiglo');
		} else {
			watchBody.classList.remove('js-indiglo');
		}
	}

	function toggleWatchMode(mode) {
		if (mode === 'clock') {
			watchClock.classList.add('js-show');
			watchClock.classList.remove('js-hide');
			watchStopwatch.classList.add('js-hide');
			watchStopwatch.classList.remove('js-show');
			stopWatchModeActive = false;
		} else if (mode === 'stopwatch') {
			watchClock.classList.add('js-hide');
			watchClock.classList.remove('js-show');
			watchStopwatch.classList.add('js-show');
			watchStopwatch.classList.remove('js-hide');
			stopWatchModeActive = true;
		}
	}

	function toggleTimeMode(mode) {
		if (mode === 'meridiem') {
			watchMeridien.classList.remove('js-invisible');
			watchMilitary.classList.add('js-invisible');
			militaryClock = false;
		} else {
			watchMeridien.classList.add('js-invisible');
			watchMilitary.classList.remove('js-invisible');
			militaryClock = true;
		}
		setTime();
	}

	function toggleStopWatch(on) {
		if (on) {
			start();
			stopWatchRunning = true;
		} else {
			stop();
			stopWatchRunning = false;
		}
	}

	function setTime() {
		// variables for getting date/time
		var date = new Date;
		var seconds = date.getSeconds();
		var minutes = date.getMinutes();
		var hour = date.getHours();
		var day = date.getDate();
		var dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, etc.
		var days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
		var meridiem;

		if (seconds < 10) seconds = '0' + seconds;
		if (minutes < 10) minutes = '0' + minutes;

		if (!militaryClock) {
			meridiem = '';
			
			if (hour >= 12) {
				hour = hour - 12;
				meridiem = 'PM';
				watchMeridien.textContent = meridiem;
			}

			if (hour === 0) hour = 12;
		}

		var dayOfWeek = days[dayOfWeek];

		watchHour.textContent = hour;
		watchMinute.textContent = minutes;
		watchSecond.textContent = seconds;
		watchDayNumber.textContent = day;
		watchDay.textContent = dayOfWeek;
	}

	buttonLight.onmousedown = function() {
		indigloHandler(true);
		if (stopWatchModeActive && !stopWatchRunning) {
			reset();
		}
	};
	document.body.onmouseup = function() { indigloHandler(false); };

	buttonMode.onclick = function() {
		if (!stopWatchModeActive) {
			toggleWatchMode('stopwatch');
		} else {
			toggleWatchMode('clock');
		}
	};

	buttonStartStop.onclick = function() {
		if (!stopWatchModeActive) {
			if (militaryClock) {
				toggleTimeMode('meridiem');
			} else {
				toggleTimeMode('military');
			}
		} else if (!stopWatchRunning) {
			toggleStopWatch(true);
		} else if (stopWatchRunning) {
			toggleStopWatch(false);
		}
	};

	// clock
	setTime();
	setInterval(setTime, 1000);

})(window, document);
