// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Select with custom design

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _selectClass = '.js-select';
	var _boxClass = '.js-box';

	tamia.Select = tamia.extend(tamia.Component, {
		displayName: 'tamia.Select',
		binded: 'focus blur change',

		init: function() {
			this.selectElem = this.elem.find(_selectClass);
			this.boxElem = this.elem.find(_boxClass);

			this.elem.on({
				focus: this.focus_,
				blur: this.blur_,
				change: this.change_
			}, _selectClass);

			this.change();
		},

		focus: function() {
			this.toggleFocused(true);
		},

		blur: function() {
			this.toggleFocused(false);
		},

		toggleFocused: function(toggle) {
			this.elem.toggleState('focused', toggle);
		},

		change: function() {
			this.boxElem.text(this.selectElem.find(':selected').text());
		}
	});

	tamia.initComponents({select: tamia.Select});

}(window, jQuery));
