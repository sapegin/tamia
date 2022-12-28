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
const defaultTheme = {
	space,
	breakpoints,
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
	[{ padding: 20 }, defaultTheme, { padding: '20px' }],
	[{ padding: 0 }, defaultTheme, { padding: '0px' }],
	[{ padding: undefined }, defaultTheme, {}],
	[{ padding: 'm' }, defaultTheme, { padding: '8px' }],
	[{ width: '20rem' }, defaultTheme, { width: '20rem' }],
	[{ width: 0 }, defaultTheme, { width: '0px' }],
	[{ width: 0.75 }, defaultTheme, { width: '75%' }],
	[{ width: 1 }, defaultTheme, { width: '100%' }],
	[{ width: 101 }, defaultTheme, { width: '101px' }],
	[{ borderLeftWidth: 12 }, defaultTheme, { borderLeftWidth: '12px' }],
	[{ letterSpacing: 12 }, defaultTheme, { letterSpacing: '12px' }],
	[{ fontWeight: 400 }, defaultTheme, { fontWeight: '400' }],
	[{ flexShrink: 1 }, defaultTheme, { flexShrink: 1 }],
	[{ flexGrow: 0 }, defaultTheme, { flexGrow: 0 }],
	[{ flex: 1 }, defaultTheme, { flex: 1 }],
	[{ p: 's' }, defaultTheme, { padding: '4px' }],
	[{ p: '-s' }, defaultTheme, { padding: '-4px' }],
	[{ px: 'l' }, defaultTheme, { paddingLeft: '16px', paddingRight: '16px' }],
	[{ mb: 'xl' }, defaultTheme, { marginBottom: '32px' }],
	[{ ':hover': { p: 's' } }, defaultTheme, { ':hover': { padding: '4px' } }],
	[
		{ p: ['s', 'm', 'l'] },
		defaultTheme,
		{
			padding: '4px',
			'@media screen and (min-width: 10rem)': { padding: '8px' },
			'@media screen and (min-width: 20rem)': { padding: '16px' },
		},
	],
	[
		{ px: ['s', 'm', 'l'] },
		defaultTheme,
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
		{ ...defaultTheme, breakpoints: breakpointsNumbers },
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
	expect(css({ p: 's' })({ theme: defaultTheme })).toEqual({ padding: '4px' });
});

test('css() props as function', () => {
	expect(
		css((theme) => ({
			p: theme.space?.m,
		}))({ theme: defaultTheme })
	).toEqual({ padding: '8px' });
});
