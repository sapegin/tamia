import React from 'react';
import { TLengthTamia } from '../primitives/types';
import Box, { BoxProps } from './Box';

export type IconProps = Omit<BoxProps, 'width' | 'height'> & {
	width: TLengthTamia;
	height: TLengthTamia;
	viewBox: {
		width: number;
		height: number;
	};
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
}: IconProps) => {
	// Use any because TypeScript thinks this is still an <svg> element,
	// not a primitive component, and doesn't allow responsive props
	return (
		<Box
			as="svg"
			{...(props as any)}
			display={display}
			verticalAlign={verticalAlign}
			viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
			fill="currentColor"
			preserveAspectRatio="xMidYMid meet"
		>
			{children}
		</Box>
	);
};

export default Icon;
