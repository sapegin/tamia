import createVerticalRhythm from './styles/verticalRhythm';

// Spacers
const xxs = '0.125rem';
const xs = '0.25rem';
const s = '0.5rem';
const m = '1rem';
const l = '2rem';
const xl = '4rem';
const xxl = '8rem';

// Breakpoints
const small = '36rem';
const medium = '48rem';
const large = '62rem';
const huge = '75rem';

// Font sizes and line heights
const baseFontSize = '16px';
const scaleRatio = 2;
const vr = createVerticalRhythm({ baseFontSize, scaleRatio });
const fontSizeXXl = vr.scale(5 / 5);
const fontSizeXl = vr.scale(3 / 5);
const fontSizeL = vr.scale(2 / 5);
const fontSizeM = vr.scale(0 / 5);
const fontSizeS = vr.scale(-1 / 5);
const fontSizeXS = vr.scale(-1.5 / 5);

// Fonts
const baseFont = [
	'-apple-system',
	'BlinkMacSystemFont',
	'Segoe UI',
	'Roboto',
	'Oxygen',
	'Ubuntu',
	'Cantarell',
	'Fira Sans',
	'Droid Sans',
	'Helvetica Neue',
	'sans-serif',
];
const monospaceFont =
	'Consolas, "Lucida Console", Monaco, "DejaVu Sans Mono", monospace';

export default {
	baseFontSize,
	scaleRatio,

	// Spacers
	space: {
		xxs,
		xs,
		s,
		m,
		l,
		xl,
		xxl,
	},

	page: {
		// Max page with
		maxWidth: huge,

		// Body paddings
		xPadding: m,
		yPadding: 0,

		// Max content width (<Container>)
		contentMaxWidth: null,
	},

	colors: {
		// Background color
		bg: '#fff',

		// Base text color
		base: '#222',

		// Generic border color
		border: '#ddd',

		// Primary color
		primary: '#1978c8',

		// Hovered link color
		hover: '#f28a25',

		// Text selection background color
		selection: 'rgb(255,237,117)',
		selectionAlpha: 'rgba(255,237,117,0.25)',

		// Blacks
		black05: 'rgba(0,0,0,0.05)',
		black10: 'rgba(0,0,0,0.1)',
		black20: 'rgba(0,0,0,0.2)',

		// Whites
		white10: 'rgba(255,255,255,0.1)',
		white40: 'rgba(255,255,255,0.4)',
	},

	// TODO: List margin
	listMargin: '1.15em',

	// Fonts
	fonts: {
		base: baseFont,
		monospace: monospaceFont,
		codeBlock: monospaceFont,
		heading: baseFont,
	},

	fontWeights: {
		base: 'normal',
		heading: 'normal',
		bold: 'bold',
	},

	fontSizes: {
		base: fontSizeM.fontSize,
		xxl: fontSizeXXl.fontSize,
		xl: fontSizeXl.fontSize,
		l: fontSizeL.fontSize,
		m: fontSizeM.fontSize,
		s: fontSizeS.fontSize,
		xs: fontSizeXS.fontSize,
	},

	lineHeights: {
		base: 1.45,
		heading: 1.1,
	},

	// TODO
	forms: {
		bgColor: '#fff',
		buttonColor: '#555',
		buttonHoverColor: '#333',
		focusColor: 'hsl(204, 68%, 69%)',
		focusColorAlpha: 'hsla(204, 68%, 69%, 0.75)',
		borderColor: '#d9d9d9',
		darkBorderColor: '#c9c9c9',
		lightBgColor: '#fefefe',
		lighterBgColor: '#f0f0f0',
		veryLightBgColor: '#fafafa',
		darkBgColor: '#f0f0f0',
		darkerBgColor: '#e0e0e0',
		borderRadius: '0.1em',
	},

	// Easings
	// More here: https://github.com/thoughtbot/bourbon/blob/master/app/assets/stylesheets/addons/_timing-functions.scss
	easings: {
		easeInSine: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
		easeInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
		easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
		easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
		easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
	},

	// Breakpoints
	breakpoints: {
		small,
		medium,
		large,
		huge,
	},

	// Media queries for breakpoints
	mqs: {
		small: `min-width: ${small}`,
		medium: `min-width: ${medium}`,
		large: `min-width: ${large}`,
		huge: `min-width: ${huge}`,
	},
};
