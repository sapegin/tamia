// Tâmia © 2013 Artem Sapegin http://sapegin.me
// https://github.com/sapegin/tamia
// JS core
// jQuery and Modernizr aren’t required but very useful

/*jshint newcap:false*/
/*global DEBUG:true, Modernizr:false, console:false*/

/**
 * Debug mode.
 *
 * You can use DEBUG global variable in your scripts to hide some code from minified production version of JavaScript.
 *
 * To make it work add to your Gruntfile:
 *
 *   uglify: {
 *     options: {
 *       compress: {
 *         global_defs: {
 *           DEBUG: !!grunt.option('debug')
 *         }
 *      }
 *    },
 *    ...
 *  }
 *
 * Then if you run `grunt --debug` DEBUG variable will be true and false if you run just `grunt`.
 */
if (typeof window.DEBUG === 'undefined') window.DEBUG = true;

;(function(window, jQuery, Modernizr, undefined) {
	'use strict';

	// IE8+
	if (!document.querySelectorAll) return;

	// Namespace
	var tamia = window.tamia = {};


	if (DEBUG) {
		// Debug logger
		var logger = function() {
			var args = Array.prototype.slice.call(arguments);
			var func = args.shift();
			args[0] = 'Tâmia: ' + args[0];
			console[func].apply(console, args);
		};
		var log = tamia.log = logger.bind(null, 'log');
		var warn = tamia.warn = logger.bind(null, 'warn');

		// Check optional dependencies
		if (!jQuery) warn('jQuery not found.');
		if (!Modernizr) warn('Modernizr not found.');

		// Check required Modernizr features
		$.each([
			'prefixed',
			'csstransitions',
			'cssgradients',
			'flexbox',
			'touch',
		], function(idx, feature) {
			if (!(feature in Modernizr)) warn('Modernizr should be built with "' + feature + '" feautre.');
		});
	}


	var _containersCache;
	var _components = {};
	var _initializedAttribute = '_tamia-yep';

	function _getContainers(parent) {
		return (parent || document).querySelectorAll('[data-component]');
	}


	/**
	 * Initialize components.
	 *
	 * @param {Object} components Initializers for each component.
	 *
	 * Examples:
	 *
	 *   <div data-component="pony"></div>
	 *
	 *   tamia.initComponents({
	 *     // New style component
	 *     pony: Pony,  // class Pony extends Component {...}
	 *     // Plain initializer
	 *     pony: function(elem) {
	 *       // $(elem) === <div data-component="pony">
	 *     },
	 *     // Initialize jQuery plugins (plain initializer)
	 *     jquerypony: function(elem) {
	 *       $(elem).pluginmethod({option1: 'val1', options2: 'val2'});
	 *       $(elem).pluginmethod2();
	 *     },
	 *     // Initialize jQuery plugins (shortcut)
	 *     jquerypony: {
	 *       pluginmethod: {option1: 'val1', options2: 'val2'},
	 *       pluginmethod2: ['attr1', 'attr2', 'attr3'],
	 *       pluginmethod3: null
	 *     }
	 *   }
	 *
	 * Caveats:
	 *
	 *   1. To initialize components inside container that was hidden or inside dynamically created container use
	 *   init.tamia event: `$('.js-container').trigger('init.tamia');`
	 *   2. No components will be initialized twice. It’s safe to trigger init.tamia event multiple times: only new nodes
	 *   or nodes that was hidden before will be affected.
	 */
	tamia.initComponents = function(components, parent) {
		var containers;
		if (parent === undefined) {
			containers = _containersCache || (_containersCache = _getContainers());
		}
		else {
			// Init all components inside DOM node
			containers = _getContainers(parent);
			components = _components;
		}

		// Init components
		for (var containerIdx = 0, containerCnt = containers.length; containerIdx < containerCnt; containerIdx++) {
			var container = containers[containerIdx];
			var componentName = container.getAttribute('data-component');
			var component = components[componentName];
			if (!component || container.hasAttribute(_initializedAttribute)) continue;

			var initialized = true;
			if ('__tamia_cmpnt__' in component) {
				// New style component
				initialized = (new component(container)).initializable;
			}
			else if (typeof component === 'function') {
				// Old style component
				initialized = component(container);
			}
			else if (jQuery) {
				// jQuery plugins shortcut
				for (var method in component) {
					var params = component[method];
					var elem = jQuery(container);
					if (DEBUG && !jQuery.isFunction(elem[method])) warn('jQuery method "%s" not found (used in "%s" component).', method, componentName);
					if (jQuery.isArray(params)) {
						elem[method].apply(elem, params);
					}
					else {
						elem[method](params);
					}
				}
			}

			if (initialized !== false) {
				container.setAttribute(_initializedAttribute, 'yes');
			}
		}

		// Add new components to all components array
		for (var name in components) {
			_components[name] = components[name];
		}
	};

	if (jQuery) {

		var _doc = jQuery(document);
		var _hiddenClass = 'is-hidden';
		var _transitionClass = 'is-transit';
		var _appearedEvent = 'appeared.tamia';
		var _disappearedEvent = 'disappeared.tamia';
		var _fallbackTimeout = 1000;

		var _transitionEndEvent = Modernizr && {
			WebkitTransition : 'webkitTransitionEnd',
			transition : 'transitionend'
		}[Modernizr.prefixed('transition')];

		var _removeTransitionClass = function(elem, callback) {
			var called = false;
			elem.one(_transitionEndEvent, function() {
				elem.removeClass(_transitionClass);
				callback();
				called = true;
			});

			// Fallback: http://blog.alexmaccaw.com/css-transitions
			setTimeout(function() {
				if (!called) {
					elem.removeClass(_transitionClass);
					callback();
				}
			}, _fallbackTimeout);
		};

		var _enableDisable = function(elem, enable) {
			var formElementsSelector = 'input,textarea,button';
			var formElements = elem.find(formElementsSelector).addBack(formElementsSelector);
			formElements[enable ? 'removeClass' : 'addClass']('is-disabled');
			formElements.attr('disabled', !enable);
		};

		var _handlers = {};

		/**
		 * Init components inside any jQuery node.
		 *
		 * Examples:
		 *
		 *   $(document).trigger('init.tamia');
		 *   $('.js-container').trigger('init.tamia');
		 */
		_handlers.init = function(elem) {
			tamia.initComponents(undefined, elem);
		};

		/**
		 * Show element with CSS transition.
		 *
		 * appeared.tamia event will be fired the moment transition ends.
		 *
		 * Example:
		 *
		 *   .dialog
		 *     transition: opacity .5s ease-in-out
		 *     ...
		 *     &.is-hidden
		 *       opacity: 0
		 *
		 *   <div class="dialog is-hidden js-dialog">...</div>
		 *
		 *   $('.js-dialog').trigger('appear.tamia');
		 */
		_handlers.appear = function(elem) {
			elem = $(elem);
			if (Modernizr && Modernizr.csstransitions) {
				if (elem.hasClass(_transitionClass) && !elem.hasClass(_hiddenClass)) return;
				elem.addClass(_transitionClass);
				setTimeout(function() {
					elem.removeClass(_hiddenClass);
					_removeTransitionClass(elem, function() {
						elem.trigger(_appearedEvent);
					});
				}, 0);
			}
			else {
				elem.removeClass(_hiddenClass);
				elem.trigger(_appearedEvent);
			}
		};

		/**
		 * Hide element with CSS transition.
		 *
		 * disappeared.tamia event will be fired the moment transition ends.
		 *
		 * Opposite of `appear.tamia` event.
		 */
		_handlers.disappear = function(elem) {
			elem = $(elem);
			if (Modernizr && Modernizr.csstransitions) {
				if (elem.hasClass(_transitionClass) && elem.hasClass(_hiddenClass)) return;
				elem.addClass(_transitionClass);
				elem.addClass(_hiddenClass);
				_removeTransitionClass(elem, function() {
					elem.trigger(_disappearedEvent);
				});
			}
			else {
				elem.addClass(_hiddenClass);
				elem.trigger(_disappearedEvent);
			}
		};

		/**
		 * Toggles element’s visibility with CSS transition.
		 *
		 * See `appear.tamia` event for details.
		 */
		_handlers.toggle = function(elem) {
			elem = $(elem);
			if (elem.hasClass(_transitionClass)) return;
			if (elem.hasClass(_hiddenClass)) {
				_handlers.appear(elem);
			}
			else {
				_handlers.disappear(elem);
			}
		};

		/**
		 * Disables all descendant form elements.
		 */
		_handlers.disable = function(elem) {
			_enableDisable($(elem), false);
		};

		/**
		 * Enables all descendant form elements.
		 */
		_handlers.enable = function(elem) {
			_enableDisable($(elem), true);
		};

		var _tamiaze = function (handler, name) {
			return name + '.tamia';
		};

		var _events = $.map(_handlers, _tamiaze).join(' ');
		_doc.on(_events, function(event) {
			if (DEBUG) log('Event "%s":', event.type, event.target);
			_handlers[event.type](event.target);
		});

		/**
		 * Controls.
		 *
		 * Fires jQuery event to specified element on click at this element.
		 *
		 * @param data-fire Event name.
		 * @param [data-target] Target element selector.
		 * @param [data-closest] Target element selector: search only through element ancestors.
		 * @param [data-attrs] Comma separated attributes list.
		 *
		 * Either of data-target or data-closest is required.
		 *
		 * Example:
		 *
		 *   <span data-fire="slider-next" data-target=".portfolio" data-attrs="1,2,3">Next</span>
		 *   <!-- $('.portfolio').trigger('slider-next', [1, 2, 3]); -->
		 */
		_doc.click(function(event) {
			var elem = event.target;
			var parent = elem.parentNode;
			if (parent && parent.getAttribute && parent.getAttribute('data-fire')) elem = parent;
			if (elem.getAttribute('data-fire') && elem.getAttribute('data-target') || elem.getAttribute('data-closest')) {
				elem = jQuery(elem);
				var data = elem.data();
				var target = data.target || elem.closest(data.closest);
				var attrs = data.attrs;
				if (DEBUG) log('Fire "%s" with attrs [%s] on', data.fire, attrs || '', target);
				jQuery(target).trigger(data.fire, attrs ? attrs.split(/[;, ]/) : undefined);
				event.preventDefault();
			}
		});

		/**
		 * Grid helper.
		 *
		 * Example:
		 *
		 *   <div data-component="grid"></div>
		 */
		if (DEBUG) tamia.initComponents({
			grid: function(elem) {
				elem = $(elem);
				elem
					.addClass('g-row')
					.html(
						new Array((elem.data('columns') || 12) + 1).join('<b class="g-debug-col" style="height:'+document.documentElement.scrollHeight+'px"></b>')
					)
				;
			}
		});

	}

}(window, window.jQuery, window.Modernizr));

