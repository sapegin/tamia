import { getCss, css } from './css';

const space = {
	xs: 2,
	s: 4,
	m: 8,
	l: 16,
	xl: 32,
	'-xs': -2,
	'-s': -4,
	'-m': -8,
	'-l': -16,
	'-xl': -32,
};
const breakpoints = ['10rem', '20rem', '30rem'];
const breakpointsNumbers = [10, 20, 30];

test.each([
	[{ padding: 20 }, {}, { padding: '20px' }],
	[{ padding: 0 }, {}, { padding: '0px' }],
	[{ padding: undefined }, {}, {}],
	[{ padding: 'm' }, { space }, { padding: '8px' }],
	[{ width: '20rem' }, {}, { width: '20rem' }],
	[{ width: 0 }, {}, { width: '0px' }],
	[{ width: 0.75 }, {}, { width: '75%' }],
	[{ width: 1 }, {}, { width: '100%' }],
	[{ width: 101 }, {}, { width: '101px' }],
	[{ borderLeftWidth: 12 }, {}, { borderLeftWidth: '12px' }],
	[{ letterSpacing: 12 }, {}, { letterSpacing: '12px' }],
	[{ fontWeight: 400 }, {}, { fontWeight: '400' }],
	[{ p: 's' }, { space }, { padding: '4px' }],
	[{ p: '-s' }, { space }, { padding: '-4px' }],
	[{ px: 'l' }, { space }, { paddingLeft: '16px', paddingRight: '16px' }],
	[
		{ p: ['s', 'm', 'l'] },
		{ space, breakpoints },
		{
			padding: '4px',
			'@media screen and (min-width: 10rem)': { padding: '8px' },
			'@media screen and (min-width: 20rem)': { padding: '16px' },
		},
	],
	[
		{ px: ['s', 'm', 'l'] },
		{ space, breakpoints },
		{
			paddingLeft: '4px',
			paddingRight: '4px',
			'@media screen and (min-width: 10rem)': {
				paddingLeft: '8px',
				paddingRight: '8px',
			},
			'@media screen and (min-width: 20rem)': {
				paddingLeft: '16px',
				paddingRight: '16px',
			},
		},
	],
	[
		{ p: ['s', 'm', 'l'] },
		{ space, breakpoints: breakpointsNumbers },
		{
			padding: '4px',
			'@media screen and (min-width: 10px)': { padding: '8px' },
			'@media screen and (min-width: 20px)': { padding: '16px' },
		},
	],
])('getCss(%s)', (props, theme, result) => {
	expect(getCss(props, theme)).toEqual(result);
});

test('css()', () => {
	expect(css({ p: 's' })({ theme: { space } })).toEqual({ padding: '4px' });
});

test('css() props as function', () => {
	expect(
		css((theme) => ({
			p: theme.space?.m,
		}))({ theme: { space } })
	).toEqual({ padding: '8px' });
});
