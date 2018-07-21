import React from 'react';
import PropTypes from 'prop-types';

const Base = ({ is: Component, ...props }) => <Component {...props} />;

Base.propTypes = {
	is: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Base;