(function() {
  'use strict';
  var $, Component,
    __slice = [].slice;

  $ = jQuery;

  Component = (function() {
    function Component(elem) {
      if (!elem || elem.nodeType !== 1) {
        throw new ReferenceError('No DOM node passed to Component constructor.');
      }
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
      } else {
        this.fallback();
        this.addState('unsupported');
      }
    }

    Component.prototype.isSupported = function() {
      return true;
    };

    Component.prototype.isInitializable = function() {
      return true;
    };

    Component.prototype.find = function(name) {
      return this.elem.find(".js-" + name).first();
    };

    Component.prototype.on = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this._toggleEvent.apply(this, ['on'].concat(__slice.call(args)));
    };

    Component.prototype.off = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this._toggleEvent.apply(this, ['off'].concat(__slice.call(args)));
    };

    Component.prototype.hasState = function(name) {
      return !!this.states[name];
    };

    Component.prototype.addState = function(name) {
      return this.toggleState(name, true);
    };

    Component.prototype.removeState = function(name) {
      return this.toggleState(name, false);
    };

    Component.prototype.toggleState = function(name, value) {
      if (value == null) {
        value = !this.states[name];
      }
      this.states[name] = value;
      return this._updateStates();
    };

    Component.prototype.isVisible = function() {
      return !!(this.elemNode.offsetWidth || this.elemNode.offsetHeight);
    };

    Component.prototype._toggleEvent = function() {
      var action, args, func, funcArg, handler, _ref;
      action = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (typeof args[1] === 'string') {
        args[1] = ".js-" + args[1];
      }
      funcArg = args.length - 1;
      func = args[funcArg];
      handler;
      if (this.handlers[func]) {
        handler = this.handlers[func];
      }
      if (action === 'on') {
        if (handler) {
          handler.counter++;
        } else {
          this.handlers[func] = handler = {
            counter: 1,
            func: func.bind(this)
          };
        }
      }
      if (!handler) {
        return;
      }
      args[funcArg] = handler.func;
      (_ref = this.elem)[action].apply(_ref, args);
      if (action === 'off') {
        handler.counter--;
        if (handler.counter <= 0) {
          return this.handlers[func] = null;
        }
      }
    };

    Component.prototype._fillStates = function() {
      var classes, cls, clsName, re, states;
      states = {};
      classes = this.elemNode.className.split(' ');
      for (clsName in classes) {
        cls = classes[clsName];
        re = /^is-/;
        if (re.test(cls)) {
          states[cls.replace(re, '')] = true;
        }
      }
      return this.states = states;
    };

    Component.prototype._updateStates = function() {
      var classes, name;
      classes = this.elemNode.className;
      classes = $.trim(classes.replace(/\bis-[-\w]+/g, ''));
      classes = classes.split(/\s+/);
      for (name in this.states) {
        if (this.states[name]) {
          classes.push("is-" + name);
        }
      }
      return this.elemNode.className = classes.join(' ');
    };

    return Component;

  })();

  Component.__tamia_cmpnt__ = true;

  window.Component = Component;

}).call(this);

