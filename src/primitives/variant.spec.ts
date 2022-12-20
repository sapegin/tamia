import { variant } from './variant';

const defaultTheme = {
	baseFontSize: 0,
	blockMarginBottom: 0,
	headingMarginTop: 0,
	listMargin: 0,
	focusOutlineOffset: 0,
	page: {
		bodyMaxWidth: 0,
		bodyPaddingX: 0,
		bodyPaddingY: 0,
		contentMaxWidth: 0,
		contentPaddingX: 0,
		contentPaddingY: 0,
		textMaxWidth: 0,
	},
} as const;

test.each([
	[
		{ scale: 'buttons', prop: 'variant' },
		{
			theme: {
				...defaultTheme,
				buttons: {
					primary: { color: 'red', bg: 'blue' },
					secondary: { color: 'blue', bg: 'red' },
				},
			},
			variant: 'secondary',
		},
		{ backgroundColor: 'red', color: 'blue' },
	],
])('variant(%s)', (variants, props, result) => {
	expect(variant(variants)(props)).toEqual(result);
});
