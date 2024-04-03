import type { PatternConfig } from '@pandacss/dev';

/**
 * Hide content visually but keep it accessible to screen readers.
 */
export const visuallyHidden: PatternConfig = {
	transform(props) {
		return {
			srOnly: true,
			...props,
		};
	},
};
