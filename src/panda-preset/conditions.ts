import base from '@pandacss/preset-base';

// Conditions
export const conditions = {
	...base.conditions,
	/** Override default _hover condition to skip hover disabled elements */
	hover: '&:hover:not(:disabled)',
	/** Main input mechanism has high precision (for example, mouse or trackpad) */
	pointerFine: '@media (pointer: fine)',
};
