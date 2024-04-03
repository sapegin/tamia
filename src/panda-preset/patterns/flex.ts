import type { PatternConfig } from '@pandacss/dev';

/**
 * Responsive Flexbox container, based on the `box` but has `display: flex` by default.
 */
export const flex: PatternConfig = {
	transform(props) {
		return {
			display: 'flex',
			...props,
		};
	},
};
