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
	 *    var select = tamia.oporNode({
	 *      block: 'select',
	 *      mods: ['big', 'awesome'],
	 *      states: 'hidden',
	 *      content: {
	 *        block: 'select',
	 *        elem: 'box',
	 *        js: 'select-box',
	 *        link: 'boxElem',
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
	 * @param {OPORJSON|Array} [json.mix] Blocks to mix ({block: 'scrollable'}).
	 * @param {Object} [json.attrs] HTML attributes ({href: '/about'}).
	 * @param {String|HTMLElement|jQuery} [json.node] Key in `nodes` object, DOM/jQuery node or selector.
	 * @param {String} [json.link] Element link key (see example).
	 * @param {Object|String|Array} [json.content] Child node(s) or text content.
	 * @param {Object|HTMLElement|jQuery} [nodes] Existing DOM nodes or node (to use in `node` parameter of OPORJSON).
	 * @return {jQuery}
	 */
	tamia.oporNode = function(json, nodes, links) {
		if (nodes === undefined) nodes = {};
		var isRoot = links === undefined;
		if (isRoot) links = {};

		var elem;
		if (json.node) {
			// Use existent node
			if (typeof json.node === 'string') {
				if (nodes[json.node]) {
					elem = nodes[json.node];
				}
				else {
					if (DEBUG && (!nodes || !nodes.root)) throw new tamia.Error('tamia.oporNode: `nodes.root` is required to use selectors in `node` parameter.');
					elem = nodes.root[0].querySelector(json.node);
				}
			}
			else {
				elem = nodes;
			}
			// jQuery object
			if (elem && elem.jquery && elem.length) {
				elem = elem[0];
			}
			if (DEBUG && (!elem || elem.nodeType !== 1)) throw new tamia.Error('tamia.oporNode: node `' + json.node + '` not found.', json);
			// Detach node
			if (!isRoot && elem.parentNode) {
				elem.parentNode.removeChild(elem);
			}
		}
		else {
			// Create new node
			elem = document.createElement(json.tag || _defaultTag);
		}

		// Classes
		var newClasses = tamia.oporClass(json);
		if (newClasses) {
			var classes = elem.className;
			if (classes) {
				newClasses = _uniqueArray((classes + ' ' + newClasses).split(' ')).join(' ');
			}
			elem.className = newClasses;
		}

		// Attributes
		if (json.attrs) {
			for (var name in json.attrs) {
				elem.setAttribute(name, json.attrs[name]);
			}
		}

		// Store link
		if (json.link) {
			links[json.link] = $(elem);
		}

		// Append content
		if (json.content) {
			var child;
			if ($.isArray(json.content)) {
				child = document.createDocumentFragment();
				var children = _ensureArray(json.content);
				for (var childIdx = 0; childIdx < children.length; childIdx++) {
					child.appendChild(_createChildNode(children[childIdx], nodes, links));
				}
			}
			else {
				child = _createChildNode(json.content, nodes, links);
			}
			elem.appendChild(child);
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
	 *   tamia.oporClass({block: 'select', elem: 'box', js: 'box'});  // "select__box js-box"
	 *
	 * @param {Object} json OPORJSON
	 * @return {String}
	 */
	tamia.oporClass = function(json) {
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

		if (json.mix) {
			var mixes = _ensureArray(json.mix);
			for (var mixIdx = 0; mixIdx < mixes.length; mixIdx++) {
				cls.push(tamia.oporClass(mixes[mixIdx]));
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

	function _uniqueArray(array) {
		return $.grep(array, function(value, key) {
			return $.inArray(value, array) === key;
		});
	}

	function _createChildNode(child, nodes, links) {
		if (typeof child === 'string') {
			return document.createTextNode(child);
		}
		else {
			return tamia.oporNode(child, nodes, links);
		}
	}

}(window, jQuery));
