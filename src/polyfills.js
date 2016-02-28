const ELEMENT = Element.prototype;

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
