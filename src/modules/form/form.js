// Basic form controls

import { onEvent } from '../../events';
import { toggleState } from '../../states';

const FORM_ELEMENTS_SELECTOR = '.field, .button, .disablable';
const SUBMIT_BUTTON_SELECTOR = '[type="submit"]';
const DISABLED_STATE = 'disabled';

/**
 * Enable/disable form element.
 *
 * @param {HTMLElement} elem Element.
 * @param {boolean} enable Enable or disable.
 */
export function toggleElem(elem, enable) {
	toggleState(elem, DISABLED_STATE, !enable);
	if (enable) {
		elem.removeAttribute('disabled');
	}
	else {
		elem.setAttribute('disabled', 'disabled');
	}
}

/**
 * Enable/disable all elements that match specified CSS selector.
 *
 * @param {HTMLElement} container Container element.
 * @param {string} selector CSS selector.
 * @param {boolean} enable Enable or disable.
 */
export function toggleAll(container, selector, enable) {
	let elements = Array.from(container.querySelectorAll(selector));
	elements.forEach(elem => toggleElem(elem, enable));

	if (container.matches(selector)) {
		toggleElem(container, enable);
	}
}

/**
 * Enable/disable all form elements (.field, .button, .disablable) inside a container.
 *
 * @param {HTMLElement} container Container element.
 * @param {boolean} enable Enable or disable.
 */
export function toggleFields(container, enable) {
	toggleAll(container, FORM_ELEMENTS_SELECTOR, enable);
}

/**
 * Enable/disable submit button in a form.
 *
 * @param {HTMLElement} container Container element.
 * @param {boolean} enable Enable or disable.
 */
export function toggleSubmit(container, enable) {
	toggleAll(container, SUBMIT_BUTTON_SELECTOR, enable);
}

/**
 * Disable submit button on form submit.
 *
 * @param {boolean} autolock.
 *
 * Example:
 *
 *   <form action="..." data-autolock>...</form>
 */
onEvent(document, 'submit', '[data-autolock]', (event) => {
	toggleSubmit(event.target, false);
});
