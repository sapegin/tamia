import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyles from '../styles';

interface Props {
	theme: DefaultTheme;
	children: React.ReactChild;
}

const Root = ({ children, theme }: Props) => (
	<>
		<GlobalStyles theme={theme} />
		<ThemeProvider theme={theme}>{children}</ThemeProvider>
	</>
);

export default Root;
