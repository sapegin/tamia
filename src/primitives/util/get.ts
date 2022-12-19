// Based on https://github.com/developit/dlv
export function get<T>(obj: any, key?: string | string[]): T | undefined {
	if (!key) {
		return undefined;
	}

	let result = obj;
	const keys = Array.isArray(key) ? key : String(key).split('.');
	for (let i = 0; i < keys.length; i++) {
		const value = keys[i];
		result = result && value in result ? result[value] : undefined;
	}
	return result as T | undefined;
}
