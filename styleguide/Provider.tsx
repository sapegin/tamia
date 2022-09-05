import React from 'react';
import theme from '../src/theme';
import TamiaRoot from '../src/components/TamiaRoot';

const Provider: React.FunctionComponent = ({ children }) => (
	<TamiaRoot theme={theme}>{children}</TamiaRoot>
);

export default Provider;
