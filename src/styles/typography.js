import { getFontFamilyCss } from '../util/fontFamily';

// Inspired by Bootstrap and Typography.js

const getTypographyStyles = theme => {
	const halfBlockMargin = `calc(${theme.blockMarginBottom} / 2)`;
	return {
		[[
			'.text h1',
			'.text h2',
			'.text h3',
			'.text h4',
			'.text h5',
			'.text h6',
			'.text hgroup',
			'.text ul',
			'.text ol',
			'.text dl',
			'.text dd',
			'.text p',
			'.text figure',
			'.text pre',
			'.text table',
			'.text fieldset',
			'.text blockquote',
			'.text form',
			'.text noscript',
			'.text iframe',
			'.text img',
			'.text hr',
			'.text address',
		].join(',')]: {
			marginBottom: theme.blockMarginBottom,
		},
		// Links
		'.text a, .text a:link, .text a:visited': {
			color: theme.colors.primary,
		},
		'.text a:hover, .text a:active, .text a:focus': {
			color: theme.colors.hover,
		},
		'.text a:focus': {
			outline: `1px dotted ${theme.colors.hover}`,
			outlineOffset: '1px',
		},
		// Blockquotes
		'.text blockquote': {
			marginLeft: theme.space.l,
			marginRight: theme.space.l,
			fontSize: theme.fontSizes.s,
		},
		'.text blockquote p': {
			marginBottom: halfBlockMargin,
		},
		'.text cite': {
			fontStyle: 'italic',
		},
		'.text hr': {
			background: theme.colors.border,
		},
		// Responsive images
		'.text img': {
			maxWidth: '100%',
			height: 'auto',
		},
		// Full bleed images
		[`@media (max-width: ${theme.page.maxWidth})`]: {
			'.text img': {
				maxWidth: `calc(100% + calc(${theme.page.xPadding} * 2))`,
				marginLeft: -theme.page.xPadding,
				marginRight: -theme.page.xPadding,
			},
		},
		// Tables
		'.text table': {
			fontSize: theme.fontSizes.s,
			borderCollapse: 'collapse',
			width: '100%',
		},
		'.text thead': {
			textAlign: 'left',
			borderBottom: `2px solid ${theme.colors.border}`,
		},
		'.text td, .text th': {
			textAlign: 'left',
			borderBottom: `1px solid ${theme.colors.border}`,
			padding: halfBlockMargin,
		},
		'.text th:first-child, .text td:first-child': {
			paddingLeft: 0,
		},
		'.text th:last-child, .text td:last-child': {
			paddingRight: 0,
		},
		'.text tbody tr:last-child td': {
			border: 0,
		},
		// Headings
		// Collapse margin between headings and before first heading
		[[
			'.text h1',
			'.text h2',
			'.text h3',
			'.text h4',
			'.text h5',
			'.text h6',
		].join(', ')]: {
			marginTop: theme.headingMarginTop,
			fontFamily: getFontFamilyCss(theme.fonts.heading),
			lineHeight: theme.lineHeights.heading,
			fontWeight: theme.fontWeights.heading,
		},
		[[
			'.text h1 + h2',
			'.text h2 + h3',
			'.text h3 + h4',
			'.text h4 + h5',
			'.text h5 + h6',
			'.text h1:first-child',
			'.text h2:first-child',
			'.text h3:first-child',
			'.text h4:first-child',
			'.text h5:first-child',
			'.text h6:first-child',
		].join(', ')]: {
			marginTop: 0,
		},
		'.text h1': {
			fontSize: theme.fontSizes.xxxl,
		},
		'.text h2': {
			fontSize: theme.fontSizes.xxl,
		},
		'.text h3': {
			fontSize: theme.fontSizes.xl,
		},
		'.text h4': {
			fontSize: theme.fontSizes.l,
		},
		'.text h5': {
			fontSize: theme.fontSizes.m,
			fontWeight: 'bold',
		},
		'.text h6': {
			fontSize: theme.fontSizes.m,
			fontStyle: 'italic',
		},
		// Unordered list with dashes (—) as bullets and basic ordered list
		'.text ol': {
			paddingLeft: theme.listMargin,
		},
		'.text li': {
			marginBottom: halfBlockMargin,
		},
		'.text li > ul, .text li > ol': {
			marginBottom: 0,
		},
		'.text ul > ul, .text ul > ol': {
			marginLeft: theme.listMargin,
		},
		'.text ul > li': {
			position: 'relative',
			paddingLeft: theme.listMargin,
			marginLeft: 0,
		},
		'.text ul > li::before': {
			content: '"\\2014\\a0"',
			position: 'absolute',
			left: 0,
		},
		// Hanging markers on big screens
		[`@media (min-width: ${theme.page.maxWidth})`]: {
			'.text ol': {
				paddingLeft: 0,
			},
			'.text ul > li': {
				marginLeft: `-${theme.listMargin}`,
			},
		},
	};
};

export default getTypographyStyles;
