import './polyfills';
import { log } from './debug/logger';
import { TamiaError } from './util';

let handlersCache = {};

/**
 * Attach event handler.
 *
 * @param {HTMLElement} elem Element.
 * @param {string} eventName Event name.
 * @param {Function} handler Handler function.
 */
export function on(elem, eventName, handler) {
	if (DEBUG) {
		if (!handler) {
			throw new TamiaError(`Handler for ${eventName} event is not a function.`);
		}
		handler.displayName = `${eventName} event handler`;
	}
	let wrappedHandler = (event) => {
		let details = event.detail || [];
		if (DEBUG) {
			log(`Event ${event.type} on`, event.target, 'Details:', details);
		}
		handler(event, ...details);
	};
	handlersCache[handler] = wrappedHandler;
	elem.addEventListener(eventName, wrappedHandler, false);
}

/**
 * Remove event handler.
 *
 * @param {HTMLElement} elem Element.
 * @param {string} eventName Event name.
 * @param {Function} handler Handler function.
 */
export function off(elem, eventName, handler) {
	let wrappedHandler = handlersCache[handler];
	elem.removeEventListener(eventName, wrappedHandler, false);
	handlersCache[handler] = null;
}

/**
 * Trigger custom DOM event.
 *
 * @param {HTMLElement} elem Element.
 * @param {string} eventName Event name.
 * @param {*} detail... Extra data.
 */
export function trigger(elem, eventName, ...detail) {
	let params = {
		bubbles: true,
		cancelable: false,
		detail,
	};
	elem.dispatchEvent(new window.CustomEvent(eventName, params));
}

/**
 * Trigger native DOM event (like `click`).
 *
 * @param {HTMLElement} elem Element.
 * @param {string} eventName Event name.
 */
export function triggerNative(elem, eventName) {
	let event = document.createEvent('HTMLEvents');
	event.initEvent(eventName, true, false);
	elem.dispatchEvent(event);
}

/**
 * Register events on the document.
 *
 * @param {object} handlers Handlers list.
 *
 * Example:
 *
 *   registerGlobalEvents({
 *      'tamia.form.enable': (event, ...details) => { ... },
 *   });
 */
export function registerGlobalEvents(handlers) {
	for (let eventName in handlers) {
		on(document, eventName, handlers[eventName]);
	}
}
