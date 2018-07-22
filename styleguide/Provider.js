import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import getTheme from '../src/theme';
import './styles';

const Provider = ({ children }) => (
	<ThemeProvider theme={getTheme()}>{children}</ThemeProvider>
);

export default Provider;
