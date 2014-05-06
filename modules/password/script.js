// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Password field with toggle to show characters

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var supported;
	var types = {
		locked: 'password',
		unlocked: 'text'
	};

	var Password = tamia.extend(tamia.Component, {
		binded: 'toggle focus',

		init: function() {
			this.bindAll('toggle', 'focus');

			this.fieldElem = this.elem.find('.js-field');
			this.toggleElem = this.elem.find('.js-toggle');

			// Mousedown instead of click to catch focused field
			this.elem.on('mousedown', '.js-toggle', this.toggle_);
		},

		isSupported: function() {
			if (supported !== undefined) return supported;

			// IE8+
			supported = $('<!--[if lte IE 8]><i></i><![endif]-->').find('i').length !== 1;
			return supported;
		},

		toggle: function() {
			var focused = document.activeElement === this.fieldElem[0];
			var locked = this.elem.hasState('unlocked');
			var fieldType = this.fieldElem.attr('type');

			this.elem.toggleState('unlocked');

			if (fieldType === types.locked && !locked) {
				this.fieldElem.attr('type', types.unlocked);
			}
			else if (fieldType === types.unlocked && locked) {
				this.fieldElem.attr('type', types.locked);
			}

			if (focused) {
				setTimeout(this.focus_, 0);
			}
		},

		focus: function() {
			this.fieldElem.focus();
		}
	});

	tamia.initComponents({password: Password});

}(window, jQuery));
