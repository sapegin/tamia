export interface Sizes {
	xxs: string;
	xs: string;
	s: string;
	m: string;
	l: string;
	xl: string;
	xxl: string;
	[key: string]: string;
}

export type Size = keyof Sizes;

export interface FontSizes {
	base: string;
	xs: string;
	s: string;
	m: string;
	l: string;
	xl: string;
	xxl: string;
	xxxl: string;
	xxxxl: string;
	[key: string]: string;
}

export type FontSize = keyof FontSizes;

export interface Theme {
	baseFontSize: string;
	blockMarginBottom: Size;
	headingMarginTop: Size;
	listMargin: string;
	fontSizes: FontSizes;
	space: Sizes;
	page: {
		maxWidth: string | null;
		contentMaxWidth: string | null;
		textMaxWidth: string | null;
		xPadding: Size;
		yPadding: Size;
	};
	colors: { [key: string]: string };
	fonts: { [key: string]: string };
	fontWeights: { [key: string]: string };
	lineHeights: { [key: string]: number };
	breakpoints: { [key: string]: string };
}
