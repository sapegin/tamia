// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Select with custom design

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var Select = tamia.extend(tamia.Component, {
		binded: 'focus blur change',

		init: function() {
			this.selectElem = this.elem.find('.js-select');
			if (DEBUG && !this.selectElem.length) throw new tamia.Error('Select: no <select class="js-select"> element found.');

			// Enhance DOM
			this.selectElem.addClass(tamia.OporClass({
				block: 'select',
				elem: 'select'
			}));
			this.boxElem = tamia.OporNode({
				block: 'select',
				elem: 'box'
			});
			this.elem.prepend(this.boxElem);

			this.selectElem.on({
				focus: this.focus_,
				blur: this.blur_,
				change: this.change_
			});

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

	tamia.initComponents({select: Select});

}(window, jQuery));
