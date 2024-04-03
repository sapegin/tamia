import type { PatternConfig } from '@pandacss/dev';

/**
 * Expands content horizontally to remove the paddings so it is rendered
 * from edge to edge on small screens.
 */
export const expander: PatternConfig = {
	transform(props) {
		return {
			marginInline: {
				base: '-contentPaddingX',
				tablet: 0,
			},
			...props,
		};
	},
};
