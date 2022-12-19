import React from 'react';
import styled from 'styled-components';
import Box, { BoxProps } from './Box';

const Svg = styled(Box).attrs({ as: 'svg' })``;

type Props = BoxProps & {
	viewBox: {
		width: number;
		height: number;
	};
	display?: number | string;
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
	// Use any because TypeScript thinks this is still an <svg> element,
	// not a primitive component, and doesn't allow responsive props
	return (
		<Svg
			{...(props as any)}
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
