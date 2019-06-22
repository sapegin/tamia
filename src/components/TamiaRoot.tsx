import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import Normalize from '../styles/normalize';
import BaseStyles from '../styles/base';
import PrintStyles from '../styles/print';

type Props = {
	theme: DefaultTheme;
	printStyles: boolean;
	children: React.ReactNode;
};

/**
 * Theme provider, normalize.css, Tâmia base styles and optional print styles
 */
const Root = ({ theme, printStyles, children }: Props) => (
	<ThemeProvider theme={theme}>
		<>
			<Normalize />
			<BaseStyles />
			{printStyles && <PrintStyles />}
			{children}
		</>
	</ThemeProvider>
);

export default Root;
