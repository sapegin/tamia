/*
 * Copyright 2012 Andrey “A.I.” Sitnik <andrey@sitnik.ru>,
 * sponsored by Evil Martians.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

;(function($) {
    "use strict";

    // Common methods and properties for jQuery Transition Events plugin.
    // Mostly for internal usage, but maybe helpful for some hack stuff:
    //
    //   if ( $.Transitions.isSupported() ) {
    //       // CSS Transitions is supported
    //   }
    $.Transitions = {

        // Hash of property name to event name with vendor prefixes.
        // It is used to detect prefix.
        _names: {
            // Webkit must be on bottom, because Opera try to use webkit
            // prefix.
            'transition':       'transitionend',
            'OTransition':      'oTransitionEnd',
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition':    'transitionend'
        },

        // Return array of milliseconds for CSS value of `transition-duration`.
        // It’s used in `$.fn.afterTransition`.
        _parseTimes: function (string) {
            var value, array = string.split(/,\s*/);
            for (var i = 0; i < array.length; i++) {
                value = array[i];
                array[i] = parseFloat(value);
                if ( value.match(/\ds/) ) {
                    array[i] = array[i] * 1000;
                }
            }
            return array;
        },

        // Autodetect vendor prefix and return `transitionend` event name.
        //
        // If browser didn’t support CSS Transitions it will return `false`.
        getEvent: function () {
            var finded = false;
            for ( var prop in this._names ) {
                if ( typeof(document.body.style[prop]) != 'undefined' ) {
                    finded = this._names[prop];
                    break;
                }
            }

            this.getEvent = function () {
                return finded;
            };

            return finded;
        },

        // Alias to vendor prefixed `requestAnimationFrame`. Will be replace
        // by native function after first call.
        animFrame: function (callback) {
            var raf = window.requestAnimationFrame       ||
                      window.webkitRequestAnimationFrame ||
                      window.mozRequestAnimationFrame    ||
                      window.msRequestAnimationFrame;
            if ( raf ) {
                this.animFrame = function (callback) {
                    return raf.call(window, callback);
                };
            } else {
                this.animFrame = function (callback) {
                    return setTimeout(callback, 10);
                };
            }
            return this.animFrame(callback);
        },

        // Return `true` if browser support CSS Transitions.
        isSupported: function () {
            return this.getEvent() !== false;
        }

    }

    // jQuery node methods.
    $.extend($.fn, {

        // Call `callback` after CSS Transition finish
        // `delay + (durationPart * duration)`. It will call `callback` only
        // once, in difference from `transitionEnd`.
        //
        //   $('.show-video').click(function () {
        //       $('.slider').addClass('video-position').afterTransition(
        //           function () { autoPlayVideo(); });
        //   });
        //
        // You can set `durationPart` to call `callback` in the middle of
        // transition:
        //
        //   $('.fliper').addClass('rotate').afterTransition(0.5, function () {
        //       $(this).find('.backface').show();
        //   });
        //
        // Callback will get object with `propertyName` and `elapsedTime`
        // properties. If transition is set to difference properties, it will
        // be called on every property.
        //
        // This method doesn’t check, that transition is really finished (it can
        // be canceled in the middle).
        afterTransition: function (durationPart, callback) {
            if ( typeof(callback) == 'undefined' ) {
                callback     = durationPart;
                durationPart = 1;
            }

            if ( !$.Transitions.isSupported() ) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], {
                        type:          'aftertransition',
                        elapsedTime:   0,
                        propertyName:  '',
                        currentTarget: this[i]
                    });
                }
                return this;
            }

            for (var i = 0; i < this.length; i++) {
                var el = $(this[i]);
                var props     = el.css('transition-property').split(/,\s*/);
                var durations = el.css('transition-duration');
                var delays    = el.css('transition-delay');

                durations = $.Transitions._parseTimes(durations);
                delays    = $.Transitions._parseTimes(delays);

                var prop, duration, delay, after, elapsed;
                for (var j = 0; j < props.length; j++) {
                    prop     = props[j];
                    duration = durations[ durations.length == 1 ? 0 : j ];
                    delay    = delays[ delays.length == 1 ? 0 : j ];
                    after    = delay + (duration * durationPart);
                    elapsed  = duration * durationPart / 1000;

                    (function (el, prop, after, elapsed) {
                      setTimeout(function () {
                          $.Transitions.animFrame(function () {
                            callback.call(el[0], {
                                type:          'aftertransition',
                                elapsedTime:   elapsed,
                                propertyName:  prop,
                                currentTarget: el[0]
                            });
                          });
                      }, after);
                    })(el, prop, after, elapsed);
                }
            }
            return this;
        },

        // Set `callback` to listen every CSS Transition finish.
        // It will call `callback` on every finished transition,
        // in difference from `afterTransition`.
        //
        // It just bind to `transitionend` event, but detect vendor prefix.
        //
        // Callback will get event object with `propertyName` and `elapsedTime`
        // properties. If transition is set to difference properties, it will
        // be called on every property.
        //
        // Note, that `callback` will get original event object, not from
        // jQuery.
        //
        //   var slider = $('.slider').transitionEnd(function () {
        //       if ( slider.hasClass('video-position') ) {
        //           autoPlayVideo();
        //       }
        //   });
        //
        //  $('.show-video').click(function () {
        //      slider.addClass('video-position');
        //  });
        //
        // If transition will be canceled before finish, event won’t be fired.
        transitionEnd: function (callback) {
            for (var i = 0; i < this.length; i++) {
              this[i].addEventListener($.Transitions.getEvent(), function (e) {
                  callback.call(this, e);
              });
            }
            return this;
        }

    });

}).call(this, jQuery);

