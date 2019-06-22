import 'styled-components';
import { Size, Sizes, FontSizes, Styles } from './types';

declare module 'styled-components' {
	export interface DefaultTheme {
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
		colors: {
			bg: string;
			base: string;
			border: string;
			primary: string;
			hover: string;
			selection: string;
			selectionAlpha: string;
		};
		fonts: {
			base: string;
			heading: string;
			pre: string;
			code: string;
		};
		fontWeights: {
			base: string;
			heading: string;
			bold: string;
		};
		lineHeights: {
			base: number;
			heading: number;
			pre: number;
		};
		letterSpacings: {
			base: number;
			heading: number;
		};
		breakpoints: string[];
		headingStyles: Styles;
		textStyles: Styles;
	}
}
