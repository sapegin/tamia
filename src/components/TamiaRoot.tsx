import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import GlobalStyles from '../styles';

const Root = ({ children, theme }) => (
	<>
		<GlobalStyles theme={theme} />
		<ThemeProvider theme={theme}>{children}</ThemeProvider>
	</>
);

Root.propTypes = {
	children: PropTypes.node.isRequired,
	theme: PropTypes.object.isRequired,
};

export default Root;
