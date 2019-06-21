import 'styled-components';
import { Size, Sizes, FontSizes } from './types';

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
		fonts: { [key: string]: string };
		fontWeights: { [key: string]: string };
		lineHeights: { [key: string]: number };
		letterSpacings: { [key: string]: number };
		breakpoints: string[];
	}
}
