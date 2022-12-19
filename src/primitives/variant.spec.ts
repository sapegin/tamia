import { variant } from './variant';

test.each([
	[
		{ scale: 'buttons', prop: 'variant' },
		{
			theme: {
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
