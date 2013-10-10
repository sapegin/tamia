// Tâmia © 2013 Artem Sapegin http://sapegin.me
// Password field with toggle to show characters

/*global tamia:false, Component:false*/
;(function(window, $, undefined) {
	'use strict';

	var supported;

	class Password extends Component {
		init() {
			this.types = {
				locked: 'password',
				unlocked: 'text'
			};

			// Default states
			this.states = {
				locked: true
			};

			this.fieldElem = this.find('field');
			this.toggleElem = this.find('toggle');

			// Mousedown instead of click to catch focused field
			this.on('mousedown', 'toggle', this.toggle);
		}

		isSupported() {
			if (supported !== undefined) return supported;
			// IE8+
			supported = $('<!--[if lte IE 8]><i></i><![endif]-->').find('i').length !== 1;
			return supported;
		}

		toggle() {
			var focused = document.activeElement === this.fieldElem[0];
			var locked = !this.hasState('locked');

			var fieldType = this.fieldElem.attr('type');

			this.toggleState('locked');

			if (fieldType === this.types.locked && !locked) {
				this.fieldElem.attr('type', this.types.unlocked);
			}
			else if (fieldType === this.types.unlocked && locked) {
				this.fieldElem.attr('type', this.types.locked);
			}

			if (focused) {
				setTimeout(() => this.fieldElem.focus(), 0);
			}
		}
	}

	tamia.initComponents({password: Password});

}(window, jQuery));
