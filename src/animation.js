import { oneEvent } from './events';
import { addState, removeState } from './states';

/**
 * Run animation on an element, add regular CSS class.
 * Removes CSS class after animation end.
 *
 * @param {HTMLElement} elem DOM element.
 * @param {string} animation CSS class name.
 * @param {Function} [done] Animation end callback.
 */
export function animate(elem, animation, done) {
	window.requestAnimationFrame(() => {
		elem.classList.add(animation);
		afterTransitionsOrAnimations(elem, () => {
			elem.classList.remove(animation);
			if (done) {
				done();
			}
		});
	});
}

/**
 * Run animation on an element, add CSS state.
 * Do not remove CSS class after animation end.
 *
 * @param {HTMLElement} elem DOM element.
 * @param {string} state CSS class name.
 * @param {Function} [done] Animation end callback.
 */
export function animateToState(elem, state, done) {
	window.requestAnimationFrame(() => {
		addState(elem, state);
		if (done) {
			afterTransitionsOrAnimations(elem, done);
		}
	});
}
/**
 * Run animation on an element, remove CSS state.
 * Do not remove CSS class after animation end.
 *
 * @param {HTMLElement} elem DOM element.
 * @param {string} state CSS class name.
 * @param {Function} [done] Animation end callback.
 */
export function animateFromState(elem, state, done) {
	window.requestAnimationFrame(() => {
		removeState(elem, state);
		if (done) {
			afterTransitionsOrAnimations(elem, done);
		}
	});
}

/**
 * Fire callback after all element’s CSS transitions finished.
 *
 * @param {HTMLElement} elem DOM element.
 * @param {Function} callback Callback.
 */
export function afterTransitions(elem, callback) {
	// Based on https://github.com/ai/transition-events
	const after = getTransitionsEndTime(elem);
	setTimeout(() => requestAnimationFrame(callback), after);
}

/**
 * Fire callback after all element’s CSS transitions or animations finished.
 *
 * @param {HTMLElement} elem DOM element.
 * @param {Function} callback Callback.
 */
export function afterTransitionsOrAnimations(elem, callback) {
	if (parseInt(getComputedStyle(elem).animationDuration, 10) > 0) {
		oneEvent(elem, 'animationend', callback);
	}
	else {
		afterTransitions(elem, callback);
	}
}

/**
 * Return array of milliseconds for CSS value of `transition-duration` or `transition-delay`.
 *
 * @param {string} string transition-duration value.
 * @returns {Array}
 * @private
 */
function parseTimes(string) {
	const times = string.split(/,\s*/);
	return times.map((value) => {
		const number = parseFloat(value);
		if (value.match(/\ds/)) {
			return number * 1000;
		}
		return number;
	});
}

/**
 * Return time (in milliseconds) when the latest transition ends.
 *
 * @param {HTMLElement} elem DOM element.
 * @returns {number}
 * @private
 */
function getTransitionsEndTime(elem) {
	const styles = getComputedStyle(elem);
	let props = styles['transition-property'];
	if (!props) {
		return 0;
	}

	props = props.split(/,\s*/);
	const durations = parseTimes(styles['transition-duration']);
	const delays = parseTimes(styles['transition-delay']);

	return props.reduce((after, prop, propIdx) => {
		const duration = durations[durations.length === 1 ? 0 : propIdx];
		const delay = delays[delays.length === 1 ? 0 : propIdx];
		return after + delay + duration;
	}, 0);
}

export const _test = { parseTimes, getTransitionsEndTime };
