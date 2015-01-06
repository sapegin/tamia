// Tâmia © 2014 Artem Sapegin http://sapegin.me
// https://github.com/sapegin/tamia
// JS component base class

/*global DEBUG:false, tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	/**
	 * @class JS component base class.
	 *
	 * Elements: any HTML element with class name that follow a pattern `.js-name` where `name` is an element name.
	 *
	 * States: any class on component root HTML node that follow a pattern `.is-state` where `state` is a state name.
	 * After initialization all components will have `ok` state.
	 *
	 * Example:
	 *
	 *   var Pony = tamia.extend(tamia.Component, {
	 *     binded: 'toggle',
	 *     init: function() {
	 *       this.elem.on('click', '.js-toggle', this.toggle_);
	 *     },
	 *     toggle: function() {
	 *       this.elem.toggleState('pink');
	 *     }
	 *   });
	 *
	 *   tamia.initComponents({pony: Pony});
	 *
	 *   <div class="pink-pony is-pink" data-component="pony">
	 *     <button class="pink-pony__button js-toggle">To pink or not to pink?</div>
	 *   </div>
	 */
	function Component(elem) {
		if (!elem || elem.nodeType !== 1) throw new ReferenceError('No DOM node passed to Component constructor.');

		// Bind methods to `this`
		if (this.binded) {
			if (typeof this.binded === 'string') this.binded = this.binded.split(' ');
			this.bindAll.apply(this, this.binded);
		}

		this.elemNode = elem;
		this.elem = $(elem);
		this.initializable = this.isInitializable();
		if (!this.initializable) return;

		if (this.isSupported()) {
			this.handlers = {};
			this.initHtml();
			this.init();
			this.elem.addState('ok');
		}
		else {
			this.fallback();
			this.elem.addState('unsupported');
		}
	}

	Component.prototype = {
		__tamia_cmpnt__: true,
		displayName: 'tamia.Component',

		/**
		 * List of methods that should be binded to `this` (see `bindAll` method).
		 *
		 * @type {String|Array}
		 */
		binded: null,

		/**
		 * Component’s OPORJSON template (see `initHtml` method).
		 */
		template: null,

		/**
		 * Put all your initialization code in this method.
		 */
		init: function() {
			// Should be implemented
		},

		/**
		 * You can implement this method to do destroy component.
		 */
		destroy: function() {
			// Could be implemented
		},

		/**
		 * Implement this method if you want to check whether browser is good for your component or not.
		 *
		 * @return {Boolean}
		 */
		isSupported: function() {
			return true;
		},

		/**
		 * Implement this method if you want to check whether component could be initialized.
		 *
		 * Example:
		 *
		 *   isInitializable: function() {
		 *     // Do not initialize component if it's not visible
		 *     return this.isVisible();
		 *   }
		 *
		 * @return {Boolean}
		 */
		isInitializable: function() {
			return true;
		},

		/**
		 * Implement this method to do some fallbacks. It will be called if isSupported() returns false.
		 */
		fallback: function() {
			// Could be implemented
		},

		/**
		 * Initialize HTML using OPORJSON stored in `this.template`.
		 */
		initHtml: function() {
			if (!this.template) return;
			if (DEBUG && !tamia.oporNode) throw new tamia.Error('Component.initHtml: Tâmia OPOR API not found. Please include tamia/tamia/opor.js.');
			var opor = tamia.oporNode(this.template, {
				root: this.elem
			});
			$.extend(this, opor.data('links'));
		},

		/**
		 * Binds all specified methods to this. Binded method names have `_` at the end.
		 *
		 * @param {String} method1... Method names
		 *
		 * Example:
		 *
		 *   this.bindAll('toggle');
		 *   this.elem.on('click', this.toggle_);
		 */
		bindAll: function() {
			if (arguments.length === 0) throw new tamia.Error('Component.bindAll: no method names passed.');
			for (var funcIdx = 0; funcIdx < arguments.length; funcIdx++) {
				var func = arguments[funcIdx];
				if (DEBUG && !this[func] || !$.isFunction(this[func])) throw new tamia.Error('Component.bindAll: method ' + func + ' not exists or not a function.');
				this[func + '_'] = this[func].bind(this);
			}
		},

		/**
		 * Returns component visibility.
		 *
		 * @return {Boolean}
		 */
		isVisible: function() {
			return !!(this.elemNode.offsetWidth || this.elemNode.offsetHeight);
		}
	};

	tamia.Component = Component;

}(window, jQuery));
