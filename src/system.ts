import { createSystem } from 'system-props';

export * from 'system-props';

export const system = createSystem({
	strict: false,
	tokenPrefix: 'noprefix',
});
