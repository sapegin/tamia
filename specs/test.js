// Tâmia © 2013 Artem Sapegin http://sapegin.me

/*global tamia:false, Component:false*/
;(function(window, $, undefined) {
	'use strict';

	/**
	 * Hidden component
	 */
	class Hidden extends Component {
		init() {
			this.addState('pony');
		}

		isInitializable() {
			return this.isVisible();
		}
	}

	tamia.initComponents({hidden: Hidden});


	/**
	 * Unsupported component
	 */
	class Unsupported extends Component {
		init() {
			this.addState('pony');
		}

		fallback() {
			this.addState('no-pony');
		}

		isSupported() {
			return false;
		}
	}

	tamia.initComponents({unsupported: Unsupported});


	/**
	 * Test component
	 */
	class Test extends Component {
		init() {
			this.reset();
			this.on('test1', 'elem', this.handler);
			this.on('test2', 'elem', this.handler);
		}

		detachFirstHandler() {
			this.off('test1', 'elem', this.handler);
		}

		detachSecondHandler() {
			this.off('test2', 'elem', this.handler);
		}

		reset() {
			this.handled = false;
		}

		handler() {
			this.handled = true;
		}
	}

	window.Test = Test;



}(window, window.jQuery));
