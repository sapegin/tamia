import React from 'react';
import styled from 'styled-components';
import { space, layout, SpaceProps, LayoutProps } from 'styled-system';

const Svg = styled.svg<SpaceProps & LayoutProps>(space, layout);

type Props = SpaceProps & {
	viewBox: {
		width: number;
		height: number;
	};
	width: number;
	height: number;
	display?: string;
	verticalAlign?: string;
	children?: React.ReactNode;
};

/**
 * Generic SVG icon component.
 */
const Icon = ({ viewBox, children, ...props }: Props) => {
	return (
		<Svg
			{...props}
			viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
			fill="currentColor"
			preserveAspectRatio="xMidYMid meet"
		>
			{children}
		</Svg>
	);
};

Icon.defaultProps = {
	display: 'inline-block',
	verticalAlign: 'middle',
};

export default Icon;
