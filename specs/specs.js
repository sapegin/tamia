const $ = document.querySelector.bind(document);

import './specs.styl';
import './modules';

import {
	onEvent,
} from '../src/index';

// Form
import { toggleSubmit, toggleFields } from '../src/modules/form';
let form = $('.js-form');
onEvent(document, 'click', '.js-disable', () => toggleFields(form, false));
onEvent(document, 'click', '.js-enable', () => toggleFields(form, true));
onEvent(document, 'click', '.js-lock', () => toggleSubmit(form, false));
onEvent(document, 'click', '.js-unlock', () => toggleSubmit(form, true));

// Spinner
import attachSpinner from '../src/modules/spinner';
let loaders = $('.js-loaders');
let hideSpinner;
onEvent(document, 'click', '.js-loading-start', () => {
	hideSpinner = attachSpinner(loaders);
});
onEvent(document, 'click', '.js-loading-stop', () => {
	if (hideSpinner) {
		hideSpinner();
		hideSpinner = null;
	}
});
