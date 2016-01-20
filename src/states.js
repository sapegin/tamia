/**
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
	let cls = STATE_PREFIX + name;
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
	elem.classList.add(STATE_PREFIX + name);
}

/**
 * Remove specified state from an element.
 *
 * @param {HTMLElement} elem Element.
 * @param {string} name State name.
 */
export function removeState(elem, name) {
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
	return elem.classList.contains(STATE_PREFIX + name);
}
