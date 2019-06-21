import React from 'react';
import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { normalize } from 'polished';
import getBaseStyles from '../styles/base';

interface Props {
	theme: DefaultTheme;
}

const Normalize = createGlobalStyle(normalize);

const GlobalStyles = ({ theme }: Props) => (
	<>
		<Normalize />
	</>
);

// <Global styles={normalize()} />
// <Global styles={getBaseStyles(theme)} />

export default GlobalStyles;
