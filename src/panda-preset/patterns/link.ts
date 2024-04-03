import type { PatternConfig } from '@pandacss/dev';

/**
 * Text link.
 */
export const link: PatternConfig = {
	jsxElement: 'a',
	transform(props) {
		return {
			...props,
			padding: 0,
			background: 'none',
			border: 0,
			font: 'inherit',
			lineHeight: 'inherit',
			textDecoration: 'underline',
			color: 'primary',
			_visited: {
				color: 'primary',
			},
			_hover: {
				color: 'accent',
				cursor: 'pointer',
			},
			_focusVisible: {
				outline: 'focus',
				outlineOffset: 'token(borderWidths.focusOutlineOffset)',
			},
		};
	},
};
