import theme from './theme';

type ThemeInterface = typeof theme;

declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultTheme extends ThemeInterface {}
}
