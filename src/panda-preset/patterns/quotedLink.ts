import type { PatternConfig } from '@pandacss/dev';

/**
 * “Quoted” link component, a link where only content inside the `<u>` tag is underlined. Useful for links in quotes or links with images.
 */
export const quotedLink: PatternConfig = {
	jsxElement: 'a',
	transform(props) {
		return {
			...props,
			padding: 0,
			background: 'none',
			border: 0,
			font: 'inherit',
			lineHeight: 'inherit',
			textDecoration: 'none',
			color: 'inherit',
			transitionDuration: 'hover',
			transitionTimingFunction: 'hover',
			transitionProperty: 'all',
			_hover: {
				cursor: 'pointer',
			},
			'& u': {
				color: 'primary',
			},
			'&:hover u': {
				color: 'accent',
			},
			_focusVisible: {
				outline: 'focus',
				outlineOffset: 'token(borderWidths.focusOutlineOffset)',
			},
		};
	},
};
