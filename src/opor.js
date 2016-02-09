import { ensureArray, isElement, TamiaError } from './util';
import isEmpty from 'lodash/isEmpty';
import camelCase from 'lodash/camelCase';

const DEFAULT_TAG = 'div';
const ELEM_SEPARATOR = '__';
const MOD_SEPARATOR = '_';
const STATE_PREFIX = 'is-';
const JS_PREFIX = 'js-';

/**
 * OPORJSON to DOM tree.
 *
 * Example:
 *
 *    let [select, links] = oporElement({
 *      block: 'select',
 *      mods: ['big', 'awesome'],
 *      states: 'hidden',
 *      content: {
 *        block: 'select',
 *        elem: 'box-foo',
 *        js: 'select-box',
 *        link: true,
 *        content: 'Choose something'
 *      }
 *    });
 *    this.elem.appendChild(select);
 *    Object.assign(this, links);  // {boxFooElem: $$('.js-select-box')}
 *
 * @param {Object} json OPORJSON (`block` or `element` is required).
 * @param {string} [json.tag=div] Tag name.
 * @param {string} [json.block] Block name (.block).
 * @param {string} [json.elem] Element name (.block__elem).
 * @param {string|Array} [json.mods] Modifier(s) (.block_mod).
 * @param {string|Array} [json.states] State(s) (.is-state).
 * @param {string|Array} [json.js] JS class(es) (.js-hook).
 * @param {OPORJSON|string|Array} [json.mix] Blocks to mix ({block: 'scrollable'}).
 * @param {Object} [json.attrs] HTML attributes ({href: '/about'}).
 * @param {HTMLElement} [json.element] Existing DOM element.
 * @param {boolean} [json.link] Store link to an element (link name: `${json.elem}Elem`, see example).
 * @param {Object|string|Array} [json.content] Child element(s) or text content.
 * @param {Object} [links] (Internal.)
 * @param {boolean} [isChildren] (Internal.)
 * @return {HTMLElement|Array} Single generated DOM element or an array [elem, links].
 */
export function oporElement(json, links = {}, isChildren = false) {
	let elem;
	if (json.element) {
		// Use existing DOM element
		if (DEBUG && !isElement(json.element)) {
			let type = typeof json.element;
			let name = json.block + (json.elem ? `__${json.elem}` : '');
			throw new TamiaError(`Invalid type of "json.element" for "${name}". ` +
				`Expected: "HTMLElement", actual: "${type}".`);
		}
		elem = json.element;

		// Detach element
		if (isChildren && elem.parentNode) {
			elem.parentNode.removeChild(elem);
		}
	}
	else {
		// Create new element
		elem = document.createElement(json.tag || DEFAULT_TAG);
	}

	// Classes
	let newClasses = oporClass(json, true);
	if (newClasses) {
		elem.classList.add(...newClasses);
	}

	// Attributes
	if (json.attrs) {
		for (let name in json.attrs) {
			elem.setAttribute(name, json.attrs[name]);
		}
	}

	// Store link
	if (json.link) {
		if (DEBUG && !json.elem) {
			throw new TamiaError('"json.elem" is required to use "json.link".');
		}
		links[camelCase(json.elem) + 'Elem'] = elem;
	}

	// Append content
	if (json.content) {
		let container;
		if (Array.isArray(json.content)) {
			container = document.createDocumentFragment();
			for (let childIdx = 0; childIdx < json.content.length; childIdx++) {
				container.appendChild(createChildelement(json.content[childIdx], links));
			}
		}
		else {
			container = createChildelement(json.content, links);
		}
		elem.appendChild(container);
	}

	if (!isChildren && !isEmpty(links)) {
		return [
			elem,
			links,
		];
	}
	return elem;
}

/**
 * Generates class names for given OPORJSON element.
 *
 * Example:
 *
 *   oporClass({block: 'select', elem: 'box', js: 'box'});  // "select__box js-box"
 *
 * @param {Object} json OPORJSON
 * @param {boolean} returnArray Return array, concatenated string otherwise.
 * @return {string|Array}
 */
export function oporClass(json, returnArray = false) {
	let classes = [];

	if (json.block) {
		let base = json.block + (json.elem ? ELEM_SEPARATOR + json.elem : '');

		classes.push(base);

		if (json.mods) {
			let mods = ensureArray(json.mods);
			for (let modIdx = 0; modIdx < mods.length; modIdx++) {
				classes.push(base + MOD_SEPARATOR + mods[modIdx]);
			}
		}
	}

	if (json.mix) {
		let mixes = ensureArray(json.mix);
		for (let mixIdx = 0; mixIdx < mixes.length; mixIdx++) {
			let mix = mixes[mixIdx];
			classes.push(typeof mix === 'string' ? mix : oporClass(mix));
		}
	}

	if (json.states) {
		let states = ensureArray(json.states);
		for (let stateIdx = 0; stateIdx < states.length; stateIdx++) {
			classes.push(STATE_PREFIX + states[stateIdx]);
		}
	}

	if (json.js) {
		let js = ensureArray(json.js);
		for (let jsIdx = 0; jsIdx < js.length; jsIdx++) {
			classes.push(JS_PREFIX + js[jsIdx]);
		}
	}

	if (returnArray) {
		return classes;
	}
	return classes.join(' ');
}

function createChildelement(child, links) {
	if (typeof child === 'string') {
		return document.createTextNode(child);
	}
	return oporElement(child, links, true);
}