// Tâmia © 2013 Artem Sapegin http://sapegin.me
// https://github.com/sapegin/tamia
// JS core
// jQuery and Modernizr aren’t required but very useful

/*jshint newcap:false*/
/*global DEBUG:true, Modernizr:false, console:false, ga:false*/

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
 *       }
 *     },
 *     ...
 *   }
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

	// Shortcuts
	var slice = Array.prototype.slice;
	var hasOwnProperty = Object.prototype.hasOwnProperty;


	if (DEBUG) {
		// Debug logger
		var addBadge = function(args, name) {
			// Color console badge
			// Based on https://github.com/jbail/lumberjack
			var ua = navigator.userAgent.toLowerCase();
			if (ua.indexOf('chrome') !== -1 || ua.indexOf('firefox') !== -1) {
				var format = '%c %s %c ' + args.shift();
				args.unshift(format, 'background:#aa759f; color:#fff', name, 'background:inherit; color:inherit');
			}
			else {
				args[0] = name + ': ' + args[0];
			}
			return args;
		};
		var logger = function() {
			var args = slice.call(arguments);
			var func = args.shift();
			console[func].apply(console, addBadge(args, 'Tâmia'));
		};
		var log = tamia.log = logger.bind(null, 'log');
		var warn = tamia.warn = logger.bind(null, 'warn');

		// Check optional dependencies
		if (!jQuery) warn('jQuery not found.');
		if (!jQuery.Transitions) warn('jQuery Transition Events plugin (tamia/vendor/transition-events.js) not found.');
		if (!Modernizr) warn('Modernizr not found.');

		// Check required Modernizr features
		$.each([
			'csstransitions',
			'cssgradients',
			'flexbox',
			'touch',
		], function(idx, feature) {
			if (!(feature in Modernizr)) warn('Modernizr should be built with "' + feature + '" feautre.');
		});
	}


	// Custom exception
	tamia.Error = function(message) {
		if (DEBUG) warn.apply(null, arguments);
		this.name = 'TamiaError';
		this.message = message;
	};
	tamia.Error.prototype = new Error();


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
	 *     pony: Pony,  // var Pony = tamia.extend(tamia.Component, {...})
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


	/**
	 * JavaScript inheritance.
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
	 * @param {Mixed} [param1, param2...] Any params to pass to function.
	 * @return {TimeoutId} Timeout handler.
	 */
	tamia.delay = function(func, context, wait) {
		var args = slice.call(arguments, 3);
		return setTimeout(function() { return func.apply(context || null, args); }, wait || 0);
	};


	if (jQuery) {

		var _doc = jQuery(document);
		var _hiddenState = 'hidden';
		var _transitionSate = 'transit';
		var _statePrefix = 'is-';
		var _statesData = 'tamia-states';
		var _appearedEvent = 'appeared.tamia';
		var _disappearedEvent = 'disappeared.tamia';
		var _fallbackTimeout = 1000;

		/**
		 * Registers Tâmia events (eventname.tamia) on document.
		 *
		 * Example:
		 *
		 *   // Registers enable.tamia event.
		 *   tamia.registerEvents({
		 *      enable: function(elem) {
		 *      }
		 *   });
		 *
		 * @param {Object} handlers Handlers list.
		 */
		tamia.registerEvents = function(handlers) {
			var events = $.map(handlers, _tamiaze).join(' ');
			_doc.on(events, function(event) {
				var eventName = [event.type, event.namespace].join('.').replace(/.tamia$/, '');
				if (DEBUG) log('Event "%s":', eventName, event.target);
				handlers[eventName](event.target);
			});
		};

		var _tamiaze = function (handler, name) {
			return name + '.tamia';
		};


		/**
		 * Events
		 */
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
				if (elem.hasState(_transitionSate) && !elem.hasState(_hiddenState)) return;
				elem.addState(_transitionSate);
				setTimeout(function() {
					elem.removeState(_hiddenState);
					elem.afterTransition(function() {
						elem.removeState(_transitionSate);
						elem.trigger(_appearedEvent);
					});
				}, 0);
			}
			else {
				elem.removeState(_hiddenState);
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
				if (elem.hasState(_transitionSate) && elem.hasState(_hiddenState)) return;
				elem.addState(_transitionSate);
				elem.addState(_hiddenState);
				elem.afterTransition(function() {
					elem.removeState(_transitionSate);
					elem.trigger(_disappearedEvent);
				});
			}
			else {
				elem.addState(_hiddenState);
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
			if (elem.hasState(_hiddenState)) {
				_handlers.appear(elem);
			}
			else {
				_handlers.disappear(elem);
			}
		};

		tamia.registerEvents(_handlers);


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
		 _doc.on('click', '[data-fire]', function(event) {
			var elem = jQuery(event.currentTarget);

			var data = elem.data();
			if (DEBUG) if (!data.target && !data.closest) return log('You should define either data-target or data-closest on', elem[0]);

			var target = data.target && jQuery(data.target) || elem.closest(data.closest);
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
			return this.each(function() {
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
			return tmpl.replace(/\{([^\}]+)\}/g, function(m, key) {
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
				return jQuery(this).html(html);
			};
		}


		/**
		 * Google Analytics tracking.
		 *
		 * @param data-ga Event name ('link' if empty).
		 * @param [data-action] Event action ('click' by default).
		 *
		 * Examples:
		 *
		 *   <a href="http://github.com/" data-ga>GitHub</span>
		 *   <span class="js-slider-next" data-ga="slider" data-action="next">Next</span>
		 */
		if ('ga' in window) _doc.on('click', '[data-ga]', function(event) {
			var elem = jQuery(event.currentTarget);
			var eventName = elem.data('ga') || 'link';
			var eventAction = elem.data('ga-action') || 'click';
			var url = elem.attr('href');
			var link = url && !event.metaKey && !event.ctrlKey;
			if (link) event.preventDefault();
			ga('send', 'event', eventName, eventAction, url, {hitCallback: function() {
				if (link) document.location = url;
			}});
		});


		/**
		 * Grid debugger.
		 *
		 * Hotkeys:
		 *
		 *   g - Toggle grid.
		 *   o - Toggle layout outlines.
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
				jQuery('body').toggleClass('tamia__show-layout-outlines');
			};

			var addLayoutClasses = function() {
				if (layoutClassesAdded) return;
				jQuery('*').each(function() {
					var elem = $(this);
					var content = elem.css('content');
					if (/^tamia__/.test(content)) {
						elem.addClass(content);
					}
				});
				layoutClassesAdded = true;
			};

			var addGrid = function() {
				var firstRow = jQuery('.tamia__grid-row,.tamia__layout-row').first();
				if (!firstRow.length) return;

				if (!gridDebugger) {
					var columns = 12;  // @todo Use real number of columns
					gridDebugger = $('<div>', {'class': 'tamia__grid-debugger is-hidden'});
					gridDebugger.html(new Array((columns) + 1).join('<b class="tamia__grid-debugger-col"></b>'));
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
					79: toggleOutline  // O
				}[keycode];
				if (!func) return;

				func();
				event.preventDefault();
			});

		}

	}

}(window, window.jQuery, window.Modernizr));

// Tâmia © 2014 Artem Sapegin http://sapegin.me
// https://github.com/sapegin/tamia
// JS component base class

/*global DEBUG:false, tamia:false*/
;(function(window, jQuery, undefined) {
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

		/**
		 * List of methods that should be binded to `this` (see `bindAll` method).
		 *
		 * @type {String|Array}
		 */
		binded: null,

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
		 * Binds all specified methods to this. Binded method names have `_` at the end.
		 *
		 * Example:
		 *
		 *   this.bindAll('toggle');
		 *   this.elem.on('click', this.toggle_);
		 *
		 * @param {String} method1, [method2...] Method names
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
		 * @param {Boolean}
		 */
		isVisible: function() {
			return !!(this.elemNode.offsetWidth || this.elemNode.offsetHeight);
		}
	};

	tamia.Component = Component;

}(window, jQuery));

// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Flippable pane

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var Flippable = tamia.extend(tamia.Component, {
		binded: 'toggle',

		init: function() {
			if (this.elem.hasClass('js-flip')) {
				this.elem.on('click', this.toggle_);
			}
			else {
				this.elem.on('click', '.js-flip', this.toggle_);
			}
		},

		toggle: function() {
			this.elem.toggleState('flipped');
			this.elem.trigger('flipped.tamia', this.elem.hasState('flipped'));
		}
	});

	tamia.initComponents({flippable: Flippable});

}(window, jQuery));

// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Basic form controls

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _formElementsSelector = '.field,.button,.disablable';
	var _disabledState = 'disabled';

	var _toggle = function(elem, enable) {
		var formElements = $(elem).find(_formElementsSelector).addBack(_formElementsSelector);
		formElements.toggleState(_disabledState, !enable);
		formElements.attr('disabled', !enable);
	};

	// Events
	tamia.registerEvents({
		/**
		 * Enables all descendant form elements.
		 */
		enable: function(elem) {
			_toggle(elem, true);
		},

		/**
		 * Disables all descendant form elements.
		 */
		disable: function(elem) {
			_toggle(elem, false);
		}
	});

}(window, jQuery));

// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Modal

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _body = $('body');
	var _doc = $(document);

	var _bodyClass = 'modal-opened';
	var _switchingState = 'switching';
	var _hiddenState = 'hidden';
	var _wrapperTmpl = '' +
	'<div class="modal-shade is-hidden">' +
		'<div class="l-center">' +
			'<div class="l-center-i js-modal"></div>' +
		'</div>' +
	'</div>';
	var _opened = null;

	var Modal = tamia.extend(tamia.Component, {
		binded: 'commit dismiss keyup shadeClick',

		init: function() {
			this.elem.data('modal', this);
			this.elem.on('click', '.js-modal-commit', this.commit_);
			this.elem.on('click', '.js-modal-dismiss', this.dismiss_);
			if (this.elem.data('modal-open')) {
				this.open();
			}
		},

		initHtml: function() {
			if (this.wrapper) return;

			this.wrapper = $(_wrapperTmpl);
			this.wrapper.find('.js-modal').append(this.elem);
			this.wrapper.on('click', this.shadeClick_);
			_body.append(this.wrapper);
			this.elem.removeState('hidden');
		},

		open: function() {
			if (this === _opened) return;

			var opened = _opened;
			this.initHtml();
			_body.addClass(_bodyClass);
			if (opened) {
				opened.close({hide: true});
				this.wrapper.addState(_switchingState);
				this.wrapper.on('appeared.tamia', function() {
					this.wrapper.removeState(_switchingState);
					opened.wrapper.addState(_hiddenState);
					opened.elem.removeState(_hiddenState);
				}.bind(this));
			}
			this.wrapper.trigger('appear.tamia');
			_doc.on('keyup', this.keyup_);
			_opened = this;
		},

		close: function(params) {
			if (params === undefined) params = {hide: false};

			var elem = params.hide ? this.elem : this.wrapper;
			elem.trigger('disappear.tamia');
			if (!params.hide) _body.removeClass(_bodyClass);
			_doc.off('keyup', this.keyup_);
			_opened = null;
		},

		commit: function(event) {
			this.done(event, 'commit');
		},

		dismiss: function(event) {
			this.done(event, 'dismiss');
		},

		done: function(event, type) {
			if (event) event.preventDefault();

			var typeEvent = $.Event(type + '.modal.tamia');
			this.elem.trigger(typeEvent);
			if (typeEvent.isDefaultPrevented()) return;

			this.close();
		},

		keyup: function(event) {
			if (event.which === 27) {  // Escape
				this.dismiss(event);
			}
		},

		shadeClick: function(event) {
			if ($(event.target).hasClass('js-modal')) {
				this.dismiss(event);
			}
		}
	});

	// Events
	tamia.registerEvents({
		'open.modal': function(elem) {
			var container = $(elem);
			var modal = container.data('modal');
			if (!modal) modal = new Modal(elem);
			modal.open();
		}
	});

}(window, jQuery));

// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Password field with toggle to show characters

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var supported;
	var types = {
		locked: 'password',
		unlocked: 'text'
	};

	var Password = tamia.extend(tamia.Component, {
		binded: 'toggle focus',

		init: function() {
			this.bindAll('toggle', 'focus');

			this.fieldElem = this.elem.find('.js-field');
			this.toggleElem = this.elem.find('.js-toggle');

			// Mousedown instead of click to catch focused field
			this.elem.on('mousedown', '.js-toggle', this.toggle_);
		},

		isSupported: function() {
			if (supported !== undefined) return supported;

			// IE8+
			supported = $('<!--[if lte IE 8]><i></i><![endif]-->').find('i').length !== 1;
			return supported;
		},

		toggle: function() {
			var focused = document.activeElement === this.fieldElem[0];
			var locked = this.elem.hasState('unlocked');
			var fieldType = this.fieldElem.attr('type');

			this.elem.toggleState('unlocked');

			if (fieldType === types.locked && !locked) {
				this.fieldElem.attr('type', types.unlocked);
			}
			else if (fieldType === types.unlocked && locked) {
				this.fieldElem.attr('type', types.locked);
			}

			if (focused) {
				setTimeout(this.focus_, 0);
			}
		},

		focus: function() {
			this.fieldElem.focus();
		}
	});

	tamia.initComponents({password: Password});

}(window, jQuery));

// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Image preload

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var preload = function (images, callback) {
		var done = function() {
			counter--;
			if (counter === 0) {
				callback(errors.length ? errors : null);
			}
		};
		var error = function() {
			errors.push(this.src);
			done();
		};

		images = parse(images);
		var counter = images.length;
		var errors = [];
		for (var imageIdx = 0; imageIdx < images.length; imageIdx++) {
			var img = new Image();
			img.onload = done;
			img.onerror = error;
			img.src = images[imageIdx];
		}
	};

	var parse = function(images) {
		if (!$.isArray(images)) images = [images];
		// TODO: img.attr('src')
		return images;
	};

	tamia.preload = preload;

}(window, jQuery));

// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Select with custom design

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _selectClass = '.js-select';
	var _boxClass = '.js-box';

	var Select = tamia.extend(tamia.Component, {
		binded: 'focus blur change',

		init: function() {
			this.selectElem = this.elem.find(_selectClass);
			this.boxElem = this.elem.find(_boxClass);

			this.elem.on({
				focus: this.focus_,
				blur: this.blur_,
				change: this.change_
			}, _selectClass);

			this.change();
		},

		focus: function() {
			this.toggleFocused(true);
		},

		blur: function() {
			this.toggleFocused(false);
		},

		toggleFocused: function(toggle) {
			this.elem.toggleState('focused', toggle);
		},

		change: function() {
			this.boxElem.text(this.selectElem.find(':selected').text());
		}
	});

	tamia.initComponents({select: Select});

}(window, jQuery));

// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Spinner

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _wrapperClass = 'loader-wrapper';
	var _shadeSelector = '.loader-shade';
	var _loaderTmpl = '' +
	'<div class="loader-shade">' +
		'<div class="l-center">' +
			'<div class="l-center-i">' +
				'<div class="spinner spinner_big"></div>' +
			'</div>' +
		'</div>' +
	'</div>';

	var Loader = tamia.extend(tamia.Component, {
		init: function() {
			this.initHtml();
			tamia.delay(this.elem.addState, this.elem, 0, 'loading');
		},

		destroy: function() {
			this.elem.removeState('loading');
			this.elem.find(_shadeSelector).afterTransition(function() {
				this.elem.removeClass(_wrapperClass);
				this.loader.remove();
			}.bind(this));
		},

		initHtml: function() {
			this.elem.addClass(_wrapperClass);
			this.loader = $(_loaderTmpl);
			this.elem.append(this.loader);
		}
	});

	// Events
	tamia.registerEvents({
		'loading-start': function(elem) {
			var container = $(elem);
			if (container.data('loader')) return;
			container.data('loader', new Loader(elem));
		},

		'loading-stop': function(elem) {
			var container = $(elem);
			var loader = container.data('loader');
			if (!loader) return;
			loader.destroy();
			container.removeData('loader');
		},
	});

}(window, jQuery));

// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Toggle

