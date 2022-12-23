import React, { ComponentProps } from 'react';
import { TLengthTamia } from '../primitives/types';
import Box from './Box';

export type IconProps = Omit<ComponentProps<typeof Box>, 'width' | 'height'> & {
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
	return (
		<Box
			as="svg"
			{...props}
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
