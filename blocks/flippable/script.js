// Tâmia © 2013 Artem Sapegin http://sapegin.me
// Flippable pane

/*global tamia:false, Component:false*/
;(function(window, $, undefined) {
	'use strict';

	class Flippable extends Component {
		init() {
			if (this.elem.hasClass('js-flip')) {
				this.on('click', this.toggle);
			}
			else {
				this.on('click', 'flip', this.toggle);
			}
		}

		toggle() {
			this.toggleState('flipped');
		}
	}

	tamia.initComponents({flippable: Flippable});

}(window, window.jQuery));
