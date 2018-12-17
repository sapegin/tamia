import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Svg = styled('svg')`
	display: inline-block;
	vertical-align: middle;
`;

const Icon = ({ icon, width, height, ...props }) => {
	return (
		<Svg
			{...props}
			viewBox={`0 0 ${icon.width} ${icon.height}`}
			width={width}
			height={height}
			fill="currentColor"
			preserveAspectRatio="xMidYMid meet"
		>
			<path d={icon.path} />
		</Svg>
	);
};

Icon.propTypes = {
	icon: PropTypes.shape({
		path: PropTypes.string.isRequired,
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
	}).isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
};

export default Icon;
