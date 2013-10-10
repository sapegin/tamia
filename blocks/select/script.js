// Tâmia © 2013 Artem Sapegin http://sapegin.me
// Select with custom design

/*global tamia:false, Component:false*/
;(function(window, $, undefined) {
	'use strict';

	class Select extends Component {
		init() {
			this.selectElem = this.find('select');
			this.boxElem = this.find('box');

			this.on('focus', 'select', this.focus);
			this.on('blur', 'select', this.blur);
			this.on('change', 'select', this.change);

			this.change();
		}

		focus() {
			this.addState('focused');
		}

		blur() {
			this.removeState('focused');
		}

		change() {
			this.boxElem.text(this.selectElem.find(':selected').text());
		}
	}

	tamia.initComponents({select: Select});

}(window, jQuery));
