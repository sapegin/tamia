import type { PatternConfig } from '@pandacss/dev';

/**
 * Container for user generated content with styles for all common HTML elements.
 */
export const textContent: PatternConfig = {
	transform(props) {
		return {
			...props,

			fontFamily: 'body',
			fontWeight: 'normal',
			lineHeight: 'base',

			'& :is(h1, h2, h3, h4, h5, h6, ul, ol, dl, dd, p, pre, table, blockquote, form, iframe, img, hr, address)':
				{
					marginBottom: 'blockMarginBottom',
				},
			'& :is(h1, h2, h3, h4, h5, h6, p, li, blockquote)': {
				maxWidth: 'textMaxWidth',
			},

			// Links
			'& a': {
				color: 'primary',
				textDecoration: 'underline',
			},
			'& a:hover': {
				color: 'accent',
				cursor: 'pointer',
			},
			'& a:focus-visible': {
				outline: 'focus',
				outlineOffset: 'token(borderWidths.focusOutlineOffset)',
			},

			// Blockquotes
			'& blockquote': {
				marginInline: 'l',
				fontSize: 's',
			},
			'& blockquote p': {
				marginBottom: 'calc(token(spacing.blockMarginBottom) / 2)',
			},
			'& cite': {
				fontStyle: 'italic',
			},

			'& hr': {
				border: 0,
				background: 'border',
			},

			// Responsive images and full bleed images
			'& :is(p > img, p > a > img, figure > img, figure > a > img)': {
				height: 'auto',
				maxWidth: {
					base: 'calc(100% + token(contentPaddingX) * 2)',
					tablet: '100%',
				},
				marginInline: {
					base: '-contentPaddingX',
					tablet: 'auto',
				},
				marginBlock: 'calc(token(spacing.blockMarginBottom) * 2)',
			},

			// Tables
			'& table': {
				fontSize: 's',
				borderCollapse: 'collapse',
				width: '100%',
			},
			'& thead': {
				textAlign: 'left',
				borderBottom: '2px solid token(colors.border)',
			},
			'& :is(td, th)': {
				textAlign: 'left',
				borderBottom: '1px solid token(colors.border)',
				padding: 'calc(token(spacing.blockMarginBottom) / 2)',
			},
			'& td': {
				verticalAlign: 'top',
			},
			'& :is(th:first-child, td:first-child)': {
				paddingLeft: 0,
			},
			'& :is(th:last-child, td:last-child)': {
				paddingRight: 0,
			},
			'& :is(tr:last-child th, tr:last-child td)': {
				border: 0,
			},

			// Headings
			'& :is(h1, h2, h3, h4, h5, h6)': {
				marginTop: 'headingMarginTop',
				fontFamily: 'heading',
				lineHeight: 'heading',
				fontWeight: 'heading',
				letterSpacing: 'heading',
				textWrap: 'balance',
			},
			'& h1': {
				fontSize: 'xxl',
			},
			'& h2': {
				fontSize: 'xl',
			},
			'& h3': {
				fontSize: 'l',
			},
			'& h4': {
				fontSize: 'm',
				lineHeight: 'base',
				fontWeight: 'bold',
			},
			'& h5': {
				fontSize: 'm',
				lineHeight: 'base',
				fontStyle: 'italic',
			},
			'& h6': {
				fontSize: 'm',
				lineHeight: 'base',
			},

			// Collapse margin between headings and before first heading
			'& :is(h1 + h2, h2 + h3, h3 + h4, h4 + h5, h5 + h6, h1:first-child, h2:first-child, h3:first-child, h4:first-child, h5:first-child, h6:first-child)':
				{
					marginTop: 0,
				},

			// Unordered list with dashes (—) as bullets and basic ordered list
			'& ol': {
				listStyle: 'decimal',
				// Hanging markers on big screens
				paddingLeft: { base: 'listMargin', tablet: 0 },
				marginLeft: { tablet: '-listMargin' },
			},
			'& li': {
				paddingLeft: 'calc(token(spacing.blockMarginBottom) / 2)',
			},
			'& :is(li > ul,  li > ol)': {
				marginBottom: 0,
			},
			'& :is(ul > ul,  ul > ol)': {
				marginLeft: 'listMargin',
			},
			'& ul > li': {
				position: 'relative',
				paddingLeft: 'listMargin',
				marginLeft: 0,
			},
			'& ul > li::before': {
				content: '\\2014\\a0',
				position: 'absolute',
				left: 0,
			},

			// Code
			'& :is(h1, h2, h3, h4, h5, h6, p, li, table) :is(code, kbd)': {
				fontFamily: 'inherit',
				fontStyle: 'italic',
				fontFeatureSettings: 'normal',
				fontVariationSettings: 'normal',
				hyphens: 'none',
			},

			// Don't leak the margin after the last element outside of the component
			'& > *:last-child': {
				marginBottom: 0,
			},
		};
	},
};
