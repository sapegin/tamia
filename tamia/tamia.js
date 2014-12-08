// Tâmia © 2013 Artem Sapegin http://sapegin.me
// https://github.com/sapegin/tamia
// JS core
// jQuery is required. Modernizr and jQuery.Transitions aren’t required.

/*jshint newcap:false*/
/*global DEBUG:true, console:false, ga:false, mixpanel:false*/

// Debug mode is ON by default
if (typeof window.DEBUG === 'undefined') window.DEBUG = true;

;(function(window, jQuery, Modernizr, undefined) {
	'use strict';

	// IE8+
	if (!document.querySelectorAll) return;

	// Namespace
	var tamia = window.tamia = {};

	// Shortcuts
	var $ = jQuery;
	var slice = Array.prototype.slice;
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	// Custom exception
	tamia.Error = function(message) {
		if (DEBUG) warn.apply(null, arguments);
		this.name = 'TamiaError';
		this.message = message;
	};
	tamia.Error.prototype = new Error();


	/**
	 * Debugging.
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
	 *       }
	 *     },
	 *     // ...
	 *   }
	 *
	 * Then if you run `grunt --debug` DEBUG variable will be true and false if you run just `grunt`.
	 */
	if (DEBUG) {
		// Debug logger
		var addBadge = function(args, name, bg) {
			// Color console badge
			// Based on https://github.com/jbail/lumberjack
			var ua = navigator.userAgent.toLowerCase();
			if (ua.indexOf('chrome') !== -1 || ua.indexOf('firefox') !== -1) {
				var format = '%c %s %c ' + args.shift();
				args.unshift(format, 'background:' + bg + '; color:#fff', name, 'background:inherit; color:inherit');
			}
			else {
				args[0] = name + ': ' + args[0];
			}
			return args;
		};
		var logger = function() {
			var args = slice.call(arguments);
			var func = args.shift();
			console[func].apply(console, addBadge(args, 'Tâmia', '#aa759f'));
		};
		var log = tamia.log = logger.bind(null, 'log');
		var warn = tamia.warn = logger.bind(null, 'warn');

		/**
		 * Traces all object’s method calls and arguments.
		 *
		 * @param {Object} object Object.
		 * @param {String} [name=object.displayName] Object name.
		 *
		 * Example:
		 *
		 *   init: function() {
		 *     tamia.trace(this, 'ClassName');
		 *     // ...
		 *   }
		 */
		tamia.trace = function(object, name) {
			if (name === undefined) name = object.displayName || 'Object';
			var level = 0;

			var wrap = function(funcName) {
				var func = object[funcName];

				object[funcName] = function() {
					pre(funcName, slice.call(arguments));
					var result = func.apply(this, arguments);
					post();
					return result;
				};
			};

			var pre = function(funcName, args) {
				level++;
				var padding = new Array(level).join('.  ');
				console.log.apply(console, addBadge([padding + funcName, args || []], name, '#d73737'));
			};

			var post = function() {
				level--;
			};

			for (var funcName in object) {
				if ($.isFunction(object[funcName])) {
					wrap(funcName);
				}
			}
		};

		// Check dependencies
		if (!jQuery) throw tamia.Error('jQuery not found.');

		// Check optional dependencies
		if (jQuery && !jQuery.Transitions) warn('jQuery Transition Events plugin (tamia/vendor/transition-events.js) not found.');
		if (!Modernizr) warn('Modernizr not found.');

		// Check required Modernizr features
		if (Modernizr) $.each([
			'csstransitions',
			'cssgradients',
			'flexbox',
			'touch',
		], function(idx, feature) {
			if (!(feature in Modernizr)) warn('Modernizr should be built with "' + feature + '" feautre.');
		});
	}
	else {
		tamia.log = tamia.warn = tamia.trace = function() {};
	}


	var _containersCache;
	var _components = {};
	var _initializedAttribute = '_tamia-yep';

	function _getContainers(parent) {
		return (parent || document).querySelectorAll('[data-component]');
	}


	/**
	 * Components management.
	 */

	/**
	 * Initialize components.
	 *
	 * @param {Object} components Initializers for each component.
	 *
	 * @attribute data-component
	 *
	 * Examples:
	 *
	 *   <div data-component="pony"></div>
	 *
	 *   tamia.initComponents({
	 *     // New style component
	 *     pony: Pony,  // var Pony = tamia.extend(tamia.Component, { ... })
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
			var $container = $(container);
			var componentNames = container.getAttribute('data-component').split(' ');
			for (var componentIdx = 0; componentIdx < componentNames.length; componentIdx++) {
				var componentName = componentNames[componentIdx];
				var component = components[componentName];
				var initializedNames = $container.data(_initializedAttribute) || {};

				if (!component || initializedNames[componentName]) continue;

				var initialized = true;
				if (component.prototype && component.prototype.__tamia_cmpnt__) {
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
						var elem = $(container);
						if (DEBUG && !$.isFunction(elem[method])) warn('jQuery method "%s" not found (used in "%s" component).', method, componentName);
						if ($.isArray(params)) {
							elem[method].apply(elem, params);
						}
						else {
							elem[method](params);
						}
					}
				}

				if (initialized !== false) {
					initializedNames[componentName] = true;
					$container.data(_initializedAttribute, initializedNames);
				}
			}
		}

		// Add new components to all components array
		for (var name in components) {
			_components[name] = components[name];
		}
	};


	/**
	 * Common functions
	 */

	/**
	 * JavaScript inheritance.
	 *
	 * @param {Object} parent Parent object.
	 * @param {Object} props Child properties.
	 *
	 * Example:
	 *
	 *   var Pony = tamia.extend(tamia.Component, {
	 *     init: function() {
	 *       // ...
	 *     }
	 *   });
	 */
	tamia.extend = function(parent, props) {
		// Adapted from Backbone
		var child;

		// The constructor function for the new subclass is either defined by you (the "constructor" property
		// in your `extend` definition), or defaulted by us to simply call the parent's constructor.
		if (props && hasOwnProperty.call(props, 'constructor')) {
			child = props.constructor;
		}
		else {
			child = function() { return parent.apply(this, arguments); };
		}

		// Set the prototype chain to inherit from `parent`, without calling `parent`'s constructor function.
		var Ctor = function() { this.constructor = child; };
		Ctor.prototype = parent.prototype;
		child.prototype = new Ctor();

		// Add prototype properties (instance properties) to the subclass, if supplied.
		if (props) {
			for (var prop in props) {
				child.prototype[prop] = props[prop];
			}
		}

		// Copy displayName
		if (DEBUG && props.displayName) {
			child.displayName = props.displayName;
		}

		// Set a convenience property in case the parent's prototype is needed later.
		child.__super__ = parent.prototype;

		return child;
	};


	/**
	 * Delays a function for the given number of milliseconds, and then calls it with the specified arguments.
	 *
	 * @param {Function} func Function to call.
	 * @param {Object} [context] Function context (default: global).
	 * @param {Number} [wait] Time to wait, milliseconds (default: 0).
	 * @param {Mixed} [param1...] Any params to pass to function.
	 * @return {TimeoutId} Timeout handler.
	 */
	tamia.delay = function(func, context, wait) {
		var args = slice.call(arguments, 3);
		return setTimeout(function delayedFunc() { return func.apply(context || null, args); }, wait || 0);
	};


	var _doc = $(document);
	var _hiddenState = 'hidden';
	var _transitionState = 'transit';
	var _statePrefix = 'is-';
	var _statesData = 'tamia-states';
	var _appear = 'appear';
	var _disappear = 'disappear';
	var _appearedEvent = 'appeared.tamia';
	var _disappearedEvent = 'disappeared.tamia';
	var _toggledEvent = 'toggled.tamia';


	/**
	 * Animations management
	 */
	var _animations = {};

	/**
	 * Registers an animation.
	 *
	 * @param {Object} animations Animations list.
	 *
	 * Example:
	 *
	 *   tamia.registerAnimations({
	 *      slide: function(elem, done) {
	 *        $(elem).slideDown(done);
	 *      }
	 *   });
	 *   $('.js-elem').trigger('runanimation.tamia', 'slide');
	 */
	tamia.registerAnimations = function(animations) {
		$.extend(_animations, animations);
	};


	/**
	 * Events management
	 */

	/**
	 * Registers Tâmia events (eventname.tamia) on document.
	 *
	 * @param {Object} handlers Handlers list.
	 *
	 * Example:
	 *
	 *   // Registers enable.tamia event.
	 *   tamia.registerEvents({
	 *      enable: function(elem) {
	 *      }
	 *   });
	 */
	tamia.registerEvents = function(handlers) {
		var events = $.map(handlers, _tamiaze).join(' ');
		_doc.on(events, function onRegisterEventsEvent(event) {
			var eventName = [event.type, event.namespace].join('.').replace(/.tamia$/, '');
			var args = slice.call(arguments);
			args[0] = event.target;
			var handler = handlers[eventName];
			if (DEBUG) handler.displayName = eventName + '.tamia event handler';
			if (DEBUG) log('Event "%s":', eventName, args);
			handler.apply(null, args);
		});
	};

	var _tamiaze = function(handler, name) {
		return name + '.tamia';
	};


	/**
	 * Events
	 */
	var _handlers = {};

	/**
	 * Init components inside any jQuery node.
	 *
	 * @event init.tamia
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
	 * @event appear.tamia
	 *
	 * appeared.tamia and toggled.tamia events will be fired the moment transition ends.
	 *
	 * Example:
	 *
	 *   .dialog
	 *     transition: opacity .5s ease-in-out
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
			if (elem.data(_transitionState) === _appear) return;
			elem.data(_transitionState, _appear);
			elem.addState(_transitionState);
			setTimeout(function appearDelayed() {
				if (elem.data(_transitionState) !== _appear) return;
				elem.removeState(_hiddenState);
				elem.afterTransition(function appearAfterTransition() {
					elem.removeData(_transitionState);
					elem.removeState(_transitionState);
					elem.trigger(_appearedEvent);
					elem.trigger(_toggledEvent, true);
				});
			}, 0);
		}
		else {
			elem.removeState(_hiddenState);
			elem.trigger(_appearedEvent);
			elem.trigger(_toggledEvent, true);
		}
	};

	/**
	 * Hide element with CSS transition.
	 *
	 * @event disappear.tamia
	 *
	 * disappeared.tamia and toggled.tamia events will be fired the moment transition ends.
	 *
	 * Opposite of `appear.tamia` event.
	 */
	_handlers.disappear = function(elem) {
		elem = $(elem);
		if (Modernizr && Modernizr.csstransitions) {
			var transitionState = elem.data(_transitionState);
			if (transitionState === _disappear || (!transitionState && elem.hasState(_hiddenState))) return;
			elem.data(_transitionState, _disappear);
			elem.addState(_transitionState);
			elem.addState(_hiddenState);
			elem.afterTransition(function disappearAfterTransition() {
				elem.removeData(_transitionState);
				elem.removeState(_transitionState);
				elem.trigger(_disappearedEvent);
				elem.trigger(_toggledEvent, false);
			});
		}
		else {
			elem.addState(_hiddenState);
			elem.trigger(_disappearedEvent);
			elem.trigger(_toggledEvent, false);
		}
	};

	/**
	 * Toggles element’s visibility with CSS transition.
	 *
	 * @event toggle.tamia
	 *
	 * See `appear.tamia` event for details.
	 */
	_handlers.toggle = function(elem) {
		elem = $(elem);
		if (elem.hasState(_hiddenState)) {
			_handlers.appear(elem);
		}
		else {
			_handlers.disappear(elem);
		}
	};

	/**
	 * Runs animation on an element.
	 *
	 * @event runanimation.tamia
	 *
	 * @param {String|Function} animation Animation name, CSS class name or JS function.
	 * @param {Function} [done] Animation end callback.
	 *
	 * Animation name should be registered via `tamia.registerAnimations` function.
	 */
	_handlers.runanimation = function(elem, animation, done) {
		if (done === undefined) done = function() {};
		setTimeout(function runAnimationDelayed() {
			if (_animations[animation]) {
				_animations[animation](elem, done);
			}
			else if ($.isFunction(animation)) {
				animation(elem, done);
			}
			else {
				var animationDone = function() {
					elem.removeClass(animation);
					done();
				};
				elem = $(elem);
				elem.addClass(animation);
				if (elem.css('animation')) {
					elem.one('animationend webkitAnimationEnd MSAnimationEnd', animationDone);
				}
				else {
					elem.afterTransition(done);
				}
			}
		}, 0);
	};

	tamia.registerEvents(_handlers);


	/**
	 * Controls.
	 *
	 * Fires jQuery event to specified element on click at this element.
	 *
	 * @attribute data-fire
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
	 *
	 *   $('.portfolio').trigger('slider-next', [1, 2, 3]);
	 */
	 _doc.on('click', '[data-fire]', function onDataFireClick(event) {
		var elem = $(event.currentTarget);

		var data = elem.data();
		if (DEBUG) if (!data.target && !data.closest) return log('You should define either data-target or data-closest on', elem[0]);

		var target = data.target && $(data.target) || elem.closest(data.closest);
		if (DEBUG) if (!target.length) return log('Target element %s not found for', data.target || data.closest, elem[0]);

		var attrs = data.attrs;
		if (DEBUG) log('Fire "%s" with attrs [%s] on', data.fire, attrs || '', target);
		target.trigger(data.fire, attrs ? attrs.split(/[;, ]/) : undefined);

		event.preventDefault();
	});


	/**
	 * States management
	 */

	/**
	 * Toggles specified state on an element.
	 *
	 * State is a special CSS class: .is-name.
	 *
	 * @param {String} name State name.
	 * @param {Boolean} [value] Add/remove state.
	 * @return {jQuery}
	 */
	jQuery.fn.toggleState = function(name, value) {
		return this.each(function eachToggleState() {
			var elem = $(this);
			var states = _getStates(elem);
			if (value === undefined) value = !states[name];
			else if (value === states[name]) return;
			states[name] = value;
			elem.toggleClass(_statePrefix + name, value);
		});
	};

	/**
	 * Adds specified state to an element.
	 *
	 * @param {String} name State name.
	 * @return {jQuery}
	 */
	jQuery.fn.addState = function(name) {
		return this.toggleState(name, true);
	};

	/**
	 * Removes specified state from an element.
	 *
	 * @param {String} name State name.
	 * @return {jQuery}
	 */
	jQuery.fn.removeState = function(name) {
		return this.toggleState(name, false);
	};

	/**
	 * Returns whether an element has specified state.
	 *
	 * @param {String} name State name.
	 * @return {Boolean}
	 */
	jQuery.fn.hasState = function(name) {
		var states = _getStates(this);
		return !!states[name];
	};

	var _getStates = function(elem) {
		var states = elem.data(_statesData);
		if (!states) {
			states = {};
			var classes = elem[0].classList || elem[0].className.split(' ');
			for (var classIdx = 0; classIdx < classes.length; classIdx++) {
				var cls = classes[classIdx];
				if (cls.slice(0, 3) === _statePrefix) {
					states[cls.slice(3)] = true;
				}
			}
			elem.data(_statesData, states);
		}
		return states;
	};


	/**
	 * Templates
	 */

	/**
	 * Simplest template.
	 *
	 * Just replaces {something} with data.something.
	 *
	 * @param {String} tmpl Template.
	 * @param {String} data Template context.
	 * @return {String} HTML.
	 */
	tamia.stmpl = function(tmpl, data) {
		return tmpl.replace(/\{([^\}]+)\}/g, function stmplReplace(m, key) {
			return data[key] || '';
		});
	};

	var _templates = window.__templates;
	if (_templates) {
		/**
		 * Invokes precompiled template.
		 *
		 * Templates should be stored in window.__templates.
		 *
		 * @param {String} tmplId Template ID.
		 * @param {String} data Template context.
		 * @return {String} HTML.
		 */
		tamia.tmpl = function(tmplId, data) {
			var tmpl = _templates[tmplId];
			if (DEBUG) if (!tmpl) warn('Template %s not found.', tmplId);
			return tmpl(data);
		};

		/**
		 * Replaces jQuery node’s content with the result of template invocation.
		 *
		 * @param {String} tmplId Template ID.
		 * @param {String} data Template context.
		 * @return {jQuery}
		 */
		jQuery.fn.tmpl = function(tmplId, data) {
			var html = tamia.tmpl(tmplId, data);
			return $(this).html(html);
		};
	}


	/**
	 * Google Analytics or Mixpanel events tracking.
	 *
	 * @param data-track Event name ('link' if empty).
	 * @param [data-track-extra] Extra data.
	 *
	 * @attribute data-track
	 *
	 * Examples:
	 *
	 *   <a href="http://github.com/" data-track>GitHub</span>
	 *   <span class="js-slider-next" data-track="slider" data-track-extra="next">Next</span>
	 */
	if ('ga' in window || 'mixpanel' in window) _doc.on('click', '[data-track]', function onDataTrackClick(event) {
		var mp = 'mixpanel' in window;
		var elem = $(event.currentTarget);
		var eventName = elem.data('track') || (mp ? 'Link clicked' : 'link');
		var eventExtra = elem.data('track-extra') || (mp ? undefined : 'click');
		var url = elem.attr('href');
		var link = url && !event.metaKey && !event.ctrlKey;
		var callback;
		if (link) {
			event.preventDefault();
			callback = function() {
				document.location = url;
			};
		}
		if (mp) {
			var props = {URL: url};
			if (eventExtra) props.Extra = eventExtra;
			mixpanel.track(eventName, props, callback);
		}
		else {
			ga('send', 'event', eventName, eventExtra, url, {hitCallback: callback});
		}
	});


	/**
	 * Grid debugger.
	 *
	 * Hotkeys:
	 *
	 * - ? - Toggle help.
	 * - g - Toggle grid.
	 * - o - Toggle layout outlines.
	 * - a - Toggle all elements outlines.
	 */
	if (DEBUG) {
		var layoutClassesAdded = false;
		var gridDebugger;

		var toggleGrid = function() {
			addLayoutClasses();
			addGrid();
			gridDebugger.trigger('toggle.tamia');
		};

		var toggleOutline = function() {
			addLayoutClasses();
			$('body').toggleClass('tamia__show-layout-outlines');
		};

		var toggleAllOutline = function() {
			$('body').toggleClass('tamia__show-all-outlines');
		};

		var toggleHelp = function() {
			var cls = 'tamia__show-help';
			var body = $('body');
			body.toggleClass(cls);
			if (body.hasClass(cls)) {
				body.append($('<div class="tamia__help">').html('<ul>' +
					'<li><kbd>G</kbd> Toggle grid</li>' +
					'<li><kbd>O</kbd> Toggle columns outlines</li>' +
					'<li><kbd>A</kbd> Toggle all elements outlines</li>' +
				'</ul>'));
			}
			else {
				$('.tamia__help').remove();
			}
		};

		var addLayoutClasses = function() {
			if (layoutClassesAdded) return;
			$('*').each(function() {
				var elem = $(this);
				var content = elem.css('content');
				if (/^tamia__/.test(content)) {
					elem.addClass(content);
				}
			});
			layoutClassesAdded = true;
		};

		var addGrid = function() {
			var firstRow = $('.tamia__grid-row:visible,.tamia__layout-row:visible').first();
			if (!firstRow.length) return;

			if (!gridDebugger) {
				var columns = 12;  // @todo Use real number of columns
				gridDebugger = $('<div>', {'class': 'tamia__grid-debugger is-hidden'});
				gridDebugger.html(new Array(columns + 1).join('<b class="tamia__grid-debugger-col"></b>'));
				firstRow.prepend(gridDebugger);
			}

			gridDebugger.css({
				'margin-top': -(firstRow.offset().top + parseInt(firstRow.css('padding-top') || 0, 10)),
				'height': $(document).height()
			});
		};

		_doc.on('keydown', function(event) {
			var activeTag = document.activeElement.tagName;
			if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

			var keycode = event.which;
			var func = {
				71: toggleGrid,  // G
				79: toggleOutline,  // O
				65: toggleAllOutline,  // A
				191: toggleHelp  // ?
			}[keycode];
			if (!func) return;

			func();
			event.preventDefault();
		});

	}

}(window, window.jQuery, window.Modernizr));
