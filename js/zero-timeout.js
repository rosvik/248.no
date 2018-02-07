//
//   setTimeout with a shorter delay
//
// https://dbaron.org/log/20100309-faster-timeouts
//
// Most browsers don't support a delay shorter than 10 milliseconds,
// so by using window.postMessage(), you can get a shorter delay
// that can run around 50 times faster.
//


// Only add setZeroTimeout to the window object, and hide everything
// else in a closure.
(function() {
	var timeouts = [];
	var messageName = "zero-timeout-message";

	// Like setTimeout, but only takes a function argument.  There's
	// no time argument (always zero) and no arguments (you have to
	// use a closure).
	function setZeroTimeout(fn) {
		timeouts.push(fn);
		window.postMessage(messageName, "*");
	}

	function handleMessage(event) {
		if (event.source == window && event.data == messageName) {
			event.stopPropagation();
			if (timeouts.length > 0) {
				var fn = timeouts.shift();
				fn();
			}
		}
	}

	window.addEventListener("message", handleMessage, true);

	// Add the one thing we want added to the window object.
	window.setZeroTimeout = setZeroTimeout;
})();
