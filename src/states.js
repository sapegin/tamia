import isElement from 'lodash/isElement';

/*
 * States management
 *
 * State is a special CSS class: .is-name.
 */

const STATE_PREFIX = 'is-';

/**
 * Toggle specified state on an element.
 *
 * @param {HTMLElement} elem Element.
 * @param {string} name State name.
 * @param {boolean} [value] Add/remove state.
 * @return {boolean}
 */
export function toggleState(elem, name, value) {
	if (DEBUG && !isElement(elem)) {
		throw new Error(`Cannot toggle state "${name}": element not found.`);
	}

	const cls = STATE_PREFIX + name;
	if (value === undefined || elem.classList.contains(cls) !== value) {
		return elem.classList.toggle(cls);
	}
	return value;
}

/**
 * Add specified state to an element.
 *
 * @param {HTMLElement} elem Element.
 * @param {string} name State name.
 */
export function addState(elem, name) {
	if (DEBUG && !isElement(elem)) {
		throw new Error(`Cannot add state "${name}": element not found.`);
	}

	elem.classList.add(STATE_PREFIX + name);
}

/**
 * Remove specified state from an element.
 *
 * @param {HTMLElement} elem Element.
 * @param {string} name State name.
 */
export function removeState(elem, name) {
	if (DEBUG && !isElement(elem)) {
		throw new Error(`Cannot remove state "${name}": element not found.`);
	}

	elem.classList.remove(STATE_PREFIX + name);
}

/**
 * Return whether an element has specified state.
 *
 * @param {HTMLElement} elem Element.
 * @param {string} name State name.
 * @return {boolean}
 */
export function hasState(elem, name) {
	if (DEBUG && !isElement(elem)) {
		throw new Error(`Cannot check state "${name}": element not found.`);
	}

	return elem.classList.contains(STATE_PREFIX + name);
}
