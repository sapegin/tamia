import React from 'react';
import getTheme from '../src/theme';
import TamiaProvider from '../src/components/TamiaProvider';

const theme = getTheme();

const Provider = ({ children }) => (
	<>
		<TamiaProvider theme={theme}>{children}</TamiaProvider>
	</>
);

export default Provider;
