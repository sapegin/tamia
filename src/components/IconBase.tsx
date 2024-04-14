import type { PropsWithoutRef } from 'react';
import { Box, type BoxProps } from './Box';

export type BaseIconProps = Omit<
	PropsWithoutRef<BoxProps<'svg'>>,
	| 'aria-hidden'
	| 'fill'
	| 'height'
	| 'preserveAspectRatio'
	| 'viewBox'
	| 'width'
> & {
	width: number | string;
	height: number | string;
	viewBox: {
		width: number;
		height: number;
	};
	fill?: string;
};

/**
 * Base for SVG icons:
 *
 * <IconBase viewBox={{ width: 128, height: 128 }} width={24} height={24}>
 *   <path d="..." />
 * </IconBase>
 */
export function IconBase({
	viewBox,
	display = 'inline-block',
	verticalAlign = 'middle',
	fill = 'currentColor',
	children,
	...props
}: BaseIconProps) {
	return (
		<Box
			as="svg"
			{...props}
			display={display}
			verticalAlign={verticalAlign}
			viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
			fill={fill}
			preserveAspectRatio="xMidYMid meet"
			aria-hidden="true"
		>
			{children}
		</Box>
	);
}
