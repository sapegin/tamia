// Tâmia © 2013 Artem Sapegin http://sapegin.me
// https://github.com/sapegin/tamia
// JS component base class

;(function(window, $, undefined) {
	'use strict';

	/**
	 * JS component base class.
	 *
	 * Elements: any HTML element with class name that follow a pattern `.js-name` where `name` is an element name.
	 *
	 * States: any class on component root HTML node that follow a pattern `.is-state` where `state` is a state name.
	 * After initialization all components will have `ok` state.
	 *
	 * Example:
	 *
	 *   class Pony extends Component {
	 *     init() {
	 *       this.on('click', 'toggle', this.toggle);
	 *     }
	 *     toggle() {
	 *       this.toggleState('pink');
	 *     }
	 *   }
	 *
	 *   tamia.initComponents({pony: Pony});
	 *
	 *   <div class="pink-pony is-pink" data-component="pony">
	 *     <button class="pink-pony__button js-toggle">To pink or not to pink?</div>
	 *   </div>
	 */
	class Component {
		constructor(elem) {
			if (!this.isSupported()) return;
			this.elemNode = elem;
			this.elem = $(elem);
			this._fillStates();
			this.init();
			this.addState('ok');
		}

		/**
		 * Implement this method if you want to check whether browser is good for your component or not.
		 *
		 * @returns {Boolean}
		 */
		isSupported() {
			return true;
		}

		/**
		 * Put all your initialization code in this method.
		 */
		init() {
			// Should be implemented
		}

		/**
		 * Finds element.
		 *
		 * @param {String} name Element ID.
		 *
		 * @return {jQuery} Element with .js-name class.
		 */
		find(name) {
			return this.elem.find('.js-' + name).first();
		}

		/**
		 * Attaches event handler.
		 *
		 * @param {String} events Event names (space separated).
		 * @param {String} [element] Element id.
		 * @param {Function} handler Handler function (scope will automatically sets to this).
		 */
		on(...args) {
			this._toggleEvent('on', ...args);
		}

		/**
		 * Detaches event handler.
		 *
		 * @param {String} events Event names (space separated).
		 * @param {String} [element] Element id.
		 * @param {Function} handler Handler function (scope will automatically sets to this).
		 */
		off(...args) {
			this._toggleEvent('off', ...args);
		}

		/**
		 * Gets/sets component state(s).
		 *
		 * @param {String|Object} [name] State name or states map ({focused: true, selected: false}).
		 * @param {Boolean} [value] State value.
		 *
		 * @return {Boolean} Sate value if name specified.
		 * @return {Object} All states map if no arguments passed.
		 * @return Nothing if name is an Object or if value specified.
		 */
		state(name, value) {
			if (!arguments.length) {
				// No arguments passed, return all states
				return this.states;
			}

			if (typeof name === 'string') {
				// Single state
				if (value === undefined) {
					// Get
					return this.states[name];
				}
				else {
					// Set
					this.states[name] = value;
				}
			}
			else {
				// Multiple states
				Object.mixin(this.states, name);
			}

			this._updateStates();
		}

		/**
		 * Returns component state.
		 *
		 * @param {String} [name] State name.
		 *
		 * @return {Boolean} Sate value.
		 */
		hasState(name) {
			return !!this.states[name];
		}

		/**
		 * Sets state to true.
		 *
		 * @param {String} [name] State name.
		 */
		addState(name) {
			this.toggleState(name, true);
		}

		/**
		 * Sets state to false.
		 *
		 * @param {String} [name] State name.
		 */
		removeState(name) {
			this.toggleState(name, false);
		}

		/**
		 * Toggles state value.
		 *
		 * @param {String} [name] State name.
		 * @param {Boolean} [value] State value.
		 */
		toggleState(name, value = !this.states[name]) {
			this.states[name] = value;
			this._updateStates();
		}

		_toggleEvent(func, ...args) {
			if (typeof args[1] === 'string') {
				// Selector passed
				args[1] = '.js-' + args[1];
			}

			// Bind handler to this
			var funcArg = (typeof args[1] === 'function') ? 1 : 2;
			args[funcArg] = args[funcArg].bind(this);

			this.elem[func](...args);
		}


		_fillStates() {
			var states = {};
			var classes = this.elemNode.className.split(' ');
			for (let cls of classes) {
				if (cls.startsWith('is-')) {
					states[cls.replace(/^is-/, '')] = true;
				}
			}
			this.states = states;
		}

		_updateStates() {
			var classes = this.elemNode.className
				.replace(/\bis-[\w]+/g, '')
				.split(' ')
			;
			for (let name in this.states) {
				if (this.states[name]) {
					classes.push('is-' + name);
				}
			}
			this.elemNode.className = classes.join(' ');
		}
	}

	Component.__tamia_cmpnt__ = true;

	window.Component = Component;

}(window, window.jQuery));

