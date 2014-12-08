// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Password field with toggle to show characters

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _supported;
	var _types = {
		locked: 'password',
		unlocked: 'text'
	};

	tamia.Password = tamia.extend(tamia.Component, {
		displayName: 'tamia.Password',
		binded: 'toggle focus',

		init: function() {
			this.bindAll('toggle', 'focus');

			this.fieldElem = this.elem.find('.js-field');
			this.toggleElem = this.elem.find('.js-toggle');

			// Mousedown instead of click to catch focused field
			this.elem.on('mousedown', '.js-toggle', this.toggle_);
		},

		isSupported: function() {
			if (_supported !== undefined) return _supported;

			// IE8+
			_supported = $('<!--[if lte IE 8]><i></i><![endif]-->').find('i').length !== 1;
			return _supported;
		},

		toggle: function() {
			var focused = document.activeElement === this.fieldElem[0];
			var locked = this.elem.hasState('unlocked');
			var fieldType = this.fieldElem.attr('type');

			this.elem.toggleState('unlocked');

			if (fieldType === _types.locked && !locked) {
				this.fieldElem.attr('type', _types.unlocked);
			}
			else if (fieldType === _types.unlocked && locked) {
				this.fieldElem.attr('type', _types.locked);
			}

			if (focused) {
				setTimeout(this.focus_, 0);
			}
		},

		focus: function() {
			this.fieldElem.focus();
		}
	});

	tamia.initComponents({password: tamia.Password});

}(window, jQuery));
