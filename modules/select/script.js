// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Select with custom design

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _disabledState = 'disabled';

	tamia.Select = tamia.extend(tamia.Component, {
		displayName: 'tamia.Select',
		binded: 'focus blur change',
		template: {
			block: 'select',
			node: 'root',
			content: [
				{
					block: 'select',
					elem: 'box',
					link: 'boxElem'
				},
				{
					block: 'select',
					elem: 'select',
					node: '.js-select',
					link: 'selectElem'
				}
			]
		},

		init: function() {
			this.selectElem.on({
				focus: this.focus_,
				blur: this.blur_,
				change: this.change_
			});

			if (this.elem.hasState(_disabledState)) {
				this.selectElem.prop(_disabledState, true);
			}

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
