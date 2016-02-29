import { onEvent, triggerEvent } from './events';
import { addState, removeState, hasState } from './states';
import { animateToState, animateFromState } from './animation';

const HIDDEN_STATE = 'hidden';
const TRANSITION_STATE = 'transit';
const APPEARED_EVENT = 'tamia.appeared';
const DISAPPEARED_EVENT = 'tamia.disappeared';
const TOGGLED_EVENT = 'tamia.toggled';

/**
 * Show element with CSS transition.
 *
 * `tamia.appeared` and `tamia.toggled` events will be fired the moment transition ends.
 *
 * @example
 *
 * .dialog {
 *   transition:opacity .5s ease-in-out;
 *   &.is-hidden {
 *     opacity: 0;
 *   }
 * }
 *
 * @example
 *
 * <div class="dialog is-hidden js-dialog">...</div>
 *
 * @example
 *
 * appear($$('.js-dialog'));
 *
 * @param {HTMLElement} elem DOM element.
 */
export function appear(elem) {
	addState(elem, TRANSITION_STATE);

	// Force repaint
	elem.offsetHeight;  // eslint-disable-line no-unused-expressions

	animateFromState(elem, HIDDEN_STATE, () => {
		removeState(elem, TRANSITION_STATE);
		triggerEvent(elem, APPEARED_EVENT);
		triggerEvent(elem, TOGGLED_EVENT, true);
	});
}

/**
 * Hide element with CSS transition.
 *
 * `tamia.disappeared` and `tamia.toggled` events will be fired the moment transition ends.
 *
 * @param {HTMLElement} elem DOM element.
 */
export function disappear(elem) {
	addState(elem, TRANSITION_STATE);

	// Force repaint
	elem.offsetHeight;  // eslint-disable-line no-unused-expressions

	animateToState(elem, HIDDEN_STATE, () => {
		removeState(elem, TRANSITION_STATE);
		triggerEvent(elem, DISAPPEARED_EVENT);
		triggerEvent(elem, TOGGLED_EVENT, false);
	});
}

/**
 * Toggle element’s visibility with CSS transition.
 * See [appear](#appear)/[disappear](#disappear) for details.
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

onEvent(document, 'tamia.appear', event => appear(event.target));
onEvent(document, 'tamia.disappear', event => disappear(event.target));
onEvent(document, 'tamia.toggle', event => toggle(event.target));
