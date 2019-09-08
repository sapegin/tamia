const baseFont = [
	// Safari for OS X and iOS (San Francisco)
	'-apple-system',
	// Windows
	'"Segoe UI"',
	// Android
	'Roboto',
	// Basic web fallback
	'"Helvetica Neue"',
	'Arial',
	'sans-serif',
	// Emoji fonts
	'"Apple Color Emoji"',
	'"Segoe UI Emoji"',
	'"Segoe UI Symbol"',
].join(', ');
const monospaceFont = [
	'Monaco',
	'"DejaVu Sans Mono"',
	'"Lucida Console"',
	'monospace',
].join(', ');
const space = {
	xxs: '0.125rem', // 2px
	xs: '0.25rem', // 4px
	s: '0.5rem', // 8px
	m: '1rem', // 16px
	l: '2rem', // 32px
	xl: '4rem', // 64px
	xxl: '8rem', // 128px
	xxxl: '16rem', // 256px
};
const breakpoints = [
	'32rem', // 512px
	'48rem', // 768px
	'62rem', // 992px
	'75rem', // 1200px
];
const fonts = {
	base: baseFont,
	heading: baseFont,
	pre: monospaceFont,
	code: monospaceFont,
};
const fontSizes = {
	base: '1rem',
	xxxxl: '4.2rem',
	xxxl: '3.2rem',
	xxl: '2.4rem',
	xl: '1.8rem',
	l: '1.3rem',
	m: '1rem',
	s: '0.85rem',
	xs: '0.75rem',
};
const colors = {
	bg: '#fff',
	base: '#222',
	border: '#ddd',
	primary: '#c25400',
	hover: '#f56a00',
	selection: 'rgb(255,237,117)',
	selectionAlpha: 'rgba(255,237,117,0.25)', // TODO
};
const fontWeights = {
	base: 400,
	heading: 300,
	bold: 800,
};
const lineHeights = {
	base: 1.5,
	heading: 1.1,
	pre: 1.3,
};
const letterSpacings = {
	base: 0,
	heading: 0,
};
const headingBaseStyles = {
	color: 'base',
	fontFamily: 'heading',
	fontWeight: 'heading',
	lineHeight: 'heading',
	letterSpacing: 'heading',
};
const textBaseStyles = {
	color: 'base',
	fontFamily: 'base',
	fontWeight: 'base',
	lineHeight: 'base',
	letterSpacing: 'base',
};

export default {
	// Base font size (applied to body)
	baseFontSize: '1em', // 1em = 16px
	blockMarginBottom: space.m,
	headingMarginTop: space.l,
	listMargin: '1.3em',
	page: {
		// Max page with
		maxWidth: '75rem',

		// Body paddings
		xPadding: space.m,
		yPadding: 0,

		// Max content width (<Container>)
		contentMaxWidth: null,

		// Max text column width (<TextContainer>)
		textMaxWidth: '40rem',
	},
	fonts,
	space,
	fontSizes,
	fontWeights,
	lineHeights,
	letterSpacings,
	colors,
	breakpoints,
	headingStyles: {
		1: {
			...headingBaseStyles,
			fontSize: 'xxl',
		},
		2: {
			...headingBaseStyles,
			fontSize: 'xl',
		},
		3: {
			...headingBaseStyles,
			fontSize: 'l',
		},
		4: {
			...headingBaseStyles,
			fontSize: 'm',
			fontWeight: 'bold',
		},
		5: {
			...headingBaseStyles,
			fontSize: 'm',
			fontStyle: 'italic',
		},
		6: {
			...headingBaseStyles,
			fontSize: 'm',
		},
	},
	textStyles: {
		base: {
			...textBaseStyles,
		},
	},
} as const;
