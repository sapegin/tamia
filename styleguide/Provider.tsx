import React from 'react';
import getTheme from '../src/theme';
import TamiaRoot from '../src/components/TamiaRoot';

const theme = getTheme();

const Provider: React.FunctionComponent<{}> = ({ children }) => (
	<TamiaRoot theme={theme}>{children}</TamiaRoot>
);

export default Provider;
