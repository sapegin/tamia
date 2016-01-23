import { warn } from './debug/logger';

// Custom exception
export class TamiaError extends Error {
	constructor(message) {
		super(message);
		if (DEBUG) {
			warn(...arguments);
		}
		this.name = this.constructor.name;
		this.message = message;
		Error.captureStackTrace(this, this.constructor.name);
	}
}
