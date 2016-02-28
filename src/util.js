/**
 * Check if a value is DOM element.
 *
 * @param {*} value A value to check.
 * @returns {boolean}
 * @private
 */
export function isElement(value) {
	return !!value && (value.nodeType === 1);
}

/**
 * Check if a value is DOM element, document or window.
 *
 * @param {*} value A value to check.
 * @returns {boolean}
 * @private
 */
export function isEventReceiver(value) {
	return !!value && (value.nodeType === 1 || value.nodeType === 9 || value === window);
}
