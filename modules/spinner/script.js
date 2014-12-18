// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Spinner

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _wrapperClass = 'loader-wrapper';
	var _shadeSelector = '.loader-shade';

	tamia.Loader = tamia.extend(tamia.Component, {
		displayName: 'tamia.Loader',
		template: {
			block: 'loader-shade',
			content: {
				block: 'l-center',
				content: {
					block: 'l-center',
					inner: true,
					content: {
						block: 'spinner',
						mods: 'big'
					}
				}
			}
		},

		init: function() {
			tamia.delay(this.elem.addState, this.elem, 0, 'loading');
		},

		destroy: function() {
			tamia.delay(function() {
				this.elem.removeState('loading');
				this.elem.find(_shadeSelector).afterTransition(function() {
					this.elem.removeClass(_wrapperClass);
					this.loader.remove();
				}.bind(this));
			}, this, 0);
		},

		initHtml: function() {
			this.elem.addClass(_wrapperClass);
			this.loader = tamia.oporNode(this.template);
			this.elem.append(this.loader);
		}
	});


	// Events
	tamia.registerEvents({
		'loading-start': function(elem) {
			var container = $(elem);
			if (container.data('loader')) return;
			container.data('loader', new tamia.Loader(elem));
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
