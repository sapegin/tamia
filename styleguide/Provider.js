import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import getTheme from '../src/theme';

const Provider = ({ children }) => (
	<ThemeProvider theme={getTheme()}>{children}</ThemeProvider>
);

export default Provider;