// @todo Global events
// @todo Proper slide transition
// @todo Real list of available actions

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _body = $('body');
	var _doc = $(document);

	var togglers = {
		hidden: {
			set: function(elem) {
				elem.trigger('disappear.tamia');
			},
			clear: function(elem) {
				elem.trigger('appear.tamia');
			}
		},
		disabled: {
			set: function(elem) {
				elem.addState('disabled');
				elem.prop('disabled', true);
			},
			clear: function(elem) {
				elem.removeState('disabled');
				elem.prop('disabled', false);
			}
		},
		_default: {
			set: function(elem, name) {
				elem.addState(name);
			},
			clear: function(elem, name) {
				elem.removeState(name);
			}
		}
	};

	var hiddenEvents = 'appeared.tamia disappeared.tamia';


	function Toggle(wrapper) {
		this.wrapper = wrapper;
		this.elems = this.findElems();
	}

	Toggle.prototype = {
		findElems: function() {
			var elems = [];
			var tags = this.wrapper.find('[data-states]');
			tags.each(function(index, elem) {
				elem = $(elem);
				elem.addClass('toggle-element');

				elems.push({
					elem: elem,
					states: this.parseState(elem.data('states'))
				});

				// Detect crossfade
				var prev = elems[index-1];
				if (prev) {
					var parent = elem.parent();
					// Have the common parent and no other siblings
					if (parent.children().length === 2 && parent[0] === prev.elem.parent()[0]) {
						prev.crossfade = true;
					}
				}
			}.bind(this));
			return elems;
		},

		parseState: function(data) {
			var states = data.replace(/\s+/g, '').split(';');
			var statesData = {};
			for (var stateIdx = 0; stateIdx < states.length; stateIdx++) {
				var stateData = states[stateIdx].split(':');
				var name = stateData[0];
				var elemStates = stateData[1].split(',');
				statesData[name] = {};
				for (var elemStateIdx = 0; elemStateIdx < elemStates.length; elemStateIdx++) {
					var state = elemStates[elemStateIdx];
					var set = true;
					if (state[0] === '-') {  // Negative state: visible:-hidden
						set = false;
						state = state.slice(1);
					}
					statesData[name][state] = set;
				}
			}
			return statesData;
		},

		toggle: function(link) {
			var actions = link.data('toggle');
			actions = this.parseToggle(actions);
			for (var action in actions) {
				var func = action + 'States';
				if (!this[func]) throw new tamia.Error('Toggle: wrong action ' + action + '.', 'Available actions: toggle, set, clear.');
				this[func](actions[action]);
			}
		},

		parseToggle: function(data) {
			var actions = data.replace(/\s+/g, '').split(';');
			var toggleData = {};
			for (var actionIdx = 0; actionIdx < actions.length; actionIdx++) {
				var action = actions[actionIdx].split(':');
				var name = action[0];
				var elemStates = action[1].split(',');
				toggleData[name] = elemStates;
			}
			return toggleData;
		},

		hasStateClass: function(state) {
			return this.wrapper.hasClass('state-' + state);
		},

		toggleStateClass: function(state, set) {
			return this.wrapper.toggleClass('state-' + state, set);
		},

		toggleStates: function(states) {
			for (var stateIdx = 0; stateIdx < states.length; stateIdx++) {
				this.toggleState(states[stateIdx]);
			}
		},

		toggleState: function(state) {
			var cleanCrossfade = function(elem, next, parent) {
				elem.elem.off(hiddenEvents);
				setTimeout(function() {
					parent.height('');
					position = {left: '', top: '', width: ''};
					elem.elem.css(position);
					next.elem.css(position);
					parent.removeClass('toggle-crossfade-wrapper');
				}, 100);
			};

			var set = !this.hasStateClass(state);
			this.toggleStateClass(state, set);

			for (var elemIdx = 0; elemIdx < this.elems.length; elemIdx++) {
				var elem = this.elems[elemIdx];
				var elemStates = elem.states[state];
				if (!elemStates) continue;

				for (var elemState in elemStates) {
					var toggler = this.getToggler(elemState);
					var action = set === elemStates[elemState] ? 'set' : 'clear';

					// Crossfade
					if (elemState === 'hidden' && elem.crossfade) {
						var next = this.elems[elemIdx+1];
						if (next && next.states[state][elemState] !== elemStates[elemState]) {
							var visibleElem, hiddenElem;
							if (elem.elem[0].offsetHeight) {
								visibleElem = elem.elem;
								hiddenElem = next.elem;
							}
							else {
								visibleElem = next.elem;
								hiddenElem = elem.elem;
							}

							var position = visibleElem.position();

							// Find width
							var hiddenClone = hiddenElem.clone();
							hiddenClone.css({position: 'absolute', display: 'block', top: -9999, left: -999});
							_body.append(hiddenClone);
							position.width = Math.max(visibleElem.width(), hiddenClone.width());
							hiddenClone.remove();

							var parent = elem.elem.parent();
							parent.height(parent.height());
							elem.elem.css(position);
							next.elem.css(position);
							parent.addClass('toggle-crossfade-wrapper');
							elem.elem.one(hiddenEvents, cleanCrossfade.bind(this, elem, next, parent));
						}
					}

					toggler[action](elem.elem, elemState);
				}
			}
		},

		getToggler: function(state) {
			return togglers[state] || togglers._default;
		}
	};


	_doc.on('click', '[data-toggle]', function(event) {
		var elem = $(event.currentTarget);
		var wrapper = elem.closest('.js-toggle-wrapper');
		if (!wrapper.length) throw new tamia.Error('Toggle: .js-toggle-wrapper not found.', elem);

		var toggle = wrapper.data('tamia-toggle');
		if (!toggle) {
			toggle = new Toggle(wrapper);
			wrapper.data('tamia-toggle', toggle);
		}

		toggle.toggle(elem);

		event.preventDefault();
	});

}(window, jQuery));

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
