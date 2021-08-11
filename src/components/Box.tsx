import styled from 'styled-components';
import {
	compose,
	space,
	color,
	border,
	shadow,
	background,
	layout,
	position,
	flexbox,
	SpaceProps,
	ColorProps,
	BorderProps,
	ShadowProps,
	BackgroundProps,
	LayoutProps,
	PositionProps,
	FlexboxProps,
} from 'styled-system';

export type BoxProps = SpaceProps &
	ColorProps &
	BorderProps &
	ShadowProps &
	BackgroundProps &
	LayoutProps &
	PositionProps &
	FlexboxProps;

/**
 * Generic container with responsive props to control whitespace, layout,
 * positioning and colors.
 */
export const Box = styled.div<BoxProps>(
	{
		boxSizing: 'border-box',
		minWidth: 0,
	},
	compose(space, color, border, shadow, background, layout, position, flexbox)
);

export default Box;
