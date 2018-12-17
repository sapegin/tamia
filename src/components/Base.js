import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

const Base = ({ as: Component, className, children, blacklist, ...props }) => {
	return (
		<Component className={className} {...omit(props, blacklist)}>
			{children}
		</Component>
	);
};

Base.propTypes = {
	as: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	blacklist: PropTypes.arrayOf(PropTypes.string),
	className: PropTypes.string,
	children: PropTypes.node,
};

Base.defaultProps = {
	as: 'div',
	blacklist: [],
};

export default Base;
