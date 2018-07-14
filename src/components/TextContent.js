import React from 'react';
import Base from './Base';

const TextContent = props => <Base {...props} className="text" />;

TextContent.defaultProps = {
	is: 'div',
};

export default TextContent;
