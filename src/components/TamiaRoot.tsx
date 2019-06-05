import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import GlobalStyles from '../styles';
import { Theme } from '../types';

interface Props {
	theme: Theme;
}

const Root: React.FunctionComponent<Props> = ({ children, theme }) => (
	<>
		<GlobalStyles theme={theme} />
		<ThemeProvider theme={theme}>{children}</ThemeProvider>
	</>
);

export default Root;
