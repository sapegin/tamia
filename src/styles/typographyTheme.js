import { rgba } from 'polished';
import { buildFontFamily } from './fontFamily';

const getTypographyTheme = theme => ({
	baseFontSize: theme.baseFontSize,
	baseLineHeight: theme.lineHeights.base,
	headerLineHeight: theme.lineHeights.heading,
	scaleRatio: theme.scaleRatio,
	headerFontFamily: theme.fonts.heading,
	bodyFontFamily: theme.fonts.base,
	bodyColor: theme.colors.base,
	bodyWeight: theme.fontWeights.base,
	headerWeight: theme.fontWeights.heading,
	boldWeight: theme.fontWeights.bold,
	includeNormalize: true,
	blockMarginBottom: 1,
	overrideStyles: vr => ({
		html: {
			font: `${theme.baseFontSize}/${theme.lineHeights.base} ${buildFontFamily(
				theme.fonts.base
			)}`,
		},
		body: {
			maxWidth: theme.page.maxWidth,
			marginLeft: 'auto',
			marginRight: 'auto',
			padding: `${theme.page.yPadding} ${theme.page.xPadding}`,
			background: theme.colors.bg,
			hyphens: 'auto',
		},
		// Remove default margins and paddings
		'p, ol, ul, li': {
			margin: 0,
			padding: 0,
		},
		// Remove bullets
		ul: {
			listStyle: 'none',
		},
		// Text selection
		'::selection': {
			color: theme.colors.base,
			background: theme.colors.selection,
			textShadow: 'none',
		},
		// iOS tap highlighting
		'a:link': {
			'-webkit-tap-highlight-color': rgba(theme.colors.selection, 0.25),
		},
		// Remove ugly bottom border
		'abbr, acronym': {
			borderBottom: 0,
			cursor: null,
		},
		// Abbreviations with spacing
		abbr: {
			letterSpacing: '0.1em',
			marginRight: '-0.1em',
		},
		// Sane default values
		img: {
			verticalAlign: 'middle',
		},
		// Do not allow horizontal resizing because it breaks layout
		textarea: {
			resize: 'vertical',
		},
		hr: {
			background: theme.colors.border,
		},
		// Text styles
		// Full bleed images
		[`@media (max-width: ${theme.page.maxWidth})`]: {
			'.text img': {
				maxWidth: `calc(100% + calc(${theme.page.xPadding} * 2))`,
				marginLeft: -theme.page.xPadding,
				marginRight: -theme.page.xPadding,
			},
		},
		// Tables
		table: {
			...vr.adjustFontSizeTo('85%'),
		},
		'td,th': {
			borderBottom: `1px solid ${theme.colors.border}`,
		},
		// Headings
		/* Collapse margin between headings and before first heading */
		[[
			'.text h1 + h2',
			'.text h2 + h3',
			'.text h3 + h4',
			'.text h4 + h5',
			// '.alpha + .beta',
			// '.beta + .gamma',
			// '.gamma + .delta',
			// '.delta + .epsilon',
			'h1:first-child',
			'h2:first-child',
			'h3:first-child',
			'h4:first-child',
			'h5:first-child',
			// '.alpha:first-child',
			// '.beta:first-child',
			// '.gamma:first-child',
			// '.delta:first-child',
		].join(', ')]: {
			marginTop: 0,
		},
		// Unordered list with dashes (—) as bullets and basic ordered list
		'.text ol': {
			paddingLeft: 0,
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
			marginLeft: -theme.listMargin,
		},
		'.text ul > li::before': {
			position: 'absolute',
			left: 0,
			content: '\\2014\\a0',
		},
		[`@media (max-width: ${theme.page.maxWidth})`]: {
			'.text ul > li': {
				marginLeft: 0,
			},
			'.text ol': {
				paddingLeft: theme.listMargin,
			},
		},
	}),
});

export default getTypographyTheme;
