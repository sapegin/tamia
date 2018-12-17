import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import GlobalStyles from '../styles';

const Provider = ({ children, theme }) => (
	<>
		<GlobalStyles theme={theme} />
		<ThemeProvider theme={theme}>{children}</ThemeProvider>
	</>
);

export default Provider;
