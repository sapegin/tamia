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
			if (!elem || elem.nodeType !== 1) throw new ReferenceError('No DOM node passed to Component constructor.');

			this.elemNode = elem;
			this.elem = $(elem);
			this.initializable = this.isInitializable();
			if (!this.initializable) {
				return;
			}
			this._fillStates();
			if (this.isSupported()) {
				this.handlers = {};
				this.init();
				this.addState('ok');
			}
			else {
				this.fallback();
				this.addState('unsupported');
			}
		}

		/**
		 * Put all your initialization code in this method.
		 */
		init() {
			// Should be implemented
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
		 * Implement this method if you want to check whether component could be initialized.
		 *
		 * Example:
		 *
		 *   isInitializable() {
		 *     // Do not initialize component if it's not visible
		 *     return this.isVisible();
		 *   }
		 *
		 * @returns {Boolean}
		 */
		isInitializable() {
			return true;
		}

		/**
		 * You can implement this method to do some fallbacks. It will be called if isSupported() returns false.
		 */
		fallback() {
			// Could be implemented
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

		/**
		 * Returns component visibility.
		 *
		 * @return {Boolean}
		 */
		isVisible() {
			return !!(this.elemNode.offsetWidth || this.elemNode.offsetHeight);
		}

		_toggleEvent(action, ...args) {
			if (typeof args[1] === 'string') {
				// Selector passed
				args[1] = '.js-' + args[1];
			}

			// Bind handler to this
			var funcArg = args.length - 1;  // Last argument
			var func = args[funcArg];
			var handler;
			if (this.handlers[func]) {
				handler = this.handlers[func];
			}
			if (action === 'on') {
				if (handler) {
					handler.counter++;
				}
				else {
					this.handlers[func] = handler = {
						counter: 1,
						func: func.bind(this)
					};
				}
			}
			if (!handler) return;
			args[funcArg] = handler.func;

			// Pass to jQuery
			this.elem[action](...args);

			// Clean up
			if (action === 'off') {
				handler.counter--;
				if (handler.counter <= 0) {
					this.handlers[func] = null;
				}
			}
		}

		_fillStates() {
			var states = {};
			var classes = this.elemNode.className.split(' ');
			for (let clsName in classes) {
				var cls = classes[clsName];
				var re = /^is-/;
				if (re.test(cls)) {
					states[cls.replace(re, '')] = true;
				}
			}
			this.states = states;
		}

		_updateStates() {
			var classes = this.elemNode.className;
			classes = $.trim(classes.replace(/\bis-[-\w]+/g, ''));
			classes = classes.split(/ +/);
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

}(window, jQuery));

