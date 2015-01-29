// Tâmia © 2015 Artem Sapegin http://sapegin.me
// https://github.com/tamiadev/tamia
// Simplest template

define(function() {
'use strict';

/**
 * Simplest template.
 *
 * Just replaces {something} with data.something.
 *
 * @param {String} tmpl Template.
 * @param {String} data Template context.
 * @return {String} HTML.
 */
function stmpl(tmpl, data) {
	return tmpl.replace(/\{([^\}]+)\}/g, function stmplReplace(m, key) {
		return data[key] || '';
	});
}

return stmpl;

});
