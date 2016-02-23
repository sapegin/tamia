import assignIn from 'lodash/assignIn';
import isFunction from 'lodash/isFunction';
import { isElement } from './util';
import { addState } from './states';
import { oporElement } from './opor';

/**
 * @class JS component base class.
 *
 * Elements: any HTML element with class name that follow a pattern `.js-name` where `name` is an element name.
 *
 * States: any class on component root HTML node that follow a pattern `.is-state` where `state` is a state name.
 * After initialization all components will have `ok` state.
 *
 * You can redefine following methods in your components:
 *
 *   * init() - element is attached to the DOM;
 *   * destroy() - element is detached from the DOM;
 *   * attributeChanged(name, previousValue, value)
 *
 * Example:
 *
 *   class Pony extends Component {
 *     static binded = 'toggle';
 *     init() {
 *       onEvent(this.elem, 'click', '.js-toggle', this.toggle);
 *     }
 *     toggle() {
 *       toggleState(this.elem, 'pink');
 *     }
 *   });
 *
 *   registerComponent('t-pony', Pony);
 *
 *   <t-pony class="pink-pony is-pink">
 *     <button class="pink-pony__button js-toggle">To pink or not to pink?</button>
 *   </t-pony>
 */
export default class Component {
	/**
	 * List of methods that should be binded to `this` (see `bindAll` method).
	 *
	 * @type {String|Array}
	 */
	static binded = null;

	/**
	 * Component’s OPORJSON template (see `initHtml` method).
	 */
	static template = null;

	/**
	 * @param {HTMLElement} elem DOM element.
	 */
	constructor(elem) {
		if (!isElement(elem)) {
			throw new Error(`No DOM element passed to ${this.constructor.name} constructor.`);
		}

		this.elem = elem;

		this._autobindMethods();
	}

	/**
	 * Put all your initialization code in this method. Calls when element is attached to the DOM.
	 */
	init() {
		// Could be implemented
	}

	/**
	 * You can implement this method to do destroy component. Calls when element is detached from the DOM.
	 */
	destroy() {
		// Could be implemented
	}

	/**
	 * You can implement this method to react to element attributes changes.
	 *
	 * @param {string} name Attribute name.
	 * @param {*} previousValue Previous value.
	 * @param {*} value New value.
	 */
	attributeChanged(name, previousValue, value) {  // eslint-disable-line no-unused-vars
		// Could be implemented
	}

	/**
	 * Binds all specified methods to this.
	 *
	 * @param {string} methods... Method names
	 *
	 * Example:
	 *
	 *   this.bindMethods('toggle');
	 *   onEvent(this.elem, 'click', this.toggle);
	 */
	bindMethods(...methods) {
		methods.forEach(method => {
			if (DEBUG && !isFunction(this[method])) {
				throw new Error(`${this.constructor.name}.bindAll: method "${method}" ` +
					`does not exists or not a function.`);
			}
			this[method] = this[method].bind(this);
		});
	}

	_autobindMethods() {
		let binded = this.constructor.binded;
		if (binded) {
			if (typeof binded === 'string') {
				binded = binded.split(' ');
			}
			if (binded.length) {
				this.bindMethods(...binded);
			}
		}
	}

	_attached() {
		this._initHtml();
		this.init();
		addState(this.elem, 'ok');
	}

	_initHtml() {
		if (!this.constructor.template) {
			return;
		}
		let opor = oporElement(this.constructor.template, this.elem);
		if (Array.isArray(opor)) {
			assignIn(this, opor[1]);
		}
	}
}
