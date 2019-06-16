import React from 'react';
import { Global } from '@emotion/core';
import { normalize } from 'polished';
import getBaseStyles from '../styles/base';

interface Props {
	theme: { [key: string]: any };
}

const GlobalStyles: React.FunctionComponent<Props> = ({ theme }) => (
	<>
		<Global styles={normalize()} />
		<Global styles={getBaseStyles(theme)} />
	</>
);

export default GlobalStyles;
