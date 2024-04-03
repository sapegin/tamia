// Base theme

const baseFont =
	"ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";
const monospaceFont =
	"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New'";

export const theme = {
	// Mobile first breakpoints
	breakpoints: {
		// 'base': < 768px
		tablet: '48rem', // >= 768px
		desktop: '62rem', // >= 992px
	},
	// Design tokens
	tokens: {
		colors: {
			text: { value: '#222' },
			background: { value: '#fff' },
			primary: { value: '#6e56ba' },
			accent: { value: '#d396c3' },
			border: { value: '#ddd' },
			selection: { value: '#faebaf' },
		},
		spacing: {
			xxs: { value: '0.125rem' }, // 2px
			xs: { value: '0.25rem' }, // 4px
			s: { value: '0.5rem' }, // 8px
			m: { value: '1rem' }, // 16px
			l: { value: '2rem' }, // 32px
			xl: { value: '4rem' }, // 64px
			xxl: { value: '8rem' }, // 128px
			xxxl: { value: '16rem' }, // 256px
		},
		fonts: {
			body: { value: baseFont },
			heading: { value: baseFont },
			pre: { value: monospaceFont },
			code: { value: monospaceFont },
		},
		fontSizes: {
			xl: { value: '3rem' },
			l: { value: '2rem' },
			m: { value: '1rem' },
			s: { value: '0.9rem' },
			xs: { value: '0.75rem' },
		},
		fontWeights: {
			normal: { value: 400 },
			heading: { value: 300 },
			bold: { value: 800 },
		},
		lineHeights: {
			base: { value: 1.5 },
			heading: { value: 1.1 },
			code: { value: 1.3 },
		},
		borders: {
			none: { value: 'none' },
			thin: { value: '1px solid' },
			focus: { value: '3px solid {colors.accent}' },
		},
		radii: {
			none: { value: '0' },
			base: { value: '0.25em' },
			round: { value: '99999em' },
		},
	},
	semanticTokens: {
		fontSizes: {
			/** Font size applied to the root HTML element */
			root: { value: 'm' },
			/** Font size used for text content (`textContent()` pattern) */
			article: { value: 'm' },
		},
		spacing: {
			/** Whitespace under block elements (p, h1, h2, table, etc.) */
			blockMarginBottom: { value: '{spacing.m}' },
			/** Whitespace above headings (h1, h2, etc.) */
			headingMarginTop: { value: '{spacing.l}' },
			/** Horizontal spacing in lists */
			listMargin: { value: '1.3em' },
			/** Site content horizontal spacing */
			contentPaddingX: { value: '{spacing.m}' },
		},
		sizes: {
			/** Maximum width of text elements (p, h1, h2, blockquote, etc.) */
			textMaxWidth: { value: '45rem' },
		},
		borderWidths: {
			/** Distance from an element to the focus outline */
			focusOutlineOffset: { value: '2px' },
		},
	},
};
