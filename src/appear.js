import { triggerEvent, registerGlobalEvents } from './events';
import { addState, removeState, hasState } from './states';
import { afterTransitions } from './animation';
import data from './data';

const HIDDEN_STATE = 'hidden';
const TRANSITION_STATE = 'transit';
const APPEAR = 'appear';
const DISAPPEAR = 'disappear';
const APPEARED_EVENT = 'tamia.appeared';
const DISAPPEARED_EVENT = 'tamia.disappeared';
const TOGGLED_EVENT = 'tamia.toggled';

/**
 * Show element with CSS transition.
 *
 * tamia.appeared and tamia.toggled events will be fired the moment transition ends.
 *
 * Example:
 *
 *   .dialog {
 *     transition:opacity .5s ease-in-out;
 *     &.is-hidden {
 *       opacity:0;
 *     }
 *   }
 *
 *   <div class="dialog is-hidden js-dialog">...</div>
 *
 *   appear($$('.js-dialog'));
 *
 * @param {HTMLElement} elem DOM element.
 */
export function appear(elem) {
	if (data(elem, TRANSITION_STATE) === APPEAR) {
		return;
	}
	data(elem, TRANSITION_STATE, APPEAR);
	addState(elem, TRANSITION_STATE);

	// Force repaint
	elem.offsetHeight;  // eslint-disable-line no-unused-expressions

	if (data(elem, TRANSITION_STATE) !== APPEAR) {
		return;
	}
	removeState(elem, HIDDEN_STATE);
	afterTransitions(elem, () => {
		data(elem, TRANSITION_STATE, null);
		removeState(elem, TRANSITION_STATE);
		triggerEvent(elem, APPEARED_EVENT);
		triggerEvent(elem, TOGGLED_EVENT, true);
	});
}

/**
 * Hide element with CSS transition.
 *
 * tamia.disappeared and tamia.toggled events will be fired the moment transition ends.
 *
 * @param {HTMLElement} elem DOM element.
 */
export function disappear(elem) {
	let transitionState = data(elem, TRANSITION_STATE);
	if (transitionState === DISAPPEAR || (!transitionState && hasState(elem, HIDDEN_STATE))) {
		return;
	}
	data(elem, TRANSITION_STATE, DISAPPEAR);
	addState(elem, TRANSITION_STATE);

	// Force repaint
	elem.offsetHeight;  // eslint-disable-line no-unused-expressions

	addState(elem, HIDDEN_STATE);
	afterTransitions(elem, () => {
		data(elem, TRANSITION_STATE, null);
		removeState(elem, TRANSITION_STATE);
		triggerEvent(elem, DISAPPEARED_EVENT);
		triggerEvent(elem, TOGGLED_EVENT, false);
	});
}

/**
 * Toggle element’s visibility with CSS transition.
 * See appear/disappear for details.
 *
 * @param {HTMLElement} elem DOM element.
 */
export function toggle(elem) {
	if (hasState(elem, HIDDEN_STATE)) {
		appear(elem);
	}
	else {
		disappear(elem);
	}
}

registerGlobalEvents({
	'tamia.appear': event => appear(event.target),
	'tamia.disappear': event => disappear(event.target),
	'tamia.toggle': event => toggle(event.target),
});
