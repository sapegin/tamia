import './polyfills';
import { log } from './debug/logger';
import data from './data';
import { isEventReceiver } from './util';
import isFunction from 'lodash/isFunction';

let cache = new WeakMap();

// TODO: store originalHandler as handler.__TamiaOriginalHandler ?

/**
 * Attach event handler.
 *
 * @param {HTMLElement} elem Element.
 * @param {string} eventName Event name.
 * @param {string} [selector] CSS selector for event delegation.
 * @param {Function} handler Handler function.
 * @param {Function} [originalHandler] Handler function that will be used to remove event handler with off() function.
 */
export function onEvent(elem, eventName, selector, handler, originalHandler) {
	if (isFunction(selector)) {
		// No selector specified
		originalHandler = handler || selector;
		handler = selector;
		selector = undefined;
	}
	else {
		// Delegation
		originalHandler = originalHandler || handler;
		handler = delegate(handler, selector, elem);
	}

	if (DEBUG) {
		if (!isEventReceiver(elem)) {
			throw new Error(`Element for ${eventName} event not found.`);
		}
		if (!isFunction(handler)) {
			throw new Error(`Handler for ${eventName} event is not a function.`);
		}
		handler.displayName = `${eventName} event handler`;
	}
	let wrappedHandler = (event) => {
		let details = event.detail || [];
		if (DEBUG && !selector && event.type !== 'scroll') {
			log(`Event ${event.type} on`, event.target, 'Details:', details);
		}
		handler(event, ...details);
	};
	cache.set(originalHandler, wrappedHandler);
	elem.addEventListener(eventName, wrappedHandler, false);
}

/**
 * Remove event handler.
 *
 * @param {HTMLElement} elem Element.
 * @param {string} eventName Event name.
 * @param {Function} handler Handler function.
 */
export function offEvent(elem, eventName, handler) {
	if (DEBUG) {
		if (!isEventReceiver(elem)) {
			throw new Error(`Element for ${eventName} event not found.`);
		}
		if (!isFunction(handler)) {
			throw new Error(`Handler for ${eventName} event is not a function.`);
		}
	}

	let wrappedHandler = cache.get(handler);
	elem.removeEventListener(eventName, wrappedHandler, false);
	cache.delete(handler);
}

/**
 * Attach event handler that will be executed only once.
 *
 * @param {HTMLElement} elem Element.
 * @param {string} eventName Event name.
 * @param {Function} handler Handler function.
 */
export function oneEvent(elem, eventName, handler) {
	if (DEBUG) {
		if (!isEventReceiver(elem)) {
			throw new Error(`Element for ${eventName} event not found.`);
		}
		if (!isFunction(handler)) {
			throw new Error(`Handler for ${eventName} event is not a function.`);
		}
	}

	let wrappedHandler = (...args) => {
		handler(...args);
		offEvent(elem, eventName, handler);
	};
	onEvent(elem, eventName, wrappedHandler, handler);
}

/**
 * Trigger custom DOM event.
 *
 * @param {HTMLElement} elem Element.
 * @param {string} eventName Event name.
 * @param {*} detail... Extra data.
 * @return {boolean}
 */
export function triggerEvent(elem, eventName, ...detail) {
	if (DEBUG) {
		if (!isEventReceiver(elem)) {
			throw new Error(`Element for ${eventName} event not found.`);
		}
	}

	let event;
	try {
		event = new window.CustomEvent(eventName, {
			bubbles: true,
			cancelable: true,
			detail,
		});
	}
	catch (e) {
		event = document.createEvent('CustomEvent');
		event.initCustomEvent(eventName, true, true, detail);
	}

	return elem.dispatchEvent(event);
}

/**
 * Trigger native DOM event (like `click`).
 *
 * @param {HTMLElement} elem Element.
 * @param {string} eventName Event name.
 * @return {boolean}
 */
export function triggerNativeEvent(elem, eventName) {
	if (DEBUG) {
		if (!isEventReceiver(elem)) {
			throw new Error(`Element for ${eventName} event not found.`);
		}
	}

	let event = document.createEvent('HTMLEvents');
	event.initEvent(eventName, true, false);
	return elem.dispatchEvent(event);
}

/**
 * Register events on the document.
 *
 * @param {object} handlers Handlers list.
 *
 * @example
 *
 * registerGlobalEvents({
 *    'tamia.foo.bar': (event, ...details) => { ... },
 * });
 */
export function registerGlobalEvents(handlers) {
	for (let eventName in handlers) {
		onEvent(document, eventName, handlers[eventName]);
	}
}

/**
 * Fire an event to a specified element on click at this element.
 *
 * @param {string} data-fire Event name.
 * @param {string} [data-target] Target element selector.
 * @param {string} [data-closest] Target element selector: search only through element ancestors.
 * @param {string} [data-attrs] Comma separated attributes list.
 *
 * Either of data-target or data-closest is required.
 *
 * Example:
 *
 *   <span data-fire="slider-next" data-target=".portfolio" data-attrs="1,2,3">Next</span>
 *
 *   triggerEvent($$('.portfolio', 'slider-next', [1, 2, 3]);
 */
onEvent(document, 'click', '[data-fire]', (event) => {
	event.preventDefault();

	let elem = event.target;
	let target = data(elem, 'target');
	let closest = data(elem, 'closest');
	let attrs = data(elem, 'attrs');
	let eventName = data(elem, 'fire');

	if (DEBUG && !target && !closest) {
		throw new Error(`You should define either data-target or data-closest on ${elem}.`);
	}

	let targetElem = target ? document.querySelector(target) : elem.closest(closest);
	if (DEBUG && !targetElem) {
		throw new Error(`Target element ${target || closest} not found for ${elem}.`);
	}

	if (DEBUG) {
		log(`Fire event ${eventName} with attributes`, attrs || [], 'on', targetElem);
	}

	attrs = attrs ? attrs.split(/[;, ]/) : [];
	triggerEvent(targetElem, eventName, ...attrs);
});

/**
 * Event delegation.
 * Based on https://github.com/fat/bean
 *
 * @param {Function} func Handler.
 * @param {string} selector CSS selector.
 * @param {HTMLElement} root Root element.
 * @returns {Function}
 * @private
 */
function delegate(func, selector, root) {
	let findTarget = (target) => {
		let array = root.querySelectorAll(selector);
		for (; target && target !== root; target = target.parentNode) {
			for (let i = array.length; i--;) {
				if (array[i] === target) {
					return target;
				}
			}
		}
	};

	return (event, ...details) => {
		let match = findTarget(event.target);
		if (match) {
			if (DEBUG) {
				log(`Event ${event.type} on`, match, `Delegated: ${selector}.`, 'Details:', details);
			}
			Object.defineProperty(event, 'target', {
				enumerable: false,
				configurable: false,
				writable: false,
				value: match,
			});
			func(event, ...details);
		}
	};
}
