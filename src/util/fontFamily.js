// Borrowed from Typography.js

import get from 'lodash/get';

// Wrap font names in quotes, unless the font name is actually a keyword.
// See https://stackoverflow.com/a/13752149 and https://www.w3.org/TR/CSS2/fonts.html#font-family-prop
const genericFontFamilies = [
	'inherit',
	'default',
	'serif',
	'sans-serif',
	'monospace',
	'fantasy',
	'cursive',
	'-apple-system',
];

export const wrapFontFamily = fontFamily =>
	genericFontFamilies.indexOf(fontFamily) !== -1
		? fontFamily
		: `'${fontFamily}'`;

export const getFontFamilyCss = fonts => {
	if (fonts) {
		return fonts.map(wrapFontFamily).join(',');
	}
	return 'inherit';
};

export const themeFontFamily = addr => props =>
	getFontFamilyCss(get(props.theme, addr));
