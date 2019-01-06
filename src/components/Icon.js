import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const SIZES = ['xxl', 'xl', 'l', 'm', 's', 'xs'];

const Svg = styled('svg')`
	margin: ${props => props.theme.space[props.m]};
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
	m: PropTypes.oneOf(SIZES),
};

export default Icon;
