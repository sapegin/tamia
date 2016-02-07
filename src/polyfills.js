const ELEMENT = Element.prototype;

// window.CustomEvent polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
if (!window.CustomEvent) {
	let CustomEvent = (name, params = { bubbles: false, cancelable: false, detail: undefined }) => {
		let event = document.createEvent('CustomEvent');
		event.initCustomEvent(name, params.bubbles, params.cancelable, params.detail);
		return event;
	};
	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;
}

// Unprefix Element.matches
if (!ELEMENT.matches) {
	ELEMENT.matches = ELEMENT.msMatchesSelector || ELEMENT.webkitMatchesSelector;
}

// Element.closest polyfill
// https://github.com/jonathantneal/closest
if (!ELEMENT.closest) {
	ELEMENT.closest = function closest(selector) {
		let element = this;

		while (element) {
			if (element.matches(selector)) {
				break;
			}

			element = element.parentElement;
		}

		return element;
	};
}
