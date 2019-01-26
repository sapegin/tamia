import React from 'react';
import PropTypes from 'prop-types';
import Base from './Base';

const Html = ({ children, ...props }) => (
	<Base
		dangerouslySetInnerHTML={{
			__html: children,
		}}
		{...props}
	/>
);

Html.propTypes = {
	children: PropTypes.string,
	as: PropTypes.any,
};

Html.defaultProps = {
	as: 'div',
};

export default Html;
