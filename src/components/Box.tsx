import styled from 'styled-components';
import {
	compose,
	space,
	color,
	border,
	shadow,
	layout,
	position,
	flexbox,
	SpaceProps,
	ColorProps,
	BorderProps,
	ShadowProps,
	LayoutProps,
	PositionProps,
	FlexboxProps,
} from 'styled-system';

type Props = SpaceProps &
	ColorProps &
	BorderProps &
	ShadowProps &
	LayoutProps &
	PositionProps &
	FlexboxProps;

/**
 * Generic container with responsive props to control whitespace, layout, positioning and colors.
 */
export const Box = styled.div<Props>(
	{
		boxSizing: 'border-box',
		minWidth: 0,
	},
	compose(space, color, border, shadow, layout, position, flexbox)
);

export default Box;
