import React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/core';
import { normalize } from 'polished';
import getBaseStyles from '../styles/base';

const GlobalStyles = ({ theme }) => (
	<>
		<Global styles={normalize()} />
		<Global styles={getBaseStyles(theme)} />
	</>
);

GlobalStyles.propTypes = {
	theme: PropTypes.object.isRequired,
};

export default GlobalStyles;
