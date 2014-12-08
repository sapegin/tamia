// Tâmia © 2014 Artem Sapegin http://sapegin.me
// https://github.com/sapegin/tamia
// OPOR API

/*global DEBUG:false, tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _defaultTag = 'div';
	var _elemSeparator = '__';
	var _modSeparator = '_';
	var _statePrefix = 'is-';
	var _jsPrefix = 'js-';

	/**
	 * OPORJSON to DOM tree.
	 *
	 * Example:
	 *
	 *    var select = tamia.OporNode({
	 *      block: 'select',
	 *      mods: ['big', 'awesome'],
	 *      states: 'hidden',
	 *      content: {
	 *        block: 'select',
	 *        elem: 'box',
	 *        js: 'select-box',
	 *        bind: 'boxElem',
	 *        content: 'Choose semething'
	 *      }
	 *    });
	 *    this.elem.append(select);
	 *    $.extend(this, select.data('links'));  // {boxElem: $('.js-select-box')}
	 *
	 * @param {Object} json OPORJSON (`block` or `node` is required).
	 * @param {String} [json.tag=div] Tag name.
	 * @param {String} [json.block] Block name (.block).
	 * @param {String} [json.elem] Element name (.block__elem).
	 * @param {String|Array} [json.mods] Modifier(s) (.block_mod).
	 * @param {String|Array} [json.states] State(s) (.is-state).
	 * @param {String|Array} [json.js] JS class(es) (.js-hook).
	 * @param {String} [json.node] Key in `nodes` object.
	 * @param {String} [json.bind] Element link key (see example).
	 * @param {Object|String|Array} [json.content] Child node(s) or text content.
	 * @param {Object|HTMLElement} [nodes] Existing DOM nodes or node (to use in `node` parameter of OPORJSON).
	 * @return {jQuery}
	 */
	tamia.OporNode = function(json, nodes, links) {
		if (nodes === undefined) nodes = {};
		var isRoot = links === undefined;
		if (isRoot) links = {};

		var elem;
		if (json.node) {
			// Use existent node
			elem = (typeof json.node === 'string') ? nodes[json.node] : nodes;
			// jQuery object
			if (elem.jquery && elem.length) {
				elem = elem[0];
			}
			// Detach node
			if (elem.parentNode) {
				elem.parentNode.removeChild(elem);
			}
		}
		else {
			// Create new node
			elem = document.createElement(json.tag || _defaultTag);
		}

		// Classes
		var newClasses = tamia.OporClass(json);
		if (newClasses) {
			var classes = elem.className;
			elem.className = classes ? [classes, newClasses].join(' ') : newClasses;
		}

		// Store link
		if (json.bind) {
			links[json.bind] = $(elem);
		}

		// Append content
		if (json.content) {
			var children = _ensureArray(json.content);
			for (var childIdx = 0; childIdx < children.length; childIdx++) {
				var child = children[childIdx];
				var childNode;
				if (typeof child === 'string') {
					childNode = document.createTextNode(child);
				}
				else {
					childNode = tamia.OporNode(child, nodes, links);
				}
				elem.appendChild(childNode);
			}
		}

		if (isRoot) {
			elem = $(elem);
			elem.data('links', links);
			return elem;
		}
		return elem;
	};

	/**
	 * Generates class names for given OPORJSON element.
	 *
	 * Example:
	 *
	 *   tamia.OporClass({block: 'select', elem: 'box', js: 'box'});  // "select__box js-box"
	 *
	 * @param {Object} json OPORJSON
	 * @return {String}
	 */
	tamia.OporClass = function(json) {
		var cls = [];

		if (json.block) {
			var base = json.block + (json.inner ? '-i' : '') + (json.elem ? _elemSeparator + json.elem : '');
			cls.push(base);

			if (json.mods) {
				var mods = _ensureArray(json.mods);
				for (var modIdx = 0; modIdx < mods.length; modIdx++) {
					cls.push(base + _modSeparator + mods[modIdx]);
				}
			}
		}

		if (json.states) {
			var states = _ensureArray(json.states);
			for (var stateIdx = 0; stateIdx < states.length; stateIdx++) {
				cls.push(_statePrefix + states[stateIdx]);
			}
		}

		if (json.js) {
			var js = _ensureArray(json.js);
			for (var jsIdx = 0; jsIdx < js.length; jsIdx++) {
				cls.push(_jsPrefix + js[jsIdx]);
			}
		}

		return cls.join(' ');
	};

	function _ensureArray(array) {
		return $.isArray(array) ? array : [array];
	}

}(window, jQuery));