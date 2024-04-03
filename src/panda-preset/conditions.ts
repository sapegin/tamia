import base from '@pandacss/preset-base';

// Conditions
export const conditions = {
	...base.conditions,
	hover: '&:hover:not(:disabled)',
};
