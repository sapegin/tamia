import React from 'react';
import styled from 'styled-components';
import { Size } from '../types';

interface SvgProps {
	m?: Size;
}

const Svg = styled('svg')<SvgProps>`
	margin: ${props => props.m && props.theme.space[props.m]};
	display: inline-block;
	vertical-align: middle;
`;

interface Props {
	icon: {
		path: string;
		width: number;
		height: number;
	};
	width: number;
	height: number;
	m?: Size;
	children: React.ReactNode;
}

const Icon = ({ icon, width, height, children, ...props }: Props) => {
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
			{children}
		</Svg>
	);
};

export default Icon;
