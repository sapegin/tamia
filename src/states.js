// Tâmia © 2015 Artem Sapegin http://sapegin.me
// https://github.com/tamiadev/tamia
// States management

define(['jquery'], function($) {
'use strict';

var _statePrefix = 'is-';
var _statesData = 'tamia-states';

/**
 * Toggles specified state on an element.
 *
 * State is a special CSS class: .is-name.
 *
 * @param {String} name State name.
 * @param {Boolean} [value] Add/remove state.
 * @return {jQuery}
 */
$.fn.toggleState = function(name, value) {
	return this.each(function eachToggleState() {
		var elem = $(this);
		var states = _getStates(elem);
		if (value === undefined) value = !states[name];
		else if (value === states[name]) return;
		states[name] = value;
		elem.toggleClass(_statePrefix + name, value);
	});
};

/**
 * Adds specified state to an element.
 *
 * @param {String} name State name.
 * @return {jQuery}
 */
$.fn.addState = function(name) {
	return this.toggleState(name, true);
};

/**
 * Removes specified state from an element.
 *
 * @param {String} name State name.
 * @return {jQuery}
 */
$.fn.removeState = function(name) {
	return this.toggleState(name, false);
};

/**
 * Returns whether an element has specified state.
 *
 * @param {String} name State name.
 * @return {Boolean}
 */
$.fn.hasState = function(name) {
	var states = _getStates(this);
	return !!states[name];
};

var _getStates = function(elem) {
	var states = elem.data(_statesData);
	if (!states) {
		states = {};
		var classes = elem[0].classList || elem[0].className.split(' ');
		for (var classIdx = 0; classIdx < classes.length; classIdx++) {
			var cls = classes[classIdx];
			if (cls.slice(0, 3) === _statePrefix) {
				states[cls.slice(3)] = true;
			}
		}
		elem.data(_statesData, states);
	}
	return states;
};

return $;

});
