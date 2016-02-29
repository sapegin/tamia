import { onEvent, triggerEvent } from '../../events';
import data from '../../data';
import { log } from '../../debug/logger';

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