(function() {
  'use strict';
  var Hidden, Test, Unsupported, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Hidden = (function(_super) {
    __extends(Hidden, _super);

    function Hidden() {
      _ref = Hidden.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Hidden.prototype.init = function() {
      return this.addState('pony');
    };

    Hidden.prototype.isInitializable = function() {
      return this.isVisible();
    };

    return Hidden;

  })(Component);

  tamia.initComponents({
    hidden: Hidden
  });

  Unsupported = (function(_super) {
    __extends(Unsupported, _super);

    function Unsupported() {
      _ref1 = Unsupported.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Unsupported.prototype.init = function() {
      return this.addState('pony');
    };

    Unsupported.prototype.fallback = function() {
      return this.addState('no-pony');
    };

    Unsupported.prototype.isSupported = function() {
      return false;
    };

    return Unsupported;

  })(Component);

  tamia.initComponents({
    unsupported: Unsupported
  });

  Test = (function(_super) {
    __extends(Test, _super);

    function Test() {
      _ref2 = Test.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Test.prototype.init = function() {
      this.reset();
      this.on('test1', 'elem', this.handler);
      return this.on('test2', 'elem', this.handler);
    };

    Test.prototype.detachFirstHandler = function() {
      return this.off('test1', 'elem', this.handler);
    };

    Test.prototype.detachSecondHandler = function() {
      return this.off('test2', 'elem', this.handler);
    };

    Test.prototype.reset = function() {
      return this.handled = false;
    };

    Test.prototype.handler = function() {
      return this.handled = true;
    };

    return Test;

  })(Component);

  window.Test = Test;

}).call(this);

(function() {
  'use strict';
  var $, Flippable, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = jQuery;

  Flippable = (function(_super) {
    __extends(Flippable, _super);

    function Flippable() {
      _ref = Flippable.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Flippable.prototype.init = function() {
      if (this.elem.hasClass('js-flip')) {
        return this.on('click', this.toggle);
      } else {
        return this.on('click', 'flip', this.toggle);
      }
    };

    Flippable.prototype.toggle = function() {
      return this.toggleState('flipped');
    };

    return Flippable;

  })(Component);

  tamia.initComponents({
    flippable: Flippable
  });

}).call(this);

(function() {
  'use strict';
  var $, Password, supported, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = jQuery;

  supported = false;

  Password = (function(_super) {
    __extends(Password, _super);

    function Password() {
      _ref = Password.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Password.prototype.init = function() {
      this.types = {
        locked: 'password',
        unlocked: 'text'
      };
      this.fieldElem = this.find('field');
      this.toggleElem = this.find('toggle');
      return this.on('mousedown', 'toggle', this.toggle);
    };

    Password.prototype.isSupported = function() {
      if (supported !== void 0) {
        return supported;
      }
      supported = $('<!--[if lte IE 8]><i></i><![endif]-->').find('i').length !== 1;
      return supported;
    };

    Password.prototype.toggle = function() {
      var fieldType, focused, locked,
        _this = this;
      focused = document.activeElement === this.fieldElem[0];
      locked = this.hasState('unlocked');
      fieldType = this.fieldElem.attr('type');
      this.toggleState('unlocked');
      if (fieldType === this.types.locked && !locked) {
        this.fieldElem.attr('type', this.types.unlocked);
      } else if (fieldType === this.types.unlocked && locked) {
        this.fieldElem.attr('type', this.types.locked);
      }
      if (focused) {
        return setTimeout((function() {
          return _this.fieldElem.focus();
        }), 0);
      }
    };

    return Password;

  })(Component);

  tamia.initComponents({
    password: Password
  });

}).call(this);

(function() {
  'use strict';
  var $, Select, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = jQuery;

  Select = (function(_super) {
    __extends(Select, _super);

    function Select() {
      _ref = Select.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Select.prototype.init = function() {
      this.selectElem = this.find('select');
      this.boxElem = this.find('box');
      this.on('focus', 'select', this.focus);
      this.on('blur', 'select', this.blur);
      this.on('change', 'select', this.change);
      return this.change();
    };

    Select.prototype.focus = function() {
      return this.addState('focused');
    };

    Select.prototype.blur = function() {
      return this.removeState('focused');
    };

    Select.prototype.change = function() {
      return this.boxElem.text(this.selectElem.find(':selected').text());
    };

    return Select;

  })(Component);

  tamia.initComponents({
    select: Select
  });

}).call(this);
