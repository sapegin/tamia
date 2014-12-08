// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Flippable pane

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	tamia.Flippable = tamia.extend(tamia.Component, {
		displayName: 'tamia.Flippable',
		binded: 'toggle',

		init: function() {
			if (this.elem.hasClass('js-flip')) {
				this.elem.on('click', this.toggle_);
			}
			else {
				this.elem.on('click', '.js-flip', this.toggle_);
			}

			this.elem.on('flip.tamia', this.toggle_);
		},

		toggle: function() {
			this.elem.toggleState('flipped');
			this.elem.trigger('flipped.tamia', this.elem.hasState('flipped'));
		}
	});

	tamia.initComponents({flippable: tamia.Flippable});

}(window, jQuery));
