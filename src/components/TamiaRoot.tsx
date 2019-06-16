import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import GlobalStyles from '../styles';

interface Props {
	theme: { [key: string]: any };
}

const Root: React.FunctionComponent<Props> = ({ children, theme }) => (
	<>
		<GlobalStyles theme={theme} />
		<ThemeProvider theme={theme}>{children}</ThemeProvider>
	</>
);

export default Root;
