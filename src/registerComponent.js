import 'document-register-element';

/* eslint-disable object-shorthand */

/**
 * Initialize components.
 *
 * @param {string} tag Custom tag name.
 * @param {class} Ctor Component class.
 * @param {object} [parent] Base HTML element.
 *
 * Examples:
 *
 *   <t-pony></t-pony>
 *
 *   registerComponent('t-pony', Pony);
 */
export default function registerComponent(tag, Ctor, parent = HTMLElement) {
	let instance;
	document.registerElement(
		tag,
		{
			prototype: Object.create(
				parent.prototype, {
					createdCallback: {
						value: function() {
							instance = new Ctor(this);
						},
					},
					attachedCallback: {
						value: function() {
							instance._attached();
						},
					},
					detachedCallback: {
						value: function() {
							instance.destroy();
						},
					},
					attributeChangedCallback: {
						value: function(name, previousValue, value) {
							instance.attributeChanged(name, previousValue, value);
						},
					},
				}
			),
		}
	);
}
