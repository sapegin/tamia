// Tâmia © 2013 Artem Sapegin http://sapegin.me

/*global tamia:false*/
;(function(window, undefined) {
	'use strict';

	/**
	 * Hidden component
	 */
	var Hidden = tamia.extend(tamia.Component, {
		init: function() {
			this.elem.addState('pony');
		},

		isInitializable: function() {
			return this.isVisible();
		}
	});

	tamia.initComponents({hidden: Hidden});


	/**
	 * Unsupported component
	 */
	var Unsupported = tamia.extend(tamia.Component, {
		init: function() {
			this.elem.addState('pony');
		},

		fallback: function() {
			this.elem.addState('no-pony');
		},

		isSupported: function() {
			return false;
		}
	});

	tamia.initComponents({unsupported: Unsupported});


	/**
	 * Test component
	 */
	var Test = tamia.extend(tamia.Component, {
		binded: 'handler',

		init: function() {
			this.reset();
			this.elem.on('test1', '.js-elem', this.handler_);
			this.elem.on('test2', '.js-elem', this.handler_);
		},

		detachFirstHandler: function() {
			this.elem.off('test1', '.js-elem', this.handler_);
		},

		detachSecondHandler: function() {
			this.elem.off('test2', '.js-elem', this.handler_);
		},

		reset: function() {
			this.handled = false;
		},

		handler: function() {
			this.handled = true;
		}
	});

	window.Test = Test;

}(window));
