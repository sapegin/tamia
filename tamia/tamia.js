// Tâmia © 2013 Artem Sapegin http://sapegin.me
// https://github.com/sapegin/tamia
// JS core
// jQuery is not required but very useful

/*global DEBUG:true*/

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

;(function(window, jQuery, undefined) {
	'use strict';

	// IE8+
	if (!document.querySelectorAll) return;

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
	function initComponents(components, parent) {
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
	}

	if (jQuery) {

		/**
		 * Init components inside any jQuery node.
		 *
		 * Examples:
		 *
		 *   $(window).trigger('init.tamia');
		 *   $('.js-container').trigger('init.tamia');
		 */
		jQuery(window).on('init.tamia', function(event) {
			initComponents(undefined, event.target);
		});

		/**
		 * Controls.
		 *
		 * Fires jQuery event to specified element on click at this element.
		 *
		 * @param data-fire Event name.
		 * @param data-to Target element selector.
		 * @param data-attrs Comma separated attributes list.
		 *
		 * Example:
		 *
		 *   <span data-fire="slider-next" data-to=".portfolio" data-attrs="1,2,3">Next</span>
		 *   <!-- $('.portfolio').trigger('slider-next', [1, 2, 3]); -->
		 */
		jQuery(document).click(function(e) {
			// @todo addEventListener
			var target = e.target;
			// @todo Cache target.parentNode
			if (target.parentNode && target.parentNode.getAttribute && target.parentNode.getAttribute('data-fire')) target = target.parentNode;
			if (target.getAttribute('data-fire') && target.getAttribute('data-to')) {
				target = jQuery(target);
				var attrs = (''+target.data('attrs')).split(/[;, ]/);
				jQuery(target.data('to')).trigger(target.data('fire'), attrs);
				e.preventDefault();
			}
		});

		/**
		 * Grid helper.
		 *
		 * Example:
		 *
		 *   <div data-component="grid"></div>
		 */
		if (DEBUG) initComponents({
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


	// Expose namespace
	window.tamia = {
		initComponents: initComponents
	};

}(window, window.jQuery));
