global.DEBUG = false;

global.expect = require('chai').expect;

global.window = require('domino').createWindow();
global.document = window.document;
global.getComputedStyle = window.getComputedStyle;

// dataset polyfill
// Based on https://gist.github.com/brettz9/4093766
var propDescriptor = {
	enumerable: true,
	get: function() {
		var toUpperCase = function(n0) {
			return n0.charAt(1).toUpperCase();
		};
		var getter = function() {
			return this;
		};
		var setter = function(attrName, value) {
			return (typeof value !== 'undefined')
				? this.setAttribute(attrName, value)
				: this.removeAttribute(attrName)
			;
		};
		// Simulate DOMStringMap w/accessor support
		var HTML5DOMStringMap = {};
		for (var attrName in this.attributes) {
			var attribute = this.attributes[attrName];
			if ((/^data-\w[\w\-]*$/).test(attrName)) {
				var attrVal = attribute.value;
				// Change to CamelCase
				var propName = attrName.substr(5).replace(/-./g, toUpperCase);
				Object.defineProperty(HTML5DOMStringMap, propName, {
					enumerable: true,
					get: getter.bind(attrVal || ''),
					set: setter.bind(this, attrName),
				});
			}
		}
		return HTML5DOMStringMap;
	},
};
Object.defineProperty(window.Element.prototype, 'dataset', propDescriptor);

// requestAnimationFrame mock
global.requestAnimationFrame = window.requestAnimationFrame = function(callback) {
	callback();
};
