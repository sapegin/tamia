import { defineGlobalStyles } from '@pandacss/dev';

export const globalCss = defineGlobalStyles({
	// box-sizing reset, etc.
	'*, ::before, ::after, ::backdrop, ::file-selector-button': {
		margin: 0,
		padding: 0,
		boxSizing: 'border-box',
	},

	html: {
		fontSize: 'root',
		fontFamily: 'body',
		color: 'base',
		backgroundColor: 'bg',
		lineHeight: 'base',
		fontWeight: 'normal',
		wordWrap: 'break-word',
		textRendering: 'optimizeSpeed',
		fontKerning: 'normal',
		fontFeatureSettings: '"kern", "liga", "clig", "calt"',
		// Prevent adjustments of font size after orientation changes in iOS
		WebkitTextSizeAdjust: '100%',
		MozOsxFontSmoothing: 'grayscale',
		WebkitFontSmoothing: 'antialiased',
		hyphens: 'auto',
		// Enable smooth scroll only for folks who don't have reduce motion enabled
		'@media (prefers-reduced-motion: no-preference)': {
			scrollBehavior: 'smooth',
		},
	},

	body: {
		minHeight: '100vh',
		lineHeight: 'inherit',
	},

	// Disable hyphenation in links
	a: {
		hyphens: 'none',
	},

	// Better looking headings
	'h1, h2, h3, h4, h5, h6': {
		textRendering: 'optimizeLegibility',
	},

	// Remove the weird gap below images
	'img, svg, video, canvas, audio, iframe, embed, object': {
		display: 'block',
		verticalAlign: 'middle',
	},

	// Do not allow horizontal resizing because it breaks layout
	textarea: {
		resize: 'vertical',
	},

	// Monospace digits
	table: {
		fontFeatureSettings: '"tnum"',
	},

	// Remove ugly bottom border
	'abbr, acronym': {
		borderBottom: 0,
		cursor: 'default',
	},

	// Remove bullets
	ul: {
		listStyle: 'none',
	},

	// Abbreviations with spacing
	abbr: {
		letterSpacing: '0.1em',
		marginRight: '-0.1em',
	},

	// Remove default borders
	'iframe, fieldset': {
		border: 0,
	},

	// Text selection
	'::selection': {
		color: 'base',
		backgroundColor: 'selection',
		textShadow: 'none',
	},

	// Print styles
	_print: {
		'@page': {
			margin: '0.5cm 1cm',
		},
		'& :is(header, footer, nav)': {
			display: 'none',
		},
		'*': {
			fontFamily: 'Georgia, serif',
			color: '#000 !important',
			background: 'transparent !important',
			width: 'auto !important',
			marginLeft: '0 !important',
			marginRight: '0 !important',
			paddingLeft: '0 !important',
			paddingRight: '0 !important',
			textShadow: 'none !important',
			boxShadow: 'none !important',
		},
		'& :is(h1, h2, h3, h4, h5, h6)': {
			fontFamily: '"Helvetica Neue", Arial, sans-serif',
			pageBreakInside: 'avoid',
			pageBreakAfter: 'avoid',
		},
		'& :is(p, blockquote, ul, ol, dl, tr, img)': {
			pageBreakInside: 'avoid',
		},
		'& :is(p, h2, h3)': {
			orphans: 3,
			widows: 3,
		},
		'& ul': {
			marginLeft: '1.2em !important',
		},
	},
});
