/**
 * Convert a value to an array if it is not an array.
 *
 * @param {*} array Array or not.
 * @returns {Array}
 */
export function ensureArray(array) {
	return Array.isArray(array) ? array : [array];
}

/**
 * Check if a value is DOM element.
 *
 * @param {*} value A value to check.
 * @returns {boolean}
 */
export function isElement(value) {
	return !!value && (value.nodeType === 1);
}

/**
 * Check if a value is DOM element, document or window.
 *
 * @param {*} value A value to check.
 * @returns {boolean}
 */
export function isEventReceiver(value) {
	return !!value && (value.nodeType === 1 || value.nodeType === 9 || value === window);
}
