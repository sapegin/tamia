import React from 'react';
import { Global } from '@emotion/core';
import { normalize } from 'polished';
import getBaseStyles from '../styles/base';
import { Theme } from '../types';

interface Props {
	theme: Theme;
}

const GlobalStyles: React.FunctionComponent<Props> = ({ theme }) => (
	<>
		<Global styles={normalize()} />
		<Global styles={getBaseStyles(theme)} />
	</>
);

export default GlobalStyles;
