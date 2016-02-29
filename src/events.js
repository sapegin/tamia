import './polyfills';
import { log } from './debug/logger';
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
