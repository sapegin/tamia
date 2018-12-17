import React from 'react';
import { Global } from '@emotion/core';
import { normalize } from 'polished';
import getBaseStyles from '../styles/base';

const GlobalStyles = ({ theme }) => (
	<>
		<Global styles={normalize()} />
		<Global styles={getBaseStyles(theme)} />
	</>
);

export default GlobalStyles;
