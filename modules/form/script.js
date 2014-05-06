// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Basic form controls

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _formElementsSelector = '.field,.button,.disablable';
	var _disabledState = 'disabled';

	var _toggle = function(elem, enable) {
		var formElements = $(elem).find(_formElementsSelector).addBack(_formElementsSelector);
		formElements.toggleState(_disabledState, !enable);
		formElements.attr('disabled', !enable);
	};

	// Events
	tamia.registerEvents({
		/**
		 * Enables all descendant form elements.
		 */
		enable: function(elem) {
			_toggle(elem, true);
		},

		/**
		 * Disables all descendant form elements.
		 */
		disable: function(elem) {
			_toggle(elem, false);
		}
	});

}(window, jQuery));
