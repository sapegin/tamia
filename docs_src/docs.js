/* Tâmia © 2014 Artem Sapegin http://sapegin.me */

;(function($) {
	'use strict';

	tamia.initComponents({
		toc: function(elem) {
			var elem = $(elem);
			var page = elem.data('page');
			var selectors = {
				modules: 'h2',
				_default: 'h2,h3'
			};
			elem.toc({
				selectors: selectors[page] || selectors._default,
				container: '.js-content',
				itemClass: function(i, heading, $heading, prefix) {
					return prefix + '__item ' + prefix + '__item_' + $heading[0].tagName.toLowerCase();
				},
				activeClass: function(prefix) {
					return 'is-active';
				}
			});
			elem.stick_in_parent({
				parent: '.js-content-container'
			});
		}
	});

}(jQuery));
