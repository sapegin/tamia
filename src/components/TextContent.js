import React from 'react';
import PropTypes from 'prop-types';
import Base from './Base';

const TextContent = props => <Base {...props} className="text" />;

TextContent.propTypes = {
	is: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

TextContent.defaultProps = {
	is: 'div',
};

/** @component */
export default TextContent;
