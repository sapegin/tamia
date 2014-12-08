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

	tamia.Loader = tamia.extend(tamia.Component, {
		displayName: 'tamia.Loader',

		init: function() {
			this.initHtml();
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
			this.loader = $(_loaderTmpl);
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
