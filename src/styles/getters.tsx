import { DefaultTheme } from 'styled-components';

export const getMaxWidth = (p: { theme: DefaultTheme }) =>
	p.theme.page.contentMaxWidth || p.theme.page.bodyMaxWidth || 0;

export const getPaddingX = (p: { theme: DefaultTheme }) =>
	p.theme.page.contentPaddingX || p.theme.page.bodyPaddingX || 0;
