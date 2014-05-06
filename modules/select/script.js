// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Select with custom design

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var Select = tamia.extend(tamia.Component, {
		binded: 'focus blur change',

		init: function() {
			this.selectElem = this.elem.find('.js-select');
			this.boxElem = this.elem.find('.js-box');

			this.elem.on('focus', '.js-select', this.focus_);
			this.elem.on('blur', '.js-select', this.blur_);
			this.elem.on('change', '.js-select', this.change_);

			this.change();
		},

		focus: function() {
			this.addState('focused');
		},

		blur: function() {
			this.removeState('focused');
		},

		change: function() {
			this.boxElem.text(this.selectElem.find(':selected').text());
		}
	});

	tamia.initComponents({select: Select});

}(window, jQuery));
