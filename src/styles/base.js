const getBaseStyles = theme => ({
	html: {
		boxSizing: 'border-box',
		overflowY: 'scroll',
		fontSize: theme.baseFontSize,
		fontFamily: theme.fonts.base,
	},
	// box-sizing reset
	'*, *:before, *:after': {
		boxSizing: 'inherit',
	},
	body: {
		maxWidth: theme.page.maxWidth,
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: `0 ${theme.page.xPadding}`,
		color: theme.colors.base,
		background: theme.colors.bg,
		lineHeight: theme.lineHeights.base,
		fontWeight: theme.fontWeights.base,
		wordWrap: 'break-word',
		fontKerning: 'normal',
		fontFeatureSettings: '"kern", "liga", "clig", "calt"',
		hyphens: 'auto',
	},
	// Remove default margins and paddings
	[[
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'hgroup',
		'ul',
		'ol',
		'dl',
		'dd',
		'p',
		'figure',
		'pre',
		'table',
		'fieldset',
		'blockquote',
		'form',
		'noscript',
		'iframe',
		'img',
		'hr',
		'address',
	].join(',')]: {
		margin: 0,
		padding: 0,
	},
	// Remove bullets
	ul: {
		listStyle: 'none',
	},
	[['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].join(', ')]: {
		textRendering: 'optimizeLegibility',
	},
	// Monospace digits
	table: {
		fontFeatureSettings: '"tnum"',
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
	// Fix hidden in IE10 and prevent accidental display with CSS
	'[hidden]': {
		display: 'none !important',
	},
	// Text selection
	'::selection': {
		color: theme.colors.base,
		background: theme.colors.selection,
		textShadow: 'none',
	},
	// iOS tap highlighting
	'a:link': {
		'-webkit-tap-highlight-color': theme.colors.selectionAlpha,
	},
});

export default getBaseStyles;
