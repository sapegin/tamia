// Spinner

import { oporElement } from '../../opor';
import { animateToState, animateFromState, afterTransitions } from '../../animation';

const WRAPPER_CLASS = 'loader-wrapper';
const LOADING_STATE = 'loading';
const TEMPLATE = {
	block: 'loader-shade',
	content: {
		block: 'l-center',
		content: {
			block: 'spinner',
			mods: 'big',
		},
	},
};

export default function attachSpinner(elem) {
	elem.classList.add(WRAPPER_CLASS);
	let spinner = oporElement(TEMPLATE);
	elem.appendChild(spinner);

	animateToState(elem, LOADING_STATE);

	return () => {
		animateFromState(elem, LOADING_STATE);
		afterTransitions(spinner, () => {
			spinner.parentNode.removeChild(spinner);
			elem.classList.remove(WRAPPER_CLASS);
		});
	};
}
