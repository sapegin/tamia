import merge from 'lodash/merge';

const getTheme = ({
	// Base font size (applied to body)
	baseFontSize = '1em', // 1em = 16px
	// Spacers
	xxs = '0.125rem', // 2px
	xs = '0.25rem', // 4px
	s = '0.5rem', // 8px
	m = '1rem', // 16px
	l = '2rem', // 32px
	xl = '4rem', // 64px
	xxl = '8rem', // 128px
	xxxl = '16rem', // 256px
	// Breakpoints
	small = '32rem', // 512px
	medium = '48rem', // 768px
	large = '62rem', // 992px
	huge = '75rem', // 1200px
	// Native font stack
	baseFont = [
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
	].join(', '),
	monospaceFont = [
		'Monaco',
		'"DejaVu Sans Mono"',
		'"Lucida Console"',
		'monospace',
	].join(', '),
	fontSizes = {
		base: '1rem',
		xxxxl: '4.2rem',
		xxxl: '3.2rem',
		xxl: '2.4rem',
		xl: '1.8rem',
		l: '1.3rem',
		m: '1rem',
		s: '0.85rem',
		xs: '0.75rem',
	},
	colors = {
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
	},
	fonts = {
		base: baseFont,
		heading: baseFont,
		pre: monospaceFont,
		code: monospaceFont,
	},
	fontWeights = {
		base: 'normal',
		heading: 'normal',
		bold: 'bold',
	},
	lineHeights = {
		base: 1.45,
		heading: 1.1,
		pre: 1.3,
	},
	letterSpacings = {
		base: 0,
		heading: 0,
	},
	...rest
}: { [key: string]: any } = {}) => {
	const headingBaseStyles = {
		color: colors.base,
		fontFamily: fonts.heading,
		fontWeight: fontWeights.heading,
		lineHeight: lineHeights.heading,
		letterSpacing: letterSpacings.heading,
	};

	return merge(
		{
			baseFontSize,

			blockMarginBottom: m,
			headingMarginTop: l,
			listMargin: '1.3em',

			// Font sizes
			fontSizes,

			// Spacers
			space: {
				xxs,
				xs,
				s,
				m,
				l,
				xl,
				xxl,
				xxxl,
			},

			fonts,

			fontWeights,

			lineHeights,

			letterSpacings,

			page: {
				// Max page with
				maxWidth: huge,

				// Body paddings
				xPadding: m,
				yPadding: 0,

				// Max content width (<Container>)
				contentMaxWidth: null,

				// Max text column width (<TextContainer>)
				textMaxWidth: '40rem',
			},

			colors,

			headingStyles: {
				1: {
					...headingBaseStyles,
					fontSize: fontSizes.xxl,
				},
				2: {
					...headingBaseStyles,
					fontSize: fontSizes.xl,
				},
				3: {
					...headingBaseStyles,
					fontSize: fontSizes.l,
				},
				4: {
					...headingBaseStyles,
					fontSize: fontSizes.m,
					fontWeight: fontWeights.bold,
				},
				5: {
					...headingBaseStyles,
					fontSize: fontSizes.m,
					fontStyle: 'italic',
				},
				6: {
					...headingBaseStyles,
					fontSize: fontSizes.m,
				},
			},

			textStyles: {},

			// Breakpoints
			breakpoints: [small, medium, large, huge],
		},
		rest
	);
};

export default getTheme;
