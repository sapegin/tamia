let cache = new WeakMap();

/**
 * Convert object of string to object of string, numbers or booleans:
 * 'true' -> true,
 * 'false' -> false,
 * 'null' -> null,
 * '42' -> 42,
 * '42.53' -> 42.53,
 * 'foo' -> 'foo.
 *
 * @param {object} map Object.
 * @returns {object}
 */
export function toObject(map) {
	let object = {};
	for (let attr in map) {
		let value = map[attr];
		if (value === 'true') {
			value = true;
		}
		else if (value === 'false') {
			value = false;
		}
		else if (value === 'null') {
			value = null;
		}
		else if (String(Number(value)) === value) {
			value = Number(value);
		}
		object[attr] = value;
	}
	return object;
}

/**
 * Read data-attributes, set values to a cache.
 *
 * @param {HTMLElement} elem Element.
 * @param {string} attr Attribute name (camelCase).
 * @param {*} [value] Attribute value (if you want to set a new value).
 * @returns {*} Current value if the `value` param if missed.
 */
export default function data(elem, attr, value) {
	let cached = cache.get(elem);
	if (!cached) {
		cached = toObject(elem.dataset);
		cache.set(elem, cached);
	}

	if (arguments.length === 2) {
		// Get
		return cached[attr];
	}

	// Set
	cached[attr] = value;
}
