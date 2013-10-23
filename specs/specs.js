// Tâmia © 2013 Artem Sapegin http://sapegin.me
// https://github.com/sapegin/tamia
// JS core
// jQuery is not required but very useful

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
if (typeof DEBUG === 'undefined') DEBUG = true;

;(function(window, jQuery, Modernizr, undefined) {
	'use strict';

	if (DEBUG) {
		// Debug logger
		var logger = function() {
			var args = Array.prototype.slice.call(arguments);
			var func = args.shift();
			args[0] = 'Tâmia: ' + args[0];
			console[func].apply(console, args);
		};
		var log = logger.bind(null, 'log');
		var warn = logger.bind(null, 'warn');

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


	// IE8+
	if (!document.querySelectorAll) return;

	// Namespace
	var tamia = window.tamia = {};

	var _containersCache;
	var _components = {};

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
	 *       pluginmethod2: null
	 *     }
	 *   }
	 *
	 * Caveats:
	 *
	 *   1. Components inside hidden containers (width === height === 0) willn’t be initialized.
	 *   2. To initialize components inside container that was hidden or inside dynamically created container use
	 *   init.tamia event: `$('.js-container').trigger('init.tamia');`
	 *   3. No components will be initialized twice. It’s safe to trigger init.tamia event multiple times: only new nodes
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
			var component = components[container.getAttribute('data-component')];
			if (!component || (!container.offsetWidth && !container.offsetHeight) || container.hasAttribute('_tamia-yep')) continue;

			if (typeof component === 'function') {
				component(container);
			}
			else if (jQuery) {
				// Shortcut for jQuery plugins initialization
				for (var method in component) {
					// @todo apply?
					jQuery(container)[method](component[method]);
				}
			}

			container.setAttribute('_tamia-yep', 'yes');
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
				if (elem.hasClass(_transitionClass)) return;
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
				if (elem.hasClass(_transitionClass)) return;
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
  tamia.initComponents({
    flippable: function(container) {
      var toggle;
      toggle = function() {
        return ($(this)).toggleClass('is-flipped');
      };
      container = $(container);
      (container.find('.js-flip')).click(toggle);
      if (container.is('.js-flip')) {
        return container.click(toggle);
      }
    }
  });

}).call(this);

(function() {
  'use strict';
  var supported;

  supported = void 0;

  jQuery.prototype.tamiaPassword = function() {
    if (supported === void 0) {
      supported = (((jQuery('<b>')).html('<!--[if lte IE 8]><i></i><![endif]-->')).find('i')).length !== 1;
    }
    if (!supported) {
      return this;
    }
    return this.each(function() {
      var container, field, locked, lockedType, toggle, unlockedClass, unlockedType;
      container = jQuery(this);
      unlockedClass = 'is-unlocked';
      lockedType = 'password';
      unlockedType = 'text';
      toggle = container.find('.password__toggle');
      field = container.find('.password__field');
      locked = !container.hasClass(unlockedClass);
      container.addClass('is-ok');
      return toggle.mousedown(function() {
        var fieldType, focused;
        focused = document.activeElement === field[0];
        locked = !locked;
        fieldType = field.attr('type');
        container.toggleClass(unlockedClass, !locked);
        if (fieldType === lockedType && !locked) {
          field.attr('type', unlockedType);
        } else if (fieldType === unlockedType && locked) {
          field.attr('type', lockedType);
        }
        if (focused) {
          return setTimeout((function() {
            return field.focus();
          }), 0);
        }
      });
    });
  };

  tamia.initComponents({
    password: {
      tamiaPassword: void 0
    }
  });

}).call(this);

// Tâmia © 2013 Artem Sapegin http://sapegin.me
// Select with custom design

/*global tamia:true*/
;(function($) {
	'use strict';

	$.fn.formSelect = function() {
		return this.each(function() {
			var container = $(this),
				select = container.find('select'),
				box = container.find('.select__box');

				if (!box.length) {
					box = $('<div class="select__box">');
					container.append(box);
				}

				select.focus(function() {
					container.addClass('is-focused');
				});
				select.blur(function() {
					container.removeClass('is-focused');
				});
				select.change(function() {
					box.text(select.find(':selected').text());
				});

				select.triggerHandler('change');
		});
	};

	// Init component
	tamia.initComponents({ select: function(elem) {
		$(elem).formSelect();
	}});

})(jQuery);
