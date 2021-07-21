import React from 'react';
import styled from 'styled-components';
import { space, layout, SpaceProps, LayoutProps } from 'styled-system';

const Svg = styled.svg<SpaceProps & LayoutProps>(space, layout);

type Props = SpaceProps &
	LayoutProps & {
		viewBox: {
			width: number;
			height: number;
		};
		display?: number | string;
		children?: React.ReactNode;
	};

/**
 * Generic SVG icon component.
 */
const Icon = ({
	viewBox,
	display = 'inline-block',
	verticalAlign = 'middle',
	children,
	...props
}: Props) => {
	// Use unknown because TypeScript thinks this is still an <svg> element,
	// not a styled-system component, and doesn't allow responsive props
	return (
		<Svg
			{...(props as unknown)}
			display={display}
			verticalAlign={verticalAlign}
			viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
			fill="currentColor"
			preserveAspectRatio="xMidYMid meet"
		>
			{children}
		</Svg>
	);
};

export default Icon;
