import merge from 'lodash/merge';
import getTypeScale from './util/typeScale';

const getTheme = ({
	// Base font size (applied to body)
	baseFontSize = '1em', // 1em = 16px
	// Typography scale
	typographyScale = {
		base: 0,
		xxxxl: 5,
		xxxl: 4,
		xxl: 3,
		xl: 2,
		l: 1,
		m: 0,
		s: -0.5,
		xs: -1,
	},
	scaleRatio = 'perfectFourth',
	// Spacers
	xxs = '0.125rem',
	xs = '0.25rem',
	s = '0.5rem',
	m = '1rem',
	l = '2rem',
	xl = '4rem',
	xxl = '8rem',
	// Breakpoints
	small = '36rem', // ~575px
	medium = '48rem', // ~768px
	large = '62rem', // ~992px
	huge = '75rem', // ~1200px
	// Fonts
	// Native font stack
	baseFont = [
		// Safari for OS X and iOS (San Francisco)
		'-apple-system',
		// Windows
		'Segoe UI',
		// Android
		'Roboto',
		// Basic web fallback
		'Helvetica Neue',
		'Arial',
		'sans-serif',
		// Emoji fonts
		'Apple Color Emoji',
		'Segoe UI Emoji',
		'Segoe UI Symbol',
	],
	monospaceFont = [
		'Consolas',
		'Lucida Console',
		'Monaco',
		'DejaVu Sans Mono',
		'monospace',
	],
	...rest
} = {}) =>
	merge(
		{
			baseFontSize,
			scaleRatio,
			typographyScale,

			blockMarginBottom: m,
			headingMarginTop: l,
			listMargin: '1.3em',

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
			},

			// Fonts
			fonts: {
				base: baseFont,
				heading: baseFont,
				pre: monospaceFont,
				code: monospaceFont,
			},

			fontWeights: {
				base: 'normal',
				heading: 'normal',
				bold: 'bold',
			},

			fontSizes: getTypeScale(typographyScale, scaleRatio),

			lineHeights: {
				base: 1.45,
				heading: 1.1,
				pre: 1.3,
			},

			// Breakpoints
			breakpoints: {
				small,
				medium,
				large,
				huge,
			},
		},
		rest
	);

export default getTheme;
